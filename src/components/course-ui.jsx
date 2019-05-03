import React from 'react';
import Select from 'react-select';
// import Animated from 'react-select/lib/animated';

import styles from './courses.module.css';

/**An individual Course where the user inputs their class, preferred teacher
and block, etc.*/
class Course extends React.Component {
  removeSelf() {
    this.props.remove(this.props.id);
  }
  render() {
    // const options = (this.props.options['Teacher'] !== undefined) ?
    //   this.props.options['Teacher'] : [];

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

    const customStyles = {
      container: base => ({
        ...base,
        height: '22.6666667px',
        float: 'left',
      }),
      control: base => ({
        ...base,
        float: 'right',
        background: 'blue',
        display: 'flex',
        height: '22.6666667px',
        width:'400%',
        minHeight: 22.66667,
        fontSize: '16px',
        '@media (max-width: 800px)': {
          fontSize: '2vh'
        },
      }),
      valueContainer: base => ({
        ...base,
        display: 'flex',
        position: 'relative',
        background: 'pink',
        height: '22.6666667px',
        minHeight: 22.66667,
        fontSize: '16px',
        '@media (max-width: 800px)': {
          fontSize: '2vh'
        },
      }),
      indicatorsContainer: base => ({
        ...base,
        display: 'flex',
        position: 'relative',
        background: 'pink',
        height: '22.6666667px',
        minHeight: 22.66667,
        fontSize: '16px',
        '@media (max-width: 800px)': {
          fontSize: '2vh'
        },
        padding: '0px',
      }),
      multiValue: base => ({
        ...base,
        background: 'lightYellow',
        maxWidth: '100px',
        height: 22.6666667,
        minHeight: 22.66667,
        fontSize: '16px',
        '@media (max-width: 800px)': {
          fontSize: '2vh'
        },
      }),
      option: base => ({
        ...base,
        height: 22.66667,
        width: '400%',
        minHeight: 22.66667,
        fontSize: '16px',
        '@media (max-width: 800px)': {
          fontSize: '2vh'
        },
      }),
      menu: base => ({
        ...base,
        float: 'right',
        height: 'auto',
        width: '400%',
        minHeight: 22.66667,
        fontSize: '16px',
        '@media (max-width: 800px)': {
          fontSize: '2vh'
        },
      }),
    };

    if (this.props.name === 'Subject' || this.props.name === 'Class') {
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
    } else if (this.props.name === 'Teacher') {
      return (
        <label>
          {this.props.name}
          <div>
            <Select
              isMulti
              placeholder="Select a class"
              styles={customStyles}
              options={
                options.map((option) => {
                  return {
                    value: option[1],
                    label: option[0]
                  };
                })
              }
            />
          </div>
        </label>
      );
    } else if (this.props.name === 'Block') {
      return (
        <label>
          {this.props.name}
          <div>
            <Select
              isMulti
              placeholder="Select a teacher"
              styles={customStyles}
              options={
                options.map((option) => {
                  return {
                    value: option[1],
                    label: option[0]
                  };
                })
              }
            />
          </div>
        </label>
      );
    }
  }
}

export default Course;
