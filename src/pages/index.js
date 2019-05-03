import React from 'react'
import LoadingOverlay from 'react-loading-overlay';

import Layout from '../components/layout'
import EmbeddedGist from '../components/embeddedgist'
import Courses from '../components/courses'
import Schedules from '../components/schedules'

import styles from '../pages/index.css'

export default class IndexPage extends React.Component {
  constructor() {
    super();
    this.state = {schedules: [], loading: true};
  }
  schedules(scheds) {
    var state = this.state;
    state.schedules = scheds;
    this.setState(state);
  }
  loadingCallback = (value) => {
    this.setState({loading:value});
  };
  render() {
    return (
      <LoadingOverlay
        active={this.state.loading}
        spinner
        text="Loading..."
        >
      <Layout>
          <EmbeddedGist gist="WhizardXD/8c14af1a803eb9228ddaff23da385cfe" file="changelog.md"></EmbeddedGist>
          <Courses displaySchedules={this.schedules.bind(this)} loadedCallback={this.loadingCallback} />
          <Schedules schedules={this.state.schedules} />
      </Layout>
      </LoadingOverlay>
    )
  }
}
