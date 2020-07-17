import React from 'react';
import logo from './logo.svg';
import Game from './components/game'
import Intro from './components/intro'
import Outro from './components/outro'
import './App.css';

const Header = (props)=>{

  let extra = null

  if(props.totalSongs > 0) {
    extra = <span className='header-extra'>
      <span></span>
      <span></span>
    </span>
  }

  let score = null

  if(props.currentSong >= 1) {
    score = <span className='game-info'>{props.correctSongs + ' / ' + props.currentSong}</span>
  }

  return (
    <div className='header-div'>
      <span className='header-title' onClick={()=>window.location.reload()}>{props.headerTitle}</span>
      {score}
    </div>
  )
}

const Footer = ()=>(
  <div className='footer-div'>Reego Dev</div>
)

class Transition extends React.Component {

  render() {
    let text = ''
    if(this.props.betweenSongs) {
      text = 'Between Songs'
    }
    else {
      text = 'End GAME'
    }
    return (
      <div className='transition'>
        <br/>
        <br/>
        <h1>
        {this.props.topMessage}
        </h1>
        <p>{this.props.bottomMessage}</p>
        <br/>
        <div onClick={this.props.onTransition}>Continue</div>
      </div>
    )
  }
}

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      'date':'',
      'songs':[], // songs to use
      'correct':null, // game data
      'currentSong':-1
    }
  }

  render() {

    let body = null

    if(!this.state.transition) {
      if(this.state.currentSong >= 0 && this.state.currentSong < this.state.songs.length) {
        body = <Game rank={this.state.songs[this.state.currentSong].rank} artist={this.state.songs[this.state.currentSong].artist} date={this.state.date} song={this.state.songs[this.state.currentSong]} onEndRound={this.onEndRound.bind(this)}/>
      }
      else if(this.state.currentSong === -1) {
        body = <Intro onSubmit={this.onSubmit.bind(this)}/>
      }
      else {
        body = <Outro correct={this.state.correct} total={this.state.songs.length} date={this.state.date}/>
      }
    }
    else {
      body = <Transition topMessage={this.state.topMessage} bottomMessage={this.state.bottomMessage} betweenSongs={this.state.currentSong < this.state.songs.length} onTransition={this.onTransition.bind(this)}/>
    }

    return (
      <React.Fragment>
        <Header headerTitle='Charts Guessr' totalSongs={this.state.songs.length} correctSongs={this.state.correct} currentSong={this.state.currentSong}/>
        {body}
      </React.Fragment>
    )
  }

  onTransition(e) {
    this.setState(
      {'transition':false}
    )
  }

  onSubmit(e, data) {
    fetch('http://localhost:5000/chart/'+data.numSongs+'?from='+data.startYear+'&to='+data.endYear)
      .then(res=>
        res.json().then(data=>
            {
              data['songs'].reverse()
            this.setState(
            {
              'date':data['date'],
              'songs':data['songs'],
              'correct':0,
              'currentSong':0,
              'transition':false,
              'topMessage':null,
              'bottomMessage':null
            }
            )
          }
          )
      )
      .catch(function(err) {

      })
  }

  onEndRound(data) {
    let updatedState = {
      'correct':this.state.correct,
      'currentSong':this.state.currentSong + 1,
      'topMessage':data.topMessage,
      'bottomMessage':data.bottomMessage,
      'transition':true
    }
    if(data.correct) {
      updatedState.correct++
    }

    this.setState(updatedState)

  }
}

export default App;
