import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import AddSong from './Components/AddSong';
import UpdateSong from './Components/UpdateSong';
import Home from './Components/Home';
import Button from './Components/Button';


class App extends Component {
  constructor(){
    super();
    this.state = {
      music:[]
    };
    
    this.getSongs = this.getSongs.bind(this);
    this.updateSong = this.updateSong.bind(this);
  }


  componentDidMount(){//runs once each time the program is loaded ie: header/buttons/forms etc.
   this.getSongs();
  }

getSongs(){
  axios.get('/api/viewPlaylist')
  .then(response=>{
    console.log(response)
    this.setState(()=>({music:response.data}))
  })
  .catch(err=>{
    console.log(err)
  })
}

delete(id){
axios.delete(`/api/deleteSong/${id}`)
.then(response => {
  this.setState(()=>({music:response.data}))
})
.catch(err=>{
  console.log(err)
})
}


updateSong(id){
  let toEdit = this.state.music.slice();
  toEdit[id].update=true;
  this.setState({music:toEdit})
}

  render() {

    console.log(this.state);
    return (
      <div className="App">
      <Home type="header"/>
      <AddSong newSong= {this.getSongs}/>
     {this.state.music.map((e,i)=>{
       return (<div class="background"><div class="body"key = {e.id}>
                        <h3>{e.artist}<Button onClick={()=>{this.delete(i)}} name="Delete"/></h3>
                           <h2>"{e.songName}"{e.update ? <UpdateSong songInfo = {e} edit = {this.getSongs}/> : 
                           <Button onClick={()=>{this.updateSong(i)}} name="Edit Item"/>}</h2>
                      <img class="main"src = {e.img} alt={e.songName}/>
       </div>
       </div>)
     })}
      
      
      <Home type="footer"/>
      </div>
    );
  }
}

export default App;
