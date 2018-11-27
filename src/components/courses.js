import React from 'react'

import styles from './courses.module.css'

/**A container for all the courses from user input.*/
export default class Courses extends React.Component{
  constructor() {
    super();
    this.state = {courses: []};
  }
  handleSumbit(e) {
    e.preventDefault();
    alert("Form was submitted.");
    //TODO Handle submission of course selection here
  }

  render() {
    return (
      <form onSubmit={this.handleSumbit}>
        <div>
          {this.state.courses}
        </div>
        <button onClick={this.addcourse.bind(this)}>Add class</button>
        <input type="submit" value="Find schedules" />
      </form>
    );
  }
  addcourse(e){
    e.preventDefault();
    var state = this.state;
    state.courses.push(<Course key={(new Date()).getTime()} />);
    this.setState(state);
  }
}

/**An individual Course where the user inputs their class, preferred teacher
and block, etc.*/
class Course extends React.Component{
  constructor(){
    super();
    this.state = {class: null, subject: null, prefTeach: null, prefBlock: null,
      priorityTeach: 1, priorityBlock: 1, options: {"Subject": ["","Math","Science"]}};
  }
  classChange(e) {
    e.preventDefault();
    console.log("class changed");
  }
  teacherChange(e) {
    e.preventDefault();
    console.log("teacher changed");
  }
  subjectChange(e) {
    e.preventDefault();
    var state = this.state;
    state.options.Class = ["class 1", "class 2"];
    state.subject = e.target.value;
    this.setState(state);
    console.log("subject changed to "+this.state.subject);
  }
  blockChange(e) {
    e.preventDefault();
    console.log("block changed");
  }
  render() {
    return (
      <div className={styles.course}>
        <CourseSelect name="Class" handleChange={this.classChange.bind(this)}
          options={this.state.options} />
        <CourseSelect name="Teacher" handleChange={this.teacherChange.bind(this)}
          options={this.state.options} />
        <CourseSelect name="Subject" handleChange={this.subjectChange.bind(this)}
          options={this.state.options} />
        <CourseSelect name="Block" handleChange={this.blockChange.bind(this)}
          options={this.state.options} />
      </div>
    );
  }
}

class CourseSelect extends React.Component{
  render() {
    const options = (this.props.options[this.props.name] !== undefined) ?
      this.props.options[this.props.name] : [];
    return (
      // <label onChange={this.props.onchange}>
      //TODO write onChange handler for component, pass changes to parent Course
      <label>
        {this.props.name}
        <select onChange={this.props.handleChange}>
          {options.map((option) =>
            <option key={option} value={option}>{option}</option>
          )}
        </select>
      </label>
    );
  }
}
