import React from 'react';
import LoadingOverlay from 'react-loading-overlay';

import Layout from '../components/layout';
import EmbeddedGist from '../components/embeddedgist';
import Courses from '../components/courses';
import Schedules from '../components/schedules';

import '../pages/index.css';

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
          <EmbeddedGist gist="areyoualex/32570ce054822f8eb855095ec615baca" file="changelog.md"></EmbeddedGist>
          <Courses displaySchedules={this.schedules.bind(this)} loadedCallback={this.loadingCallback} />
          <Schedules schedules={this.state.schedules} />
        </Layout>
      </LoadingOverlay>
    );
  }
}
