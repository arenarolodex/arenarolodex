import React from 'react';

import styles from './courses.module.css';

class FreeBlock extends React.Component {
  removeSelf() {
    this.props.remove(this.props.id);
  }
  handleChange(e) {
    this.props.changeHandler(this.props.id, e.target.name, e.target.value, true);
    e.preventDefault();
  }
  render() {
    return (
      <div className={styles.freeblock}>
        <button className={styles.deleteBut}
          onClick={this.removeSelf.bind(this)}>
          Remove</button>
        <label>
          Preferred free block
          <select onChange={this.handleChange.bind(this)} name="Block"
            defaultValue={this.props.default.Block}>
            <option value="">Choose a block</option>
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
          <select onChange={this.handleChange.bind(this)} name="priorityBlock"
            defaultValue={this.props.default.priorityBlock}>
            <option value="">Choose a ranking</option>
            <option value="1">Low</option>
            <option value="5">Medium</option>
            <option value="10">High</option>
          </select>

          {/* <input
            value={this.props.default.priorityBlock}
            type="number" min="1" max="10"
            onChange={this.handleChange.bind(this)} name="priorityBlock" /> */}

        </label>
        <label>
          Free block semester
          <select onChange={this.handleChange.bind(this)} name="semester"
                  defaultValue={this.props.default.semester}>
            <option value="">Choose a semester</option>
            <option value="1">Fall Semester</option>
            <option value="2">Spring Semester</option>
            <option value="Both">Both</option>
          </select>
        </label>
      </div>
    );
  }
}

export default FreeBlock;
