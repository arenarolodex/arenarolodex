import React from 'react';

import { RequestedFreeBlock } from '@/state/ScheduleStore';
import { useApplicationContext } from '@/state/RootStore';

import { action } from 'mobx';
import { observer } from 'mobx-react';

import styles from './courses.module.css';

type FreeBlockProps = {
  freeBlock: RequestedFreeBlock
}

const FreeBlock: React.FunctionComponent<FreeBlockProps> = observer(({ freeBlock }) => {
  const rootStore = useApplicationContext();
  const scheduleStore = rootStore.scheduleStore;

  return (
    <div className={styles.freeblock}>
      <button className={styles.deleteBut} onClick={() => scheduleStore.removeFreeBlock(freeBlock)}>
        Remove
      </button>
      <label>
        Preferred free block
        <select
          onChange={action((e) => (freeBlock.block = parseInt(e.target.value)))}
          value={freeBlock.block}
        >
          <option value="0">Choose block</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>
      </label>
      <label>
        Free block priority
        <select
          onChange={action((e) => (freeBlock.priority = parseInt(e.target.value)))}
          value={freeBlock.priority}
        >
          <option value="1">Low</option>
          <option value="2">Medium</option>
          <option value="3">High</option>
        </select>
      </label>
      <label>
        Free block semester
        <select
          onChange={action((e) => (freeBlock.semester = e.target.value))}
          value={freeBlock.semester}
        >
          <option value="">Choose a semester</option>
          <option value="1">Fall Semester</option>
          <option value="2">Spring Semester</option>
          <option value="Both">Both</option>
        </select>
      </label>
    </div>
  );
});

export default FreeBlock;
