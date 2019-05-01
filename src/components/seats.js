import React from 'react'

import SelectionUtilities from '../selectionutilities'

export default class Seats extends React.Component {
    constructor() {
        super();
        this.state = {
            popup: false
        }
    }

    openPopupMenu = () => {
        this.setState({popup=true});
        
    }



}
render() {
    return (
        <button onClick={() => this.openPopupMenu()}>
        

        </button>
    )
}
