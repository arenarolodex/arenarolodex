/**A class that handles courses and generating schedules for the client*/
export default class SelectionUtilities {
  constructor(){
    var self = this;
    this.courses = undefined;
    //Make AJAX request to get course list
    this.xhttp = new XMLHttpRequest();
    this.xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        self.courses = JSON.parse(this.responseText);
      };
    };
    this.xhttp.onreadystatechange.bind(this);
    this.xhttp.open("GET", "http://localhost:6969/", true);
    this.xhttp.send();
  }
  //Schedule generator
  generateSchedules(courses){
    var schedules = [];
    var announcer = this.courses;
    var recursiveScheduleMaker = function(courses, schedule) {
      //Which class are we on?
      const index = schedule.length;
      const currentClass = courses[index];

      var coursesLooping = [];

      //Some loops to push all courses we need to look at to coursesLooping
      Object.keys(announcer[currentClass.Subject][currentClass.Class]).forEach((key) => {
        var teacher = key;
        announcer[currentClass.Subject][currentClass.Class][key].forEach((teach) => {
          teach.push(teacher);
          teach.push(currentClass.Class);
          coursesLooping.push(teach);
        });
      });

      //Loop through coursesLooping, only continue if it doesn't intersect
      coursesLooping.forEach((newCourse) => {
        //Look for block intersection - use flag blockIntersect
        var blockIntersect = false;
        schedule.forEach((existingCourse) => {
          if (existingCourse[0] === newCourse[0]) { //Do the blocks intersect?
            blockIntersect = true;
            return;
          }
        });

        //After we checked, let's continue adding courses if there wasn't any
        //intersection
        if (!blockIntersect) {
          var newSchedule = schedule.slice(0);
          newSchedule.push(newCourse); //Add the new course to the schedule

          if(newSchedule.length === courses.length){ //Is the schedule already done?
            schedules.push(newSchedule); //Push this schedule to schedules[]
            return; //Continue to the next newCourse
          } else {
            recursiveScheduleMaker(courses, newSchedule); //If we weren't done, go to next course
          }
        }
      });
    };

    //Use recursive function to make schedules!
    recursiveScheduleMaker(courses, []);

    //Log all the schedules to the console
    console.log(schedules);
  }
  //Getters ONLY for filling out CourseSelect components
  getDepartments(){
    if (!this.courses)
      return [["Could not get courses from http://localhost:6969/",""]];
    var ret = [["Choose a department",""]];
    Object.keys(this.courses).forEach((dept)=>{ret.push([dept,dept])});
    return ret;
  }
  getClasses(dept){
    if (!this.courses)
      return [["Could not get courses from http://localhost:6969/",""]];
    if(dept === "")
      return [["Select a department",""]];
    if(!this.courses[dept])
      return [["invalid department?",""]];
    var ret = [["Choose a class",""]];
    Object.keys(this.courses[dept]).forEach((className) => {ret.push([className,className]);});
    return ret;
  }
  getTeachers(dept, className){
    if (!this.courses)
      return [["Could not get courses from http://localhost:6969/",""]];
    if(className === "")
      return [["Select a class",""]];
    if(!this.courses[dept])
      return [["invalid department?",""]];
    if(!this.courses[dept][className])
      return [["invalid class?",""]];
    var ret = [["Choose a teacher",""]];
    Object.keys(this.courses[dept][className]).forEach((teacher) => {ret.push([teacher,teacher]);});
    return ret;
  }
  getClassInfo(dept, className, teacher){
    if (!this.courses)
      return [["Could not get courses from http://localhost:6969/",""]];
    if(teacher === "")
      return [["Select a teacher",""]];
    if(!this.courses[dept])
      return [["invalid department?",""]];
    if(!this.courses[dept][className])
      return [["invalid class?",""]];
    if(!this.courses[dept][className][teacher])
      return [["invalid teacher?",""]];

    var ret = [["Choose a block",""]];
    this.courses[dept][className][teacher].forEach((info)=>{
      ret.push([info[0]+", "+info[2]+" seats available", info[0]]);
    });
    return ret;
  }
}
