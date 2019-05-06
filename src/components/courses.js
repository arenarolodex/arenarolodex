import React from 'react';

import Course from './course-ui';
import FreeBlock from './freeblock-ui';
import SelectionUtilities from '../selectionutilities';

import styles from './courses.module.css';

/**A container for all the courses from user input.*/
export default class Courses extends React.Component {
  constructor() {
    super();
    this.state = {
      courses: {},
      freeblocks: {},
      disableAddButton: false
    };
    this.utils = undefined;
    this.state.subText = 'Find schedules';
  }
  finishLoading = (value) => {
    if (!value) value = false;
    this.props.loadedCallback(value);
  }
  componentDidMount = () => {
    var courses = window.localStorage.getItem('courses');
    var freeblocks = window.localStorage.getItem('freeblocks');
    courses = courses ? JSON.parse(courses) : {};
    freeblocks = freeblocks ? JSON.parse(freeblocks) : {};

    this.utils = new SelectionUtilities(this.finishLoading);

    var state = this.state;
    state.window = window;
    state.courses = courses;
    state.freeblocks = freeblocks;

    this.setState(state);
  }
  async handleSumbit(e) {
    e.preventDefault();
    var selection = Object.keys(this.state.courses)
      .map((key) => ({
        Class: this.state.courses[key].Class,
        Subject: this.state.courses[key].Subject,
        Teacher: this.state.courses[key].Teacher,
        Block: this.state.courses[key].Block,
        priorityTeach: this.state.courses[key].priorityTeach,
        priorityBlock: this.state.courses[key].priorityBlock,
        TeacherRequired: this.state.courses[key].TeacherRequired
      }));
    var blocks = Object.keys(this.state.freeblocks)
      .map((key) => ({
        Block: this.state.freeblocks[key].Block,
        priorityBlock: this.state.freeblocks[key].priorityBlock
      }));
    // alert("Form was submitted. "+JSON.stringify(selection));
    this.finishLoading(true);
    var results = await this.utils.generateSchedules(selection, blocks);
    this.finishLoading();
    this.props.displaySchedules(results);
  }

  changeSubmitText = () => {
    var state = this.state;
    state.subText='Reload schedules';
    this.setState(state);
  }

  render() {
    //Flags for when to stop adding courses and free blocks
    var nocourse = Object.keys(this.state.courses).length >= 8
      || Object.keys(this.state.freeblocks).length + Object.keys(this.state.courses).length >= 8;
    var nofree = Object.keys(this.state.freeblocks).length + Object.keys(this.state.courses).length >= 8;
    return (
      <form onSubmit={this.handleSumbit.bind(this)}>
        <button onClick={this.addcourse} disabled={nocourse || this.state.loading}>Add class</button>
        <button onClick={this.addfreeblock} disabled={nofree || this.state.loading}>Add free block (optional)</button>
        <button onClick={this.removeall} disabled={(Object.keys(this.state.courses).length === 0 && Object.keys(this.state.freeblocks).length === 0) || this.state.loading} className={styles.removeall}>Remove all</button>
        <div>
          {Object.keys(this.state.freeblocks).reverse().map((key) =>
            (<FreeBlock changeHandler={this.handleChange} id={key} key={key}
              remove={this.removefreeblock}
              default={this.state.freeblocks[key]} />)
          )}
          {Object.keys(this.state.courses).reverse().map((key) =>
            (<Course changeHandler={this.handleChange} id={key} key={key}
              options={this.state.courses[key].options}
              remove={this.removecourse}
              default={this.state.courses[key]} />)
          )}
        </div>
        <input type="submit" value={this.state.subText}
          onClick={this.changeSubmitText}
          disabled={
            Object.keys(this.state.courses).length === 0 || this.state.loading
          }  />
      </form>
    );
  }
  handleChange = (key, type, value, freeblock) => {
    if (freeblock) {
      var state2 = this.state;
      state2.freeblocks[key][type] = value;
      // console.log('Free block ' + key + ' changed its ' + type + ' to ' + value);
      this.setState(state2);
      if (this.state.window)
        this.state.window.localStorage.setItem('freeblocks', JSON.stringify(this.state.freeblocks));
      return;
    }

    //Set new state
    var s = this.state;
    var state = s.courses[key];
    state[type] = value;

    // console.log('Course ' + key + ' changed its ' + type + ' to ' + value);

    if (type === 'Subject') {
      state.options['Class'] = this.utils.getClasses(value);
      state.options['Teacher'] = this.utils.getTeachers('', '');
      state.options['Block'] = this.utils.getClassInfo('', '', '');
      state.Class = '';
      state.Teacher = '';
      state.Block = '';
    }
    if (type === 'Class') {
      // console.log('CLASSCHANGE');
      state.options['Teacher'] = this.utils.getTeachers(state['Subject'], value);
      state.options['Block'] = this.utils.getClassInfo('', '', '');
      state.Teacher = '';
      state.Block = '';
    }
    if (type === 'Teacher') {
      state.options['Block'] =
      this.utils.getClassInfo(state['Subject'], state['Class'], value);
      state.Block = '';
    }
    s.courses[key] = state;
    this.setState(s);
    if (this.state.window)
      this.state.window.localStorage.setItem('courses', JSON.stringify(this.state.courses));
  }
  /**A function to add a FreeBlock object to this component's state.courses*/
  addfreeblock = (e) => {
    e.preventDefault();
    var state = this.state;
    var key = (new Date()).getTime();
    state.freeblocks[key] = { Block: '', priorityBlock: '' };
    this.setState(state);
  }
  removecourse = (key) => {
    var state = this.state;
    delete state.courses[key];
    this.setState(state);
    if(this.state.window)
      this.state.window.localStorage.setItem('courses', JSON.stringify(this.state.courses));
  }
  removefreeblock = (key) => {
    var state = this.state;
    delete state.freeblocks[key];
    this.setState(state);
    if(this.state.window)
      this.state.window.localStorage.setItem('freeblocks', JSON.stringify(this.state.freeblocks));
  }
  removeall = () => {
    var state = this.state;
    state.freeblocks = [];
    state.courses = [];
    this.setState(state);
    if(this.state.window) {
      this.state.window.localStorage.setItem('courses', JSON.stringify(this.state.courses));
      this.state.window.localStorage.setItem('freeblocks', JSON.stringify(this.state.freeblocks));
    }
  }

