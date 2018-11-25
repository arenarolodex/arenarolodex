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
      priorityTeach: 1, priorityBlock: 1};
  }
  render(){
    return (
      <div className={styles.course}>
        <CourseSelect name="Class" />
        <CourseSelect name="Teacher" />
        <CourseSelect name="Subject" options='{"optionArray": ["Math","Science"]}' />
        <CourseSelect name="Block" />
      </div>
    );
  }
}

class CourseSelect extends React.Component{
  constructor() {
    super();
    this.state = {options:[]};
  }
  componentDidMount() {
    if (this.props.options !== undefined) {
      this.setState({options: JSON.parse(this.props.options).optionArray});
      console.log(this.state.options);
    }
  }
  render() {
    return (
      // <label onChange={this.props.onchange}>
      //TODO write onChange handler for component, pass changes to parent Course
      <label>
        {this.props.name}
        <select>
          {this.state.options.map((option) =>
            <option key={option} value={option}>{option}</option>
          )}
        </select>
      </label>
    );
  }
}
