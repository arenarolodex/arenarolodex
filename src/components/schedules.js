import React from 'react';

import styles from './schedules.module.css';

export default class Schedules extends React.Component {
  constructor(props) {
    super(props);
    this.state = {page:1, numPages:0, showImpossible:false, blockify:false};
  }
  componentDidUpdate(prevProps) {
    if(this.props.schedules !== prevProps.schedules)
      this.setState({numPages: Math.ceil(this.props.schedules.length/20)});
  }
  nextPage() {
    var state = {page:this.state.page+1};
    this.setState(state);
  }
  previousPage() {
    var state = {page:this.state.page-1};
    this.setState(state);
  }
  toggleImpossible = (e) => {
    var state = this.state;
    state.showImpossible = !state.showImpossible;
    this.setState(state);
  };
  toggleBlock = (e) => {
    var state = this.state;
    state.blockify = !state.blockify;
    this.setState(state);
  };
  render() {
    const state = this.state;
    var schedules = this.state.showImpossible ?
      this.props.schedules
      : this.props.schedules.filter((sched) => !sched.impossible);
    const noScheds = this.props.schedules.filter((sched) =>
      !sched.impossible).length === 0 ?
      <p>No schedules available. File incomplete</p>
      : '';
    return (
      <div>
        <p>
          Page {state.page} of {state.numPages}
          <br />
          Showing {20*(state.page-1)+1} through {
            state.page*20 > schedules.length ?
              schedules.length : state.page*20} out of {schedules.length}
        </p>
        <p>
          <button onClick={this.previousPage.bind(this)}
            disabled={state.page === 1}>Previous</button>
          <button onClick={this.nextPage.bind(this)}
            disabled={state.page === state.numPages || state.numPages === 0}>Next</button>
          <br />
          <label>
            Show impossible schedules?
            <input checked={this.state.showImpossible}
              type='checkbox'
              onChange={this.toggleImpossible} />
          </label>
          <br />
          <label>
            Change to arena block form
            <input checked={this.state.blockify}
              type='checkbox'
              onChange={this.toggleBlock} />
          </label>
        </p>
        {noScheds}
        {schedules.slice(20*(state.page-1),(20*state.page)-1).map((sched) =>
          (<ScheduleComponent blockify={this.state.blockify} schedule={sched.classes}
            impossible={sched.impossible}
            key={JSON.stringify(sched.classes)} />)
        )}
        <p>
          <button onClick={this.previousPage.bind(this)}
            disabled={state.page === 1}>Previous</button>
          <button onClick={this.nextPage.bind(this)}
            disabled={state.page === state.numPages || state.numPages === 0}>Next</button>
        </p>
      </div>
    );
  }
}

function easyRead(e) {
  return <b>{ e[1] === 'Both' ? 'Yearlong' : 'Semester ' + e[1] }, Block { e[0] }: <i>{ e[4] }</i></b>;
}
function arenaBlock(e) {
  if (e[1] == "Both") {
    return <b>Block { e[0] }: <i>{ e[4] }</i></b>;
  } else {
    return <b>Block { e[1]+e[0] }: <i>{ e[4] }</i></b>;
  }
}

class ScheduleComponent extends React.Component {
  render() {
    return (
      <div
        className={this.props.impossible ? styles.impossibleSchedule
          : styles.schedule}>
        {this.props.schedule.sort(function(a,b){return parseInt(a[0])-parseInt(b[0]);})
          .map((course, index) => (
            <div className={styles.class} key={index}>
              {this.props.blockify ? arenaBlock(course) : easyRead(course)}
              <br />
              <b>{course[3]}</b> <i>({course[2]} seats left)</i>
            </div>
          ))}
      </div>
    );
  }
}
