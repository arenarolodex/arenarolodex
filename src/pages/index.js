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
        <Courses displaySchedules={this.schedules.bind(this)} />
        <Schedules schedules={this.state.schedules} />
      </Layout>
    )
  }
}
