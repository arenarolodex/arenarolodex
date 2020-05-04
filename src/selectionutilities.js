/**A class that handles courses and generating schedules for the client*/
export default class SelectionUtilities {
  constructor(callback) {
    this.loadingHandler = callback;
    var self = this;
    this.courses = undefined;
    //Make AJAX request to get course list
    this.xhttp = new XMLHttpRequest();
    this.xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        self.courses = JSON.parse(this.responseText);
      }
      if (this.readyState === 4)
        self.loadingHandler();
    };
    // this.xhttp.onreadystatechange.bind(this);
    //Define which URL to get info from here
    this.coursesURL =
      process.env.GATSBY_COURSES_API ||
      // ||
      // 'https://raw.githubusercontent.com/WhizardXD/arenarolodex/fullyear-scheduling/courseserver/2020_2021announcer.json'
      'https://raw.githubusercontent.com/WhizardXD/arenarolodex/master/scraper/newannouncer.json';
    this.xhttp.open('GET', this.coursesURL, true);
    this.xhttp.send();
  }
  //Schedule generator
  generateSchedules(courses, freeblocks) {
    //Make AJAX request to get course list
    var self = this;
    this.xhttp = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
      var onReady = function() {
        if (this.readyState === 4 && this.status === 200) {
          self.courses = JSON.parse(this.responseText);
          self.loadingHandler();
          resolve(self.generator(courses, freeblocks));
        }
        if (this.readyState === 4)
          self.loadingHandler();
      };
      this.xhttp.onreadystatechange = onReady;
      // this.xhttp.onreadystatechange.bind(this);
      //Define which URL to get info from here
      this.coursesURL =
        process.env.GATSBY_COURSES_API ||
        // ||
        // 'https://raw.githubusercontent.com/WhizardXD/arenarolodex/fullyear-scheduling/courseserver/2020_2021announcer.json'
        'https://raw.githubusercontent.com/WhizardXD/arenarolodex/master/scraper/newannouncer.json';
      this.xhttp.open('GET', this.coursesURL, true);
      this.xhttp.send();
    });
  }
  generator(courses, freeblocks) {
    // TODO: Get free block preference to work
    // TODO: Check for seats in class (maybe set a flag, grey out bad schedules?)
    var schedules = [];
    var announcer = this.courses;

    //Weed out empty values
    courses.forEach((course, index) => {
      if (course.Class === '') //If class field is empty
        courses.splice(index, 1); //Remove that course from courses
    });

    var recursiveScheduleMaker = function(courses, schedule) {
      //Which class are we on?
      courses = courses.slice();
      const index = schedule.classes.length;
      const currentClass = courses[index];

      let possibleClasses = [];

      //Some loops to push all courses we need to look at to coursesLooping
      Object.keys(announcer[currentClass.Subject][currentClass.Class]).forEach(teacher => {
        announcer[currentClass.Subject][currentClass.Class][teacher].forEach(possibleClass => {
          possibleClass.push(teacher);
          possibleClass.push(currentClass.Class);
          possibleClasses.push(possibleClass);
        });
      });

      //Loop through coursesLooping, only continue if it doesn't intersect
      possibleClasses.forEach(possibleClass => {
        //Look for block intersection
        // discards if either of the two classes share the same block are full year or if they share the same semester
        for (let existingClass of schedule.classes) {
          if (existingClass[0] === possibleClass[0] &&
              (existingClass[1] === 'Both' || possibleClass[1] === 'Both' || existingClass[1] === possibleClass[1])
          ) return;
        }

        //After we checked, let's continue adding courses if there wasn't any intersection
        if (currentClass.TeacherRequired && possibleClass[3] !== currentClass.Teacher && currentClass.Teacher !== '') return;

        const points = schedule.points;
        const newClasses = schedule.classes.slice();
        const impossible = schedule.impossible || parseInt(possibleClass[2]) < 1;

        const newSchedule = {
          classes: newClasses,
          points: points,
          impossible: impossible
        };

        newSchedule.classes.push(possibleClass); //Add the new course to the schedule
        if (possibleClass[3] === currentClass.Teacher) { //Is this the user's preferred teacher?
          newSchedule.points += currentClass.priorityTeach;
          if (possibleClass[0] === currentClass.Block) {//Is this the user's preferred teacher AND block?
            newSchedule.points += currentClass.priorityBlock;
          }
        }

        if (newSchedule.classes.length === courses.length) { //Is the schedule already done?
          // translates semester ids to names
          const semesterKey = {'1': 'Fall', '2': 'Spring'};
          //Let's check if this one has the free blocks the user wanted:
          freeblocks.forEach(block => {
            if (!newSchedule.classes.find(course => block.Block === course[0] &&
                (block.semester === 'Both' || course[1] === 'Both' || block.semester === semesterKey[course[1]]))) {
              newSchedule.points += block.priorityBlock; //Add preference points
            }
          });
          schedules.push(newSchedule); //Push this schedule to schedules[]
        } else {
          recursiveScheduleMaker(courses, newSchedule); //If we weren't done, go to next course
        }
      });
    };

    //Use recursive function to make schedules!
    recursiveScheduleMaker(courses, {
      classes: [],
      points: 0,
      impossible: false
    });

    //Sort schedules by points
    schedules.sort(function(a, b) {
      return b.points - a.points;
    });

    //Log all the schedules to the console
    // console.log(schedules);

    //Return the schedules
    return schedules;
  }
  //Getters ONLY for filling out CourseSelect components
  getDepartments() {
    if (!this.courses)
      // this.courses = 'https://raw.githubusercontent.com/WhizardXD/arenarolodex/master/courseserver/newannouncer.json'
      return [
        ['Could not get courses']
      ];
    var ret = [
      ['Choose a department', '']
    ];
    Object.keys(this.courses).sort().forEach((dept) => {
      ret.push([dept, dept]);
    });
    return ret;
  }
  getClasses(dept) {
    if (!this.courses)
      return [
        ['Could not get courses']
      ];
    if (dept === '')
      return [
        ['Select a department', '']
      ];
    if (!this.courses[dept])
      return [
        ['invalid department?', '']
      ];
    var ret = [
      ['Choose a class', '']
    ];
    Object.keys(this.courses[dept]).sort().forEach((className) => {
      ret.push([className, className]);
    });
    return ret;
  }
  getTeachers(dept, className) {
    if (!this.courses)
      return [
        ['Could not get courses']
      ];
    if (className === '')
      return [
        ['Select a class', '']
      ];
    if (!this.courses[dept])
      return [
        ['invalid department?', '']
      ];
    if (!this.courses[dept][className])
      return [
        ['invalid class?', '']
      ];
    var ret = [
      ['Choose a teacher', '']
    ];
    Object.keys(this.courses[dept][className]).sort().forEach((teacher) => {
      ret.push([teacher, teacher]);
    });
    return ret;
  }
  getClassInfo(dept, className, teacher) {
    if (!this.courses)
      return [
        ['Could not get courses']
        // from '+this.coursesURL, ''
      ];
    if (teacher === '')
      return [
        ['Select a teacher', '']
      ];
    if (!this.courses[dept])
      return [
        ['invalid department?', '']
      ];
    if (!this.courses[dept][className])
      return [
        ['invalid class?', '']
      ];
    if (!this.courses[dept][className][teacher])
      return [
        ['invalid teacher?', '']
      ];

    var ret = [
      ['Choose a block', '']
    ];
    this.courses[dept][className][teacher].sort().forEach((info) => {
      ret.push([info[0] + ', ' + info[2] + ' seats available', info[0]]);
    });
    return ret;
  }
}
