/**A class that handles courses and generating schedules for the client*/
export default class SelectionUtilities {
  constructor(callback) {
    var self = this;
    this.courses = undefined;
    //Make AJAX request to get course list
    this.xhttp = new XMLHttpRequest();
    this.xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        self.courses = JSON.parse(this.responseText);
      };
      if (this.readyState === 4)
        callback();
    };
    this.xhttp.onreadystatechange.bind(this);
    //Define which URL to get info from here
    this.coursesURL = process.env.GATSBY_COURSES_API
      || "https://raw.githubusercontent.com/areyoualex/arenarolodex/master/test/courseserver/newannouncer.json";
    this.xhttp.open("GET", this.coursesURL, true);
    this.xhttp.send();
  }
  //Schedule generator
  generateSchedules(courses, freeblocks) {
    // TODO: Get free block preference to work
    // TODO: Check for seats in class (maybe set a flag, grey out bad schedules?)
    var schedules = [];
    var announcer = this.courses;

    //Weed out empty values
    courses.forEach((course, index) => {
      if (course.Class === "") //If class field is empty
        courses.splice(index, 1); //Remove that course from courses
    });

    var recursiveScheduleMaker = function(courses, schedule) {
      //Which class are we on?
      const index = schedule.schedule.length;
      const currentClass = courses[index];

      var coursesLooping = [];

      //Some loops to push all courses we need to look at to coursesLooping
      Object.keys(announcer[currentClass.Subject][currentClass.Class]).forEach((key) => {
        var teacher = key;
        announcer[currentClass.Subject][currentClass.Class][key].forEach((teach) => {
          teach.push(teacher);
          teach.push(currentClass.Class);
          if (teach[2] !== "0" && teach[2] !== "-1" && teach[2] !== "-2")
            coursesLooping.push(teach);
        });
      });

      //Loop through coursesLooping, only continue if it doesn't intersect
      coursesLooping.forEach((newCourse) => {
        //Look for block intersection - use flag blockIntersect
        var blockIntersect = false;
        schedule.schedule.forEach((existingCourse) => {
          if (existingCourse[0] === newCourse[0]) { //Do the blocks intersect?
            blockIntersect = true;
            return;
          }
        });

        //After we checked, let's continue adding courses if there wasn't any
        //intersection
        if (blockIntersect) return;
        if (currentClass.TeacherRequired && newCourse[3] !== currentClass.Teacher) return;

        var points = schedule.points;
        var sched = schedule.schedule.slice(0);
        var newSchedule = {
          schedule: sched,
          points: points
        };
        newSchedule.schedule.push(newCourse); //Add the new course to the schedule
        if (newCourse[3] === currentClass.Teacher) { //Is this the user's preferred teacher?
          newSchedule.points += currentClass.priorityTeach;
          if (newCourse[0] === currentClass.Block) //Is this the user's preferred teacher AND block?
            newSchedule.points += currentClass.priorityBlock;
        }

        if (newSchedule.schedule.length === courses.length) { //Is the schedule already done?
          //Let's check if this one has the free blocks the user wanted:
          freeblocks.forEach((block) => {
            if (!newSchedule.schedule.find((course) => block.Block === course[0]))
              newSchedule.points += block.priorityBlock; //Add preference points
          });
          schedules.push(newSchedule); //Push this schedule to schedules[]
          return; //Continue to the next newCourse
        } else {
          recursiveScheduleMaker(courses, newSchedule); //If we weren't done, go to next course
        }
      });
    };

    //Use recursive function to make schedules!
    recursiveScheduleMaker(courses, {
      schedule: [],
      points: 0
    });

    //Sort schedules by points
    schedules.sort(function(a, b) {
      return b.points - a.points;
    });

    //Log all the schedules to the console
    console.log(schedules);

    //Return the schedules
    return schedules;
  }
  //Getters ONLY for filling out CourseSelect components
  getDepartments() {
    if (!this.courses)
      return [
        ["Could not get courses from "+this.coursesURL, ""]
      ];
    var ret = [
      ["Choose a department", ""]
    ];
    Object.keys(this.courses).sort().forEach((dept) => {
      ret.push([dept, dept])
    });
    return ret;
  }
  getClasses(dept) {
    if (!this.courses)
      return [
        ["Could not get courses from "+this.coursesURL, ""]
      ];
    if (dept === "")
      return [
        ["Select a department", ""]
      ];
    if (!this.courses[dept])
      return [
        ["invalid department?", ""]
      ];
    var ret = [
      ["Choose a class", ""]
    ];
    Object.keys(this.courses[dept]).sort().forEach((className) => {
      ret.push([className, className]);
    });
    return ret;
  }
  getTeachers(dept, className) {
    if (!this.courses)
      return [
        ["Could not get courses from "+this.coursesURL, ""]
      ];
    if (className === "")
      return [
        ["Select a class", ""]
      ];
    if (!this.courses[dept])
      return [
        ["invalid department?", ""]
      ];
    if (!this.courses[dept][className])
      return [
        ["invalid class?", ""]
      ];
    var ret = [
      ["Choose a teacher", ""]
    ];
    Object.keys(this.courses[dept][className]).sort().forEach((teacher) => {
      ret.push([teacher, teacher]);
    });
    return ret;
  }
  getClassInfo(dept, className, teacher) {
    if (!this.courses)
      return [
        ["Could not get courses from "+this.coursesURL, ""]
      ];
    if (teacher === "")
      return [
        ["Select a teacher", ""]
      ];
    if (!this.courses[dept])
      return [
        ["invalid department?", ""]
      ];
    if (!this.courses[dept][className])
      return [
        ["invalid class?", ""]
      ];
    if (!this.courses[dept][className][teacher])
      return [
        ["invalid teacher?", ""]
      ];

    var ret = [
      ["Choose a block", ""]
    ];
    this.courses[dept][className][teacher].sort().forEach((info) => {
      ret.push([info[0] + ", " + info[2] + " seats available", info[0]]);
    });
    return ret;
  }
}
