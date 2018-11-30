import React from 'react'

import styles from './courses.module.css'
import CourseUtils from '../courseutils'

/**A container for all the courses from user input.*/
export default class Courses extends React.Component{
  constructor() {
    super();
    this.state = {courses: {}, disableAddButton: false};
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
    // selection =
    // [{
    //   "Class": "AP STATISTICS B",
    //   "Subject": "Math",
    //   "Teacher": "Ambrose",
    //   "Block": "3",
    //   "priorityTeach": 1,
    //   "priorityBlock": 1
    // }, {
    //   "Class": "PRE-CALCULUS B H",
    //   "Subject": "Math",
    //   "Teacher": "Li",
    //   "Block": "6",
    //   "priorityTeach": 1,
    //   "priorityBlock": 1
    // }, {
    //   "Class": "AP Physics 1B",
    //   "Subject": "Science",
    //   "Teacher": "Dickerman, Scott",
    //   "Block": "2",
    //   "priorityTeach": 1,
    //   "priorityBlock": 1
    // }, {
    //   "Class": "THE NOVEL",
    //   "Subject": "English",
    //   "Teacher": "MITCHELL, KRISTEN",
    //   "Block": "1",
    //   "priorityTeach": 1,
    //   "priorityBlock": 1
    // }, {
    //   "Class": "AP US HISTORY B",
    //   "Subject": "Social Studies",
    //   "Teacher": "KLEIN, A",
    //   "Block": "7",
    //   "priorityTeach": 1,
    //   "priorityBlock": 1
    // }, {
    //   "Class": "Japanese 3B Honors",
    //   "Subject": "World Language",
    //   "Teacher": "Okada",
    //   "Block": "8",
    //   "priorityTeach": 1,
    //   "priorityBlock": 1
    // }];
    alert("Form was submitted. "+JSON.stringify(selection));

    this.utils.generateSchedules(selection);
  }
  render() {
    return (
      <form onSubmit={this.handleSumbit.bind(this)}>
        <div>
          {Object.keys(this.state.courses).map((key) =>
            (<Course changeHandler={this.handleChange} id={key} key={key}
              options={this.state.courses[key].options} />)
          )}
        </div>
        <button onClick={this.addcourse.bind(this)} disabled={this.state.disableAddButton}>Add class</button>
        <input type="submit" value="Find schedules" />
      </form>
    );
  }
  handleChange(key, type, value) {
    //Set new state
    var state = this.state.courses[key];
    state[type] = value;

    console.log("Course "+key+" changed its "+type+" to "+value);

    //TODO Handle <select> changes at the Courses component level
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

    // state.options = {
    //   "Subject": this.utils.getDepartments(),
    //   "Class": this.util.getClasses(),
    //   "Teacher": this.util.getTeachers(),
    //   "Block": this.util.getClassInfo().map((info)=>{
    //     return info["Block"]+", "+info["Seats"]+" seats available"
    //   });
    // }
    this.setState(state);
  }
  addcourse(e){
    if (Object.keys(this.state.courses).length >= 7){
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
    if (Object.keys(this.state.courses).length >= 7)
      state.disableAddButton = true;
    this.setState(state);
  }
}

/**An individual Course where the user inputs their class, preferred teacher
and block, etc.*/
class Course extends React.Component{
  constructor() {
    super();
  }
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
    this.props.handleChange(this.props.parentKey,this.props.name,e.target.value);
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
