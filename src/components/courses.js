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
  componentDidMount() {
    var courses = window.localStorage.getItem('courses');
    var freeblocks = window.localStorage.getItem('freeblocks');
    courses = courses ? JSON.parse(courses) : {};
    freeblocks = freeblocks ? JSON.parse(freeblocks) : {};

    this.utils = new SelectionUtilities(this.finishLoading);

    var state = this.state;
    state.window = window;
    state.courses = !Array.isArray(courses) ? courses : {};
    state.freeblocks = !Array.isArray(freeblocks) ? freeblocks : {};

    this.setState(state);
    this.generateSchedulesFromCourses(state);
  }

  generateSchedulesFromCourses = state => {
    var selection = Object.keys(state.courses)
        .filter(key => state.courses[key].Class !== '')
        .map(key => ({
          Class: state.courses[key].Class,
          Subject: state.courses[key].Subject,
          Teacher: state.courses[key].Teacher,
          Block: state.courses[key].Block,
          priorityTeach: state.courses[key].priorityTeach,
          priorityBlock: state.courses[key].priorityBlock,
          TeacherRequired: state.courses[key].TeacherRequired
        }));
    var blocks = Object.keys(state.freeblocks)
        .map((key) => ({
          Block: state.freeblocks[key].Block,
          priorityBlock: state.freeblocks[key].priorityBlock,
          semester: state.freeblocks[key].semester
        }));
    // alert("Form was submitted. "+JSON.stringify(selection));
    if (Object.keys(selection).length !== 0) {
      this.finishLoading(true);
      this.utils.generateSchedules(selection, blocks)
          .then(results => {
            this.finishLoading();
            this.props.displaySchedules(results);
          })
          .catch(console.error);
    }
  };

  handleSumbit(e) {
    e.preventDefault();
    this.generateSchedulesFromCourses(this.state);
  }

  changeSubmitText = () => {
    var state = this.state;
    state.subText='Reload schedules';
    this.setState(state);
  }

  render() {
    //Flags for when to stop adding courses and free blocks
    const canAddBlocks = (Object.keys(this.state.freeblocks).length + Object.keys(this.state.courses).length) < 16;
    return (
      <form onSubmit={this.handleSumbit.bind(this)}>
        <button onClick={this.addcourse} disabled={!canAddBlocks || this.state.loading}>Add class</button>
        <button onClick={this.addfreeblock} disabled={!canAddBlocks || this.state.loading}>Add free block (optional)</button>
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
    // console.log(this.state.window);
    // console.log(s.courses);
    // console.log(JSON.stringify(s.courses));
    if (this.state.window)
      this.state.window.localStorage.setItem('courses', JSON.stringify(s.courses));
  }
  /**A function to add a FreeBlock object to this component's state.courses*/
  addfreeblock = (e) => {
    e.preventDefault();
    var state = this.state;
    var key = (new Date()).getTime();
    state.freeblocks[key] = { Block: '', priorityBlock: '', semester: '' };
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
    state.freeblocks = {};
    state.courses = {};
    this.setState(state);
    if(this.state.window) {
      this.state.window.localStorage.setItem('courses', JSON.stringify(this.state.courses));
      this.state.window.localStorage.setItem('freeblocks', JSON.stringify(this.state.freeblocks));
    }
  };

  /**A function to add a Course object to this component's state.courses*/
  addcourse = (e) => {
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
