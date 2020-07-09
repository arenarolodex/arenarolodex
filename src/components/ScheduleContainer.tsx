import React, { useState } from 'react';

import { useApplicationContext } from '@/state/RootStore';
import { Schedule } from '@/state/ScheduleStore';

import { action, observable, IObservableValue } from 'mobx';
import { observer } from 'mobx-react';

import styles from './schedules.module.css';

const schedulesPerPage = 20;

type ScheduleWidgetProps = {
  schedule: Schedule
  showingCondensedBlockFormat: IObservableValue<boolean>
}

const ScheduleWidget: React.FunctionComponent<ScheduleWidgetProps> = observer(({ schedule, showingCondensedBlockFormat }) => {
  return (
    <div className={schedule.impossible ? styles.impossibleSchedule : styles.schedule}>
      {schedule.courseInstances
        .sort((a, b) => a.block - b.block)
        .map((courseInstance, idx) => (
          <div key={idx} className={styles.class}>
            {showingCondensedBlockFormat.get() ?
              `Block ${courseInstance.semester == 'Both' ? '' : courseInstance.semester}${courseInstance.block}` :
              `Block ${courseInstance.block}, ${
                courseInstance.semester == 'Both' ? 'Both Semesters' : `${{'1': 'Fall', '2': 'Spring'}[courseInstance.semester]
              } Semester`}`
            }
            <br />
            <b>{courseInstance.course}</b> <i>({courseInstance.seats} seats left)</i>
          </div>
      ))}
    </div>
  );
});

const ScheduleContainer: React.FunctionComponent = observer(() => {
  const rootStore = useApplicationContext();
  const scheduleStore = rootStore.scheduleStore;

  const schedules = scheduleStore.generatedSchedules;
  const numSchedules = schedules.length;
  const numPages = Math.floor(numSchedules / 20);

  const [currentPage] = useState(() => observable.box(1));
  const [showingImpossible] = useState(() => observable.box(false));
  const [showingCondensedBlockFormat] = useState(() => observable.box(false));

  const navigatorButtons = (
    <>
      <button
        onClick={action(() => (currentPage.set(currentPage.get() - 1)))}
        disabled={currentPage.get() == 1}
      >
        Previous
      </button>
      <button
        onClick={action(() => (currentPage.set(currentPage.get() + 1)))}
        disabled={numPages <= currentPage.get()}
      >
        Next
      </button>
    </>
  );

  return (
    <div>
      <p>
        Page {currentPage.get()} of {numPages}
        <br />
        Showing {schedulesPerPage * (currentPage.get() - 1) + 1} through{' '}
        {currentPage.get() * 20 > schedules.length ? schedules.length : currentPage.get() * 20}{' '}
        schedules out of {schedules.length}
      </p>
      <p>
        {navigatorButtons}
        <br />
        <label>
          Show impossible schedules?
          <input
            checked={showingImpossible.get()}
            type="checkbox"
            onChange={action(() => (showingImpossible.set(!showingImpossible.get())))}
          />
        </label>
        <br />
        <label>
          Change to arena block form
          <input
            checked={showingCondensedBlockFormat.get()}
            type="checkbox"
            onChange={action(() => (showingCondensedBlockFormat.set(!showingCondensedBlockFormat.get())))}
          />
        </label>
      </p>
      {
        numSchedules > 0 ?
          schedules.slice(20 * (currentPage.get() - 1), (20 * currentPage.get()) - 1).map((schedule, idx) =>
            <ScheduleWidget key={idx} schedule={schedule} showingCondensedBlockFormat={showingCondensedBlockFormat} />
          )
          : "We didn't find any schedules. You may have to file incomplete."
      }
      <p>
        {navigatorButtons}
      </p>
    </div>
  );
});

export default ScheduleContainer;
