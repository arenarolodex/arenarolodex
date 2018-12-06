import React from 'react'

import Layout from '../components/layout'
import Courses from '../components/courses'
import Schedules from '../components/schedules'

export default class IndexPage extends React.Component {
  constructor() {
    super();
    this.state = {schedules: []};
  }
  schedules(scheds){
    var state = this.state;
    state.schedules = scheds;
    this.setState(state);
  }
  render(){
    return (
      <Layout>
        <div style={{fontSize:"0.8rem", padding: "0.5rem", backgroundColor: "#ffbd8e",
          marginBottom: "1rem"}}>
          <span style={{backgroundColor: "#ff603d", fontWeight:"bold"}}>NOTICE: (12/5/18 7:28 PST)</span><br />
          <span>Live seats are up and <b>working!</b> Sorry to those who already picked.
          Arenarolodex will now filter out schedules that have courses with empty
          seats. Sorry for the delay!</span>
        </div>
        <Courses displaySchedules={this.schedules.bind(this)} />
        <Schedules schedules={this.state.schedules} />
      </Layout>
    )
  }
}
