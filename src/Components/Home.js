import React, {Component} from 'react';

export default class Home extends Component{

headOrFoot(){
    let word = '';
    if(this.props.type ==="header"){
        return <div class="container">
                        <img id="top" src="http://uphoric.tv/wp-content/uploads/UPHORIC-POST-BUCKETLIST-ULTRA.jpg"/>
                        <div class="centered"><header ><br/>Welcome to Beat Retreat!</header></div>
                 </div>
    }
    else{
        return <div><footer>Author: Hunter Sexton</footer></div>
    }
}
render(){
    return(
        <div>
        {this.headOrFoot()}
        </div>
    )

}

}
