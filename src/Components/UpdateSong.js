import React, {Component} from 'react';
import axios from 'axios';
import Button from '../Components/Button';



export default class UpdateSong extends Component{
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
        this.editSong = this.editSong.bind(this);
    }

    componentDidMount(){
        const {artist,songName,songLength,genre,subGenre,year,img,id} = this.props.songInfo;
        this.setState({artist,songName,songLength,genre,subGenre,year,img,id});
        console.log(this.props.songInfo);
    }
   editSong(){
        axios.put(`/api/updateSong/${this.state.id}`, this.state)
        .then(response=>{
            let songEdit = [];
            this.props.edit();
            this.setState({
              artist: '',
              songName: '',
              genre: '',
              songLength: '',
              subGenre: '',
              year:'',
              img: ''
            })
        })
        .catch(err=>{
          console.log(err)
        })
      }

    handleInputChange(key,value){
this.setState({
     [key]:value
})
console.log(this.state);
    }
    render(){
        return(
            <div class="update">
        <input value = {this.state.artist}onChange={(e)=>{this.handleInputChange('artist',e.target.value)}}/>
        <input value = {this.state.songName}onChange={(e)=>{this.handleInputChange('songName',e.target.value)}}/>
        <input value = {this.state.genre}onChange={(e)=>{this.handleInputChange('genre',e.target.value)}}/>
        <input value = {this.state.songLength}onChange={(e)=>{this.handleInputChange('songLength',e.target.value)}}/>
        <input value = {this.state.subGenre}onChange={(e)=>{this.handleInputChange('subGenre',e.target.value)}}/>
        <input value = {this.state.year}onChange={(e)=>{this.handleInputChange('year',e.target.value)}}/>
        <input value = {this.state.img}onChange={(e)=>{this.handleInputChange('img',e.target.value)}}/>
    
        <Button onClick = {this.editSong} name="Save"/>
        </div>
        )
    }
}