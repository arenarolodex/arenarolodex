import React from 'react'

import styles from './courses.module.css'
import CourseUtils from '../courseutils'

/**A container for all the courses from user input.*/
export default class Courses extends React.Component{
  constructor() {
    super();
    this.state = {courses: {}, freeblocks: {}, disableAddButton: false};
    this.handleChange = this.handleChange.bind(this);
    this.utils = undefined;
  }
  componentDidMount() {
    this.utils = new CourseUtils();
  }
  handleSumbit(e) {
    e.preventDefault();
    var selection = Object.keys(this.state.courses)
      .map((key) => ({
        Class: this.state.courses[key].Class,
        Subject: this.state.courses[key].Subject,
        Teacher: this.state.courses[key].Teacher,
        Block: this.state.courses[key].Block,
        priorityTeach: this.state.courses[key].priorityTeach,
        priorityBlock: this.state.courses[key].priorityBlock,
      }));
    var blocks = Object.keys(this.state.freeblocks)
      .map((key) => ({
        Block: this.state.freeblocks[key].Block,
        priorityBlock: this.state.freeblocks[key].priorityBlock
      }));
    // alert("Form was submitted. "+JSON.stringify(selection));

    var results = this.utils.generateSchedules(selection,blocks);
    this.props.displaySchedules(results);
  }
  render() {
    //Flags for when to stop adding courses and free blocks
    var nocourse = Object.keys(this.state.courses).length >= 7
     || Object.keys(this.state.freeblocks).length + Object.keys(this.state.courses).length >= 8;
    var nofree = Object.keys(this.state.freeblocks).length + Object.keys(this.state.courses).length >= 8;
    return (
      <form onSubmit={this.handleSumbit.bind(this)}>
        <button onClick={this.addfreeblock.bind(this)} disabled={nofree}>Add free block (optional)</button>
        <div>
          {Object.keys(this.state.freeblocks).reverse().map((key) =>
            (<FreeBlock changeHandler={this.handleChange} id={key} key={key} />)
          )}
          {Object.keys(this.state.courses).reverse().map((key) =>
            (<Course changeHandler={this.handleChange} id={key} key={key}
              options={this.state.courses[key].options} />)
          )}
        </div>
        <button onClick={this.addcourse.bind(this)} disabled={nocourse}>Add class</button>
        <input type="submit" value="Find schedules" />
      </form>
    );
  }
  handleChange(key, type, value, freeblock) {
    if(freeblock){
      var state2 = this.state;
      state2.freeblocks[key][type] = value;
      console.log("Free block "+key+" changed its "+type+" to "+value);
      this.setState(state2);
      return;
    }

    //Set new state
    var s = this.state;
    var state = s.courses[key]
    state[type] = value;

    console.log("Course "+key+" changed its "+type+" to "+value);

    if(type === "Subject"){
      state.options["Class"] = this.utils.getClasses(value);
      state.options["Teacher"] = this.utils.getTeachers("", "");
      state.options["Block"] = this.utils.getClassInfo("", "", "");
      state.Class = "";
      state.Teacher = "";
      state.Block = "";
    }
    if(type === "Class"){
      console.log("CLASSCHANGE");
      state.options["Teacher"] = this.utils.getTeachers(state["Subject"], value);
      state.options["Block"] = this.utils.getClassInfo("", "", "");
      state.Teacher = "";
      state.Block = "";
    }
    if(type === "Teacher"){
      state.options["Block"] =
        this.utils.getClassInfo(state["Subject"],state["Class"],value);
      state.Block = "";
    }
    s.courses[key] = state;
    this.setState(s);
  }
  /**A function to add a FreeBlock object to this component's state.courses*/
  addfreeblock(e){
    e.preventDefault();
    var state = this.state;
    var key = (new Date()).getTime()
    state.freeblocks[key] = {Block: "", priorityBlock: ""};
    this.setState(state);
  }
  /**A function to add a Course object to this component's state.courses*/
  addcourse(e){
    if (Object.keys(this.state.courses).length >= 7
     || Object.keys(this.state.freeblocks).length + Object.keys(this.state.courses).length >= 8){
      alert("Hey! That's not a legal schedule!");
      return;
    }
    e.preventDefault();
    var state = this.state;
    var key = (new Date()).getTime()
    var options = {
      "Subject": this.utils.getDepartments(),
      "Class": this.utils.getClasses(""),
      "Teacher": this.utils.getTeachers("",""),
      "Block": this.utils.getClassInfo("","","")
    }
    state.courses[key] = {
      Class: "",
      Subject: "",
      Teacher: "",
      Block: "",
      priorityTeach: 1,
      priorityBlock: 1,
      options: options
    };
    this.setState(state);
  }
}

/**An individual Course where the user inputs their class, preferred teacher
and block, etc.*/
class Course extends React.Component{
  render() {
    return (
      <div className={styles.course}>
        <CourseSelect name="Subject" parentKey={this.props.id} handleChange={this.props.changeHandler}
          options={this.props.options} />
        <br />
        <CourseSelect name="Class" parentKey={this.props.id} handleChange={this.props.changeHandler}
          options={this.props.options} />
        <br />
        <CourseSelect name="Teacher" parentKey={this.props.id} handleChange={this.props.changeHandler}
          options={this.props.options} />
        <br />
        <CourseSelect name="Block" parentKey={this.props.id} handleChange={this.props.changeHandler}
          options={this.props.options} />
      </div>
    );
  }
}

class CourseSelect extends React.Component{
  handleChange(e) {
    this.props.handleChange(this.props.parentKey,this.props.name,e.target.value,false);
  }
  render() {
    const options = (this.props.options[this.props.name] !== undefined) ?
      this.props.options[this.props.name] : [];
    return (
      <label>
        {this.props.name}
        <select onChange={this.handleChange.bind(this)}>
          {options.map((option) =>
            <option key={option[1]} value={option[1]}>{option[0]}</option>
          )}
        </select>
      </label>
    );
  }
}
 class FreeBlock extends React.Component {
   handleChange(e) {
     this.props.changeHandler(this.props.id, e.target.name, e.target.value, true);
     e.preventDefault();
   }
   render() {
     return (
       <div className={styles.freeblock}>
         <label>
           Preferred free block
           <select onChange={this.handleChange.bind(this)} name="Block">
             <option value="">Choose a block</option>
             <option value="1">1</option>
             <option value="2">2</option>
             <option value="3">3</option>
             <option value="4">4</option>
             <option value="5">5</option>
             <option value="6">6</option>
             <option value="7">7</option>
             <option value="8">8</option>
           </select>
         </label><br />
         <label>
           Free block priority
           <input type="number" min="1" onInput={this.handleChange.bind(this)} name="priorityBlock" />
         </label>
       </div>
     );
   }
 }
