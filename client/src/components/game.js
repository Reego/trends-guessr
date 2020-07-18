import React from 'react'
import styles from '../styles/game.css'

const GuessTrial = (props) => (
    <span className='guess-trial'>{(props.marked) ? 'X' : ' '}</span>
)

const LetterBlank = (props) => (
    <span className='letter-blank'>{props.value}</span>
)

const GuessTrialsWrap = (props) => {

    let items = []

    for(let i = 0; i < props.trials.length; i++) {
        items.push(
            <React.Fragment key={i}>
            <GuessTrial key={i} marked={props.trials[i]}/>
            { i < props.trials.length - 1 &&
            <span className='guess-trial-space'>  </span>
            }
            </React.Fragment>
        )
    }

    return <div className='guess-trials-wrap'>{items}</div>
}

const QuestionTitle = (props) => {

    let date = ''
    let splitdate = props.date.split('-')
    date = splitdate[2] + '/' + splitdate[1] + '/' + splitdate[0]
    return (
    <div className='question-title-wrap'>
        <h1>{props.title}</h1>
        <p>Artist: {props.artist}</p>
        <p>Chart Position: #{props.rank}</p>
        <p>Date: {date}</p>
    </div>
    )
}

const Break = (props) => {
    let size = props.size
    if(!size) {
        size = '2em'
    }
    return <div style={{height:size, width:'100%'}}></div>
}

const allLetters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

const GameScreen = (props) => {

    let items = []
    let title = props.song.title.toUpperCase()
    let actualSongTitle = props.song.actualSongTitle;
    for(let i = 0; i < actualSongTitle.length; i++) {
        const letter = actualSongTitle.charAt(i)
        //console.log(props.usedLetters)

        let extra = null

        if(i < actualSongTitle.length - 1) {
            if(letter === ' ') {
                items.push(
                    <React.Fragment key={i}>
                    <br/>
                    <br/>
                    <br/>
                    </React.Fragment>
                )
                continue
            }
            else if(i < actualSongTitle.length - 1 && actualSongTitle.charAt(i+1) !== ' ') {
                extra = <span className='letter-blank-space'>  </span>
            }
        }

        items.push(
            <React.Fragment key={i}>
            <LetterBlank key={i} value={(props.usedLetters.includes(letter) || !allLetters.includes(letter)) ? letter : ' '}/>
            {extra}
            </React.Fragment>
        )
    }

    return <div className='game-screen'>{items}</div>

}

const LettersScreen = (props) => {

    let items = []
    for(let i = 0; i < props.leftLetters.length; i++) {
        items.push(
            <p className='letter-button' onClick={(e)=>props.onLetterClick(e, props.leftLetters[i])} letter={props.leftLetters[i]} key={i}>{props.leftLetters[i]}</p>
        )
    }

    return (
        <div className='letters-screen'>
            {items}
        </div>
    )
}

class Game extends React.Component {

    constructor(props) {
        super(props)

        this.onEndRound = props.onEndRound

        this.state = {
            'trials':[false, false, false],
            'dateRange':'December 20, 2018 to December 27, 2018',
            'usedLetters':[],
            'leftLetters':null
        }
    }

    static getDerivedStateFromProps(props, state) {
        // return {favoritecolor: props.favcol };

        let usedLetters = state.usedLetters
        let leftLetters = [...allLetters]

        leftLetters = leftLetters.filter((letter)=>!usedLetters.includes(letter))

        let newState = {
            'trials':state.trials,
            'dateRange':'December 20, 2018 to December 27, 2018',
            'usedLetters':usedLetters,
            'leftLetters':leftLetters
        }
        return newState
    }

    letterClick(e, letter) {
        let updatedUsedLetters = [...this.state.usedLetters]
        updatedUsedLetters.push(letter)

        let updatedTrials = [...this.state.trials]

        let songUpper = this.props.song.title.toUpperCase()

        let addTrialX = !songUpper.includes(letter)

        if(!addTrialX) {
            let endRound = true
            for(let i = 0; i < songUpper.length; i++) {
                if(!updatedUsedLetters.includes(songUpper.charAt(i))) {
                    endRound = false
                    break
                }
            }
            // Made thru, completed

            //this.setState()
            if(endRound)
                this.onEndRound(
                    {
                        'topMessage':this.props.song.actualSongTitle + ' by ' + this.props.artist,
                        'bottomMessage':'Good job! You guessed it!',
                        'correct':true
                    }
                )
        }
        else {
            let endRound = true
            for(let i = 0; i < this.state.trials.length; i++) {
                if(!this.state.trials[i]) {
                    updatedTrials[i] = true
                    endRound = false
                    break
                }
            }

            // Made thru, completed
            if(endRound)
                this.onEndRound(
                    {
                        'topMessage':this.props.song.actualSongTitle + ' by ' + this.props.artist,
                        'bottomMessage':'Nice try... better luck next time!',
                        'correct':false
                    }
                )
        }


        this.setState({
            'trials':updatedTrials,
            'usedLetters':updatedUsedLetters
        })
    }

    render() {
        return (
            <div>
            <Break size='3em'/>
            <QuestionTitle title='Can You Guess The Song?' rank={this.props.rank} artist={this.props.artist} date={this.props.date}/>
            <Break size='5em'/>
            <GuessTrialsWrap trials={this.state.trials}/>
            <Break size='2em'/>
            <GameScreen song={this.props.song} usedLetters={this.state.usedLetters}></GameScreen>
            <Break size='2em'/>
            <LettersScreen leftLetters={this.state.leftLetters} onLetterClick={this.letterClick.bind(this)}/>
            </div>

        )
    }
}

export default Game
