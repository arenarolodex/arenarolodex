import React from 'react';

import Layout from '../components/layout';

import '../pages/courses.css';

class Courses extends React.Component {
  render () {
    return (
      <Layout>
        <div style={{lineHeight:"30px"}}>
          Alright so this is a guide to how I <strong>think</strong> arena works this time around. 
          Note that I might be wrong: if I am, please do notify me some way some how. 
          <br />
          1) Arena happens once a year now, as opposed to once a semester. This means that you must 
          pick your classes for the entire school year at once. 
          <br />
          2) The way blocks work has been changed. Year-long classes are now given "regular" single-digit blocks, 
          such as 1, 2, 3, etc., while semester-long classes have double digit numbers, either 1x or 2x, 
          with the 1 and 2 denoting that the class is a fall or spring class, respectively, and the x being 
          the block of the class. This means that when you pick your classes, you may have a schedule that looks 
          something like this in terms of blocks: 
          <br />
          1, 12, 22, 3, 4, 15, 25, 6, 7 . 
          <br />
          This means you will have to be careful not to potentially overlap your classes, such as by doing: 
          <br />
          1, 11, 12, ... 
          <br />
          It also seems as if that, for any year-long classes that you choose, you must stay in the same block for 
          the entire year (different from before, where the general rule for year-long classes was that you could 
          switch blocks and teacher if the class wasn't an AP class). 
          <br />
          3) English classes for juniors and seniors now no longer have any "selectable" differences, meaning that 
          you cannot really choose which class you want (Epic and Myth vs Film as Literature, for example), 
          and you can only choose when you want to have your English class. For non-AP juniors, admin has "mitigated" 
          the situation by making at least one course of Critical Writing exists in every block. Basically, this means 
          that strategizing your choice of English class now becomes one of looking at the choice of teachers and hoping 
          that you will enter your desired class without getting your schedule rearranged. 
          <br />
          I have no idea if this makes any sense; turns out all nighters are not conducive to the using of one's brain. 
          If it helps, great, if it confuses the crap out of you, then uhh... yeah. Good luck!





        </div>
      </Layout>
    );
  }
}

export default Courses;
