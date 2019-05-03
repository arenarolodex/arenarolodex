import React from 'react';

import styles from './courses.module.css';

/**An individual Course where the user inputs their class, preferred teacher
and block, etc.*/
class Course extends React.Component {
  removeSelf() {
    this.props.remove(this.props.id);
  }
  render() {
    return (
      <div className={styles.course}>
        <button className={styles.deleteBut}
          onClick={this.removeSelf.bind(this)}>
          Remove</button>
        <CourseSelect name="Subject" parentKey={this.props.id} handleChange={this.props.changeHandler}
          options={this.props.options}
          defValue={this.props.default.Subject} />
        <CourseSelect name="Class" parentKey={this.props.id} handleChange={this.props.changeHandler}
          options={this.props.options}
          defValue={this.props.default.Class} />
        <CourseSelect name="Teacher" parentKey={this.props.id} handleChange={this.props.changeHandler}
          options={this.props.options}
          defValue={this.props.default.Teacher} />
        <CourseSelect name="Block" parentKey={this.props.id} handleChange={this.props.changeHandler}
          options={this.props.options}
          defValue={this.props.default.Block} />
      </div>
    );
  }
}

class CourseSelect extends React.Component {
  handleChange(e) {
    this.props.handleChange(this.props.parentKey, this.props.name, e.target.value, false);
  }
  handleChangeRequired(e) {
    this.props.handleChange(this.props.parentKey, this.props.name+'Required', e.target.checked, false);
  }
  render() {
    let checkbox = '';
    if (this.props.name === 'Teacher')
      checkbox = (
        <label style={{textAlign:'right', marginTop:'0.2rem'}}
          onChange={this.handleChangeRequired.bind(this)}>
            Is this a required {this.props.name.toLowerCase()}? <input type="checkbox" />
        </label>
      );
    const options = (this.props.options && this.props.options[this.props.name] !== undefined) ?
      this.props.options[this.props.name] : [];
    return (
      <label>
        {this.props.name}
        <div>
          <select defaultValue={this.props.defValue}
            onChange={this.handleChange.bind(this)}>
            {options.map((option) =>
              <option key={option[1]} value={option[1]}>{option[0]}</option>
            )}
          </select>
          {checkbox}
        </div>
      </label>
    );
  }
}

export default Course;
