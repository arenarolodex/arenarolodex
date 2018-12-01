import React from 'react'

import styles from './schedules.module.css'

export default class Schedules extends React.Component {
  constructor(props) {
    super(props);
    this.state = {page:1,numPages:0};
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
  render() {
    const state = this.state;
    return (
      <div>
        <p>
          Page {state.page} of {state.numPages}
          <br />
          Showing {20*(state.page-1)+1} through {
            state.page*20 > this.props.schedules.length ?
            this.props.schedules.length : state.page*20} out of {this.props.schedules.length}
        </p>
        <p>
          <button onClick={this.nextPage.bind(this)}
            disabled={state.page === state.numPages || state.numPages === 0}>Next</button>
          <button onClick={this.previousPage.bind(this)}
            disabled={state.page === 1}>Previous</button>
        </p>
        {this.props.schedules.slice(20*(state.page-1),(20*state.page)-1).map((sched) =>
          (<ScheduleComponent schedule={sched.schedule} key={JSON.stringify(sched.schedule)} />)
        )}
      </div>
    );
  }
}

class ScheduleComponent extends React.Component {
  render() {
    return (
      <div className={styles.schedule}>
        {this.props.schedule.sort(function(a,b){return parseInt(a[0])-parseInt(b[0])})
          .map((course) => (
            <div className={styles.class} key={course[0]}>
              <b>Block {course[0]}: <i>{course[4]}</i></b>
              <br />
              <b>{course[3]}</b> in room {course[1]} <i>({course[2]} seats left)</i>
            </div>
          ))}
      </div>
    );
  }
}