  /**A function to add a Course object to this component's state.courses*/
  addcourse = (e) => {
    if (Object.keys(this.state.courses).length >= 9
    || Object.keys(this.state.freeblocks).length + Object.keys(this.state.courses).length >= 9) {
      alert('Hey! That\'s not a legal schedule!');
      return;
    }
    e.preventDefault();
    var state = this.state;
    var key = (new Date()).getTime();
    var options = {
      'Subject': this.utils.getDepartments(),
      'Class': this.utils.getClasses(''),
      'Teacher': this.utils.getTeachers('', ''),
      'Block': this.utils.getClassInfo('', '', '')
    };
    state.courses[key] = {
      Class: '',
      Subject: '',
      Teacher: '',
      Block: '',
      priorityTeach: 1,
      priorityBlock: 1,
      TeacherRequired: false,
      options: options
    };
    this.setState(state);
  }
}

/**An individual Course where the user inputs their class, preferred teacher
and block, etc.*/
// class Course extends React.Component {
//   removeSelf() {
//     this.props.remove(this.props.id);
//   }
//   render() {
//     const options = (this.props.options["Teacher"] !== undefined) ?
//     this.props.options["Teacher"] : [];



//     return (
//       <div className={styles.course}>
//         <button className={styles.deleteBut}
//           onClick={this.removeSelf.bind(this)}>
//           Remove</button>
//         <CourseSelect name="Subject" parentKey={this.props.id} handleChange={this.props.changeHandler}
//           options={this.props.options}
//           defValue={this.props.default.Subject} />
//         <CourseSelect name="Class" parentKey={this.props.id} handleChange={this.props.changeHandler}
//           options={this.props.options}
//           defValue={this.props.default.Class} />

//         <CourseSelect name="Teacher" parentKey={this.props.id} handleChange={this.props.changeHandler}
//           options={this.props.options}
//           defValue={this.props.default.Teacher}>


          
          
//         </CourseSelect>



//         <CourseSelect name="Block" parentKey={this.props.id} handleChange={this.props.changeHandler}
//           options={this.props.options}
//           defValue={this.props.default.Block} />
//       </div>
//     );
//   }
// }

// class CourseSelect extends React.Component {

  
//   handleChange(e) {
//     this.props.handleChange(this.props.parentKey, this.props.name, e.target.value, false);
//   }
//   handleChangeRequired(e) {
//     this.props.handleChange(this.props.parentKey, this.props.name+"Required", e.target.checked, false);
//   }
//   render() {
//     let checkbox = "";
//     if (this.props.name === "Teacher")
//         checkbox = (
//           <label style={{textAlign:"right", marginTop:"0.2rem"}}
//           onChange={this.handleChangeRequired.bind(this)}>
//             Is this a required {this.props.name.toLowerCase()}? <input type="checkbox" />
//           </label>
//         );
//     const options = (this.props.options && this.props.options[this.props.name] !== undefined) ?
//       this.props.options[this.props.name] : [];
    
