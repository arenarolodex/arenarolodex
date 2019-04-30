import React from 'react'
import LoadingOverlay from 'react-loading-overlay';

import Layout from '../components/layout'
import Courses from '../components/courses'
import Schedules from '../components/schedules'

export default class IndexPage extends React.Component {
  constructor() {
    super();
    this.state = {schedules: [], loading: true};
  }
  schedules(scheds){
    var state = this.state;
    state.schedules = scheds;
    this.setState(state);
  }
  loadingCallback = () => {
    this.setState({loading:false});
  };
  render(){
    return (
      <LoadingOverlay
        active={this.state.loading}
        spinner
        text="Loading..."
        >
      <Layout>
        <div style={{fontSize:"0.8rem", padding: "0.5rem", backgroundColor: "#ffbd8e",
          marginBottom: "1rem"}}>
          <span style={{backgroundColor: "#ff603d", fontWeight:"bold"}}>
            NOTICE: (04/30/19 4:13 PST)
          </span>
          <br />
          <span>
            Arenarolodex is almost ready to roll for people to use! We're still working out a 
            couple of bugs that were birthed while adding new improvements!
            Apologies for the delay; we anticipate to have everything working around 5.
            Thanks for your patience!
          </span>
        </div>

          <Courses displaySchedules={this.schedules.bind(this)} loadedCallback={this.loadingCallback} />
          <Schedules schedules={this.state.schedules} />
      </Layout>
      </LoadingOverlay>
    )
  }
}
