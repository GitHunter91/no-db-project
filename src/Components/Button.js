import React, {Component} from 'react';

export default class Button extends Component{
    constructor(props){
        super(props);
        
    }
    render(){
        return(
            <button onClick={(val)=>{this.props.onClick(val)}}>{this.props.name}</button>
        )
    }
}
