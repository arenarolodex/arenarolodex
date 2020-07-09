import React from 'react';

import Layout from '../components/layout';

class Courses extends React.Component {
  render() {
    return (
      <Layout>
        <div style={{ lineHeight: '30px' }}>
          Hello, Sam Lim here! You have found the other tab on this website! I
          don’t know anything about coding (kudos to Chris, Alex, and Kai), but
          here, I will attempt to explain how arena works.
          <br />
          <br />
          Arena now happens just once a year. For this arena, you are choosing
          classes for your entire next year.
          <br />
          The announcer and arena website has a new system of listing blocks.
          Yearlong classes are denoted with blocks 1-8. Fall semester classes
          are denoted with blocks 11-18, with the first “1” indicating that the
          class is a fall class. Spring semester classes are denoted with block
          21-28, with the first “2” indicating that the class is a spring class.
          <br />
          A schedule like this is totally legal: 1, 12, 22, 3, 4, 5, 16, 26, 7
          <br />
          You have to be careful to not choose overlapping classes: 1, 11, 21
          <br />
          arenarolodex will make the fall and spring semester distinction in the
          classes’ names in the “Class” dropdown menu. The “Block” dropdown menu
          only ever lists blocks 1-8, but this website already makes the
          distinction of a fall, spring, or yearlong course by your choice in
          the “Class” dropdown menu.
          <br />
          For yearlong classes, you must stay in that block for the entire year
          (before, you were allowed to switch blocks and teachers for non-AP
          courses).
          <br />
          <br />
          English classes are… complicated.
          <br />
          SOPHOMORES, it does not matter when you take each English class! As
          long as you take English 2A and 2B in different semesters, you’re
          good.
          <br />
          NON-AP JUNIORS AND SENIORS, you should see “Upper Division
          Junior/Senior English A” and “Upper Division Junior/Senior English B”
          on the arena confirmation email you got a few days ago. On the arena
          website, you will only see the different teachers and blocks, not a
          specific name for each class (e.g. you won’t see “Epic and Myth”,
          “Critical Writing”, etc.). This means that you’ll have to know which
          teachers and blocks correspond to the class you want (e.g. Epic and
          Myth is taught by Ms. Henares in blocks 13, 17, 23, 27). You will find
          these specific names in the Note 2 column in the announcer, or through
          using arenarolodex. You can basically choose whatever class you want
          as long as you haven’t taken it before. JUNIORS, remember that one of
          these English classes must correspond to a Critical Writing class!
          (They'll make sure you're in a Crit Writing class either way).
          <br />
          AP JUNIORS AND SENIORS, you should see “AP English Language and
          Composition for Juniors” or “AP English Literature and Composition for
          Seniors” on your arena confirmation email. On the arena website, like
          with the non-AP English classes, you will only see different teachers
          and blocks, not the specific names. arenarolodex has the specific
          names of every English class, so it’s easier for you to make your
          schedules.
          <br />
          <br />
          Best of luck!
        </div>
      </Layout>
    );
  }
}

export default Courses;
