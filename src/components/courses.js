import React from 'react'

import styles from './courses.module.css'

export default class Courses extends React.Component{
  constructor() {
    super();
    this.state = {courses: []};
  }
  componentDidMount() {
    //mount
  }
  componentWillUnmount() {
    //unmount
  }
  render() {
    const courses = this.state.courses.map((key)=>
      <Course key={key} />
    );
    return (
      <div>
        <div>
          {courses}
        </div>
        <button onClick={this.addcourse.bind(this)}>Add class</button>
      </div>
    );
  }
  addcourse(e){
    e.preventDefault();
    var state = this.state;
    state.courses.push((new Date()).getTime());
    this.setState(state);
  }
}
class Course extends React.Component{
  render(){
    return (
      <div class={styles.course}>
        Test
      </div>
    );
  }
}
