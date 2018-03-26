import React, {Component} from 'react';
import axios from 'axios';
import Button from './Button';




export default class AddSong extends Component{
    constructor(){
        super();
        this.state = {
            
            artist: '',
            songName: '',
            genre: '',
            songLength: '',
            subGenre: '',
            year:'',
            img: ''

        }
        this.addSongToDB = this.addSongToDB.bind(this);
    }
    addSongToDB(){
        console.log(this.state)
        axios.post('/api/addSong', this.state)
        .then(response=>{
          let music = [];
          this.props.newSong();
          this.setState({
            artist: '',
            songName: '',
            genre: '',
            songLength: '',
            subGenre: '',
            year:'',
            img: ''
          });
        })
        .catch(err=>{
          console.log(err)
        })
        console.log(this.state)
      }

    handleInputChange(key,value){
this.setState({
     [key]:value
})
// console.log(this.state);
    }
    render(){
        return(
            <div className="add">
        <input placeholder="Artist"value = {this.state.artist}onChange={(e)=>{this.handleInputChange('artist',e.target.value)}}/>
        <input placeholder="Title"value = {this.state.songName}onChange={(e)=>{this.handleInputChange('songName',e.target.value)}}/>
        <input placeholder="Genre"value = {this.state.genre}onChange={(e)=>{this.handleInputChange('genre',e.target.value)}}/>
        <input placeholder="Length"value = {this.state.songLength}onChange={(e)=>{this.handleInputChange('songLength',e.target.value)}}/>
        <input placeholder="Sub-Genre"value = {this.state.subGenre}onChange={(e)=>{this.handleInputChange('subGenre',e.target.value)}}/>
        <input placeholder="Year"value = {this.state.year}onChange={(e)=>{this.handleInputChange('year',e.target.value)}}/>
        <input placeholder="IMG url"value = {this.state.img}onChange={(e)=>{this.handleInputChange('img',e.target.value)}}/>
    
        <Button onClick = {this.addSongToDB} name="Submit Song"/>
        </div>
        )
    }
}