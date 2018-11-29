import React from 'react'

import styles from './courses.module.css'

/**A container for all the courses from user input.*/
export default class Courses extends React.Component{
  constructor() {
    super();
    this.state = {courses: {}};
    this.handleChange = this.handleChange.bind(this);
  }
  handleSumbit(e) {
    e.preventDefault();
    var selection = Object.keys(this.state.courses).map((key) => (this.state.courses[key]));
    alert("Form was submitted. "+JSON.stringify(selection));
    //TODO Handle submission of course selection here
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
        <button onClick={this.addcourse.bind(this)}>Add class</button>
        <input type="submit" value="Find schedules" />
      </form>
    );
  }
  handleChange(key, type, value) {
    //TODO Handle <select> changes at the Courses component level
    console.log("Course "+key+" changed its "+type+" to "+value);
    var state = this.state;
    state.courses[key][type] = value;
    this.setState(state);
  }
  addcourse(e){
    e.preventDefault();
    var state = this.state;
    var key = (new Date()).getTime()
    state.courses[key] = {Class: null, Subject: null, prefTeach: null, prefBlock: null,
      priorityTeach: 1, priorityBlock: 1, options: {"Subject": ["","Math","Science"]}};
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
        <CourseSelect name="Class" parentKey={this.props.id} handleChange={this.props.changeHandler}
          options={this.props.options} />
        <CourseSelect name="Teacher" parentKey={this.props.id} handleChange={this.props.changeHandler}
          options={this.props.options} />
        <CourseSelect name="Subject" parentKey={this.props.id} handleChange={this.props.changeHandler}
          options={this.props.options} />
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
            <option key={option} value={option}>{option}</option>
          )}
        </select>
      </label>
    );
  }
}
