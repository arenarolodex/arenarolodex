import React from 'react';
import LoadingOverlay from 'react-loading-overlay';

import Layout from '../components/layout';
import EmbeddedGist from '../components/embeddedgist';
import Courses from '../components/courses';
import Schedules from '../components/schedules';

import CourseStore, { CourseStoreHTTPTransport } from '@/state/CourseStore';

import './index.css';

export default class IndexPage extends React.Component {
  constructor() {
    super();
    this.store = new CourseStore(new CourseStoreHTTPTransport());
    this.state = {schedules: [], loading: true, visible: true};
  }
  schedules(scheds) {
    var state = this.state;
    state.schedules = scheds;
    this.setState(state);
  }
  loadingCallback = (value) => {
    this.setState({loading:value});
  };
  hide = () => {
    this.setState({visible:!this.state.visible});
  };

  render() {
    return (
      <LoadingOverlay
        active={this.state.loading}
        spinner
        text="Loading..."
      >
        <Layout>
          <button onClick={this.hide}>
            {this.state.visible ? <span>Hide Messages</span> : <span>Show Messages</span>}
          </button>
          {this.state.visible && <EmbeddedGist visible={this.state.visible} gist="WhizardXD/8c14af1a803eb9228ddaff23da385cfe" file="changelog.md"></EmbeddedGist>}
          <Courses displaySchedules={this.schedules.bind(this)} loadedCallback={this.loadingCallback} />
          <Schedules schedules={this.state.schedules} />
        </Layout>
      </LoadingOverlay>
    );
  }
}
