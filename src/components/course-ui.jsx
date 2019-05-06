import React from 'react';
import Select from 'react-select';
// import Animated from 'react-select/lib/animated';
// import chroma from 'chroma-js';

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
        width: 'auto',
        minWidth: '200px',
        height: '22.6666667px',
        float: 'left',
      }),
      //secondary layer
      control: base => ({
        ...base,
        float: 'right',
        background: 'purple',
        display: 'flex',
        width: 'auto',
        minWidth: '200px',
        height: 'auto',
        minHeight: 22.66667,
        fontSize: '16px',
        '@media (max-width: 800px)': {
          fontSize: '2vh'
        },
      }),
      //selected choices background container
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
      //background of "X"
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
      indicatorContainer: base => ({
        ...base,
        display: 'flex',
        position: 'relative',
        background: 'green',
        height: '22.6666667px',
        minHeight: 22.66667,
        fontSize: '16px',
        '@media (max-width: 800px)': {
          fontSize: '2vh'
        },
        padding: '0px',
      }),
      //hard to tell
      // multiValue: base => ({
      //   ...base,
      //   background: 'lightYellow',
      //   width: 'auto',
      //   height: 'auto',
      //   minHeight: 22.66667,
      //   fontSize: '16px',
      //   '@media (max-width: 800px)': {
      //     fontSize: '2vh'
      //   },
      // }),
      //high level background over all options/choices
      option: base => ({
        ...base,
        // background: 'purple',
        height: '22.66667px',
        // width: '400%',
        minHeight: '30px',
        maxHeight: '5vh',
        fontSize: '16px',
        '@media (max-width: 800px)': {
          fontSize: '2vh'
        },
      }),
      //hard to tell
      menu: base => ({
        ...base,
        float: 'right',
        background: 'orange',
        height: 'auto',
        // width: '400%',
        minHeight: 22.66667,
        fontSize: '16px',
        '@media (max-width: 800px)': {
          fontSize: '2vh'
        },
      }),
      //background of dropdown arrow
      dropdownIndicator: base => ({
        ...base,
        display: 'flex',
        position: 'relative',
        background: 'orange',
        // maxWidth: '100px',
        height: '22.6666667px',
        minHeight: 22.66667,
        fontSize: '16px',
        padding: '0.5px 8px 0',
        '@media (max-width: 800px)': {
          fontSize: '2vh'
        },
      }),
      //hard to tell
      group: base => ({
        ...base,
        background: 'lightYellow',
        // maxWidth: '100px',
        height: 22.6666667,
        minHeight: 22.66667,
        fontSize: '16px',
        '@media (max-width: 800px)': {
          fontSize: '2vh'
        },
      }),
      //hard to tell
      groupHeading: base => ({
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
      //small line to the left of dropdown arrow
      indicatorSeparator: base => ({
        ...base,
        background: 'lightYellow',
        width: 'auto',
        height: 'auto',
        minHeight: 22.66667,
        fontSize: '16px',
        '@media (max-width: 800px)': {
          fontSize: '2vh'
        },
      }),
      //new typing line
      input: base => ({
        ...base,
        display: 'flex',
        position: 'relative',
        // background: 'red',
        width: 'auto',
        height: '22.66667px',
        minHeight: '22.66667px',
        fontSize: '16px',
        padding: 0,
        marginTop: '-14px',
        marginLeft: '-3px',
        '@media (max-width: 800px)': {
          fontSize: '2vh'
        },
      }),
      //background of choices/options (behind)
      menuList: base => ({
        ...base,
        background: 'red',
        width: 'auto',
        height: 'auto',
        minHeight: 22.66667,
        fontSize: '16px',
        '@media (max-width: 800px)': {
          fontSize: '2vh'
        },
      }),
      //hard to tell
      menuPortal: base => ({
        ...base,
        background: 'red',
        // maxWidth: '100px',
        height: 22.6666667,
        minHeight: 22.66667,
        fontSize: '16px',
        '@media (max-width: 800px)': {
          fontSize: '2vh'
        },
      }),
      //hard to tell
      multiValue: base => ({
        ...base,
        display: 'flex',
        position: 'relative',
        background: 'green',
        width: 'auto',
        height: 'auto',
        minHeight: '22',
        fontSize: '16px',
        marginTop: '4px',
        '@media (max-width: 800px)': {
          fontSize: '2vh'
        },
      }),
      //background of answered choices
      multiValueLabel: base => ({
        ...base,
        display: 'flex',
        position: 'relative',
        background: 'orange',
        width: 'auto',
        height: 'auto',
        // minHeight: 22.66667,
        fontSize: '16px',
        marginTop: '-5.5px',
        '@media (max-width: 800px)': {
          fontSize: '2vh'
        },
      }),
      //"X" for answered choices
      multiValueRemove: base => ({
        ...base,
        background: 'orange',
        width: 'auto',
        height: 'auto',
        minHeight: 22.66667,
        fontSize: '16px',
        marginTop: '-5.5px',
        '@media (max-width: 800px)': {
          fontSize: '2vh'
        },
      }),
      //hard to tell
      noOptionsMessage: base => ({
        ...base,
        background: 'lightYellow',
        // maxWidth: '100px',
        height: 22.6666667,
        minHeight: 22.66667,
        fontSize: '16px',
        '@media (max-width: 800px)': {
          fontSize: '2vh'
        },
      }),
      singleValue: base => ({
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
      placeholder: base => ({
        ...base,
        height: '22.6666667px',
        minHeight: '22.66667px',
        marginTop: '1px',
      })
    };


    const colourStyles = {
      control: styles => ({
           ...styles,
           backgroundColor: 'white'
        }),
      // option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      //   const color = chroma(data.color);
      //   return {
      //     ...styles,
      //     backgroundColor: isDisabled
      //       ? null
      //       : isSelected ? data.color : isFocused ? color.alpha(0.1).css() : null,
      //     color: isDisabled
      //       ? '#ccc'
      //       : isSelected
      //         ? chroma.contrast(color, 'white') > 2 ? 'white' : 'black'
      //         : data.color,
      //     cursor: isDisabled ? 'not-allowed' : 'default',
      //   };
      // },
      multiValue: (styles, { data }) => {
        const color = chroma(data.color);
        return {
          ...styles,
          backgroundColor: color.alpha(0.1).css(),
        };
      },
      multiValueLabel: (styles, { data }) => ({
        ...styles,
        color: data.color,
      }),
      multiValueRemove: (styles, { data }) => ({
        ...styles,
        color: data.color,
        ':hover': {
          backgroundColor: data.color,
          color: 'white',
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
              // placeholder="Select a class"
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
              // placeholder="Select a teacher"
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
