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
    //// TODO: redo Permute.py
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
