import React from 'react'

export default class Button extends React.Component{
    constructor(){
    }
    render(){
      return (
        <button>
          {props.name}
        </button>
      );
    }
}