//     const customStyles = {
//       container: base => ({
//         ...base,
//         height: '22.6666667px',
//         float: 'left',
//       }),
//       control: base => ({
//         ...base,
//         float: 'right',
//         background: 'blue',
//         display: 'flex',
//         height: '22.6666667px',
//         width:'400%',
//         minHeight: 22.66667,
//         fontSize: '16px',
//         '@media (max-width: 800px)': {
//           fontSize: '2vh'
//         },
//       }),
//       valueContainer: base => ({
//         ...base,
//         display: 'flex',
//         position: 'relative',
//         background: "pink",
//         height: '22.6666667px',
//         minHeight: 22.66667,
//         fontSize: '16px',
//         '@media (max-width: 800px)': {
//           fontSize: '2vh'
//         },
//         position: 'relative',
//       }),
//       indicatorsContainer: base => ({
//         ...base,
//         display: 'flex',
//         position: 'relative',
//         background: "pink",
//         height: '22.6666667px',
//         minHeight: 22.66667,
//         fontSize: '16px',
//         '@media (max-width: 800px)': {
//           fontSize: '2vh'
//         },
//         padding: '0px',
//       }),      
//       multiValue: base => ({
//         ...base,
//         background: "lightYellow",
//         maxWidth: "100px",
//         height: 22.6666667,
//         minHeight: 22.66667,
//         fontSize: '16px',
//         '@media (max-width: 800px)': {
//           fontSize: '2vh'
//         },
//       }),
//       option: base => ({
//         ...base,
//         height: 22.66667,
//         width: '400%',
//         minHeight: 22.66667,
//         fontSize: '16px',
//         '@media (max-width: 800px)': {
//           fontSize: '2vh'
//         },
//       }),
//       menu: base => ({
//         ...base,
//         float: 'right',
//         height: 'auto',
//         width: '400%',
//         minHeight: 22.66667,
//         fontSize: '16px',
//         '@media (max-width: 800px)': {
//           fontSize: '2vh'
//         },
//       }),
//     };

//     if (this.props.name === "Subject" || this.props.name === "Class") {
//       return (
//         <label>
//           {this.props.name}
//           <div>
//             <select defaultValue={this.props.defValue}
//               onChange={this.handleChange.bind(this)}>
//               {options.map((option) =>
//                 <option key={option[1]} value={option[1]}>{option[0]}</option>
//               )}
//             </select>
//             {checkbox}
//           </div>
//         </label>
//       );
//     } else if (this.props.name === "Teacher") {
//       return (
//         <label>
//           {this.props.name}
//           <div>
//             <Select
//               isMulti
//               placeholder="Select a class"
//               styles={customStyles}
//               options={
//                 options.map((option) => {
//                   return {
//                     value: option[1],
//                     label: option[0]
//                   };
//                 })
//               }
//             />
//           </div>
//         </label>
//       );
//     } else if (this.props.name === "Block") {
//       return (
//         <label>
//           {this.props.name}
//           <div>
//             <Select
//               isMulti
//               placeholder="Select a teacher"
//               styles={customStyles}
//               options={
//                 options.map((option) => {
//                   return {
//                     value: option[1],
//                     label: option[0]
//                   };
//                 })
//               }
//             />
//           </div>
//         </label>
//       );
//     }
//   }
// }
// class FreeBlock extends React.Component {
//   removeSelf() {
//     this.props.remove(this.props.id);
//   }
//   handleChange(e) {
//     this.props.changeHandler(this.props.id, e.target.name, e.target.value, true);
//     e.preventDefault();
//   }
//   render() {
//     return (
//       <div className={styles.freeblock}>
//         <button className={styles.deleteBut}
//           onClick={this.removeSelf.bind(this)}>
//           Remove</button>
//         <label>
//           Preferred free block
//            <select onChange={this.handleChange.bind(this)} name="Block"
//              defaultValue={this.props.default.Block}>
//             <option value="">Choose a block</option>
//             <option value="1">1</option>
//             <option value="2">2</option>
//             <option value="3">3</option>
//             <option value="4">4</option>
//             <option value="5">5</option>
//             <option value="6">6</option>
//             <option value="7">7</option>
//             <option value="8">8</option>
//           </select>
//         </label>
//         <label>
//           Free block priority
//            <input
//              value={this.props.default.priorityBlock}
//              type="number" min="1" max="10"
//              onChange={this.handleChange.bind(this)} name="priorityBlock" />
//         </label>
//       </div>
//     );
//   }
// }
