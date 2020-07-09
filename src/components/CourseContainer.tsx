import React from 'react';

import CourseWidget from './CourseWidget';
import FreeBlockWidget from './FreeBlockWidget';

import { useApplicationContext } from '@/state/RootStore';

import { observer } from 'mobx-react';

/**A container for all the courses from user input.*/
const CourseContainer: React.FunctionComponent = observer(() => {
  const rootStore = useApplicationContext();
  const scheduleStore = rootStore.scheduleStore;

  return (
    <div>
      <button onClick={scheduleStore.addCourse} disabled={scheduleStore.isScheduleFull}>
        Add class
      </button>
      <button onClick={scheduleStore.addFreeBlock} disabled={scheduleStore.isScheduleFull}>
        Add free block (optional)
      </button>
      <button onClick={scheduleStore.clearSchedule} disabled={scheduleStore.isScheduleEmpty} style={{float: 'right'}}>
        Remove all
      </button>
      <div>
        {scheduleStore.requestedFreeBlocks.map((requestedFreeBlock, idx) =>
          <FreeBlockWidget key={idx} freeBlock={requestedFreeBlock}/>
        )}
        {scheduleStore.requestedCourses.map((requestedCourse, idx) =>
          <CourseWidget key={idx} course={requestedCourse}/>
        )}
      </div>
    </div>
  );
});

export default CourseContainer;
