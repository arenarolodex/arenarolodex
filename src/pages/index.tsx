import React, { useState } from 'react';

import LoadingOverlay from 'react-loading-overlay/src/LoadingOverlay';
import { ReactGithubGist } from 'react-github-gist';

import Layout from '@/components/layout';
import CourseContainer from '@/components/CourseContainer';
import ScheduleContainer from '@/components/ScheduleContainer';

import { Status } from '@/state/CourseStore';
import { useApplicationContext } from '@/state/RootStore';

import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

import './index.css';

const IndexPage: React.FunctionComponent = observer(() => {
  const rootStore = useApplicationContext();
  const courseStore = rootStore.courseStore;

  const [visible] = useState(() => observable.box(true));

  return (
    <LoadingOverlay
      active={courseStore.status != Status.SUCCESS}
      spinner
      text="Loading..."
    >
      <Layout>
        <button onClick={action(() => visible.set(!visible.get()))}>
          {visible.get() ? <span>Hide Messages</span> : <span>Show Messages</span>}
        </button>
        {
          visible.get() ?
            <ReactGithubGist gist="WhizardXD/8c14af1a803eb9228ddaff23da385cfe" file="changelog.md"/> :
            null
        }
        { courseStore.status == Status.SUCCESS ? <>
          <CourseContainer/>
          <ScheduleContainer/>
        </> : null }
      </Layout>
    </LoadingOverlay>
  );
});

export default IndexPage;
