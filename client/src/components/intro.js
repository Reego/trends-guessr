import React from 'react'

class Settings extends React.Component {

    constructor(props) {
        super(props)
        this.onSubmit = props.onSubmit
        this.state = {
            'startYear':'1960',
            'endYear':'2019',
            'numSongs':'10',
            'valid':true,
            'showArtistNames':false
        }
    }

    render() {
        return (
        <React.Fragment>
        <div className='intro'>
            <div>
            <h1>Charts Guessr</h1>
            <p>See how many songs you can guess!<br/><br/> The chosen chart will belong to a random date between the chosen values of "Start Year" and "End Year"</p>
            </div>
            <br/>
            <br/>
            <div className='settings-wrap'>
                <p>Start Year: {this.state.startYear}</p>
                <input onChange={this.handleChange.bind(this)} name='startYear' type='range' min='1960' max='2018' value={this.state.startYear} step="1"/>
                <br/>
                <p>End Year: {this.state.endYear}</p>
                <input onChange={this.handleChange.bind(this)} name='endYear' type='range' min='1961' max='2019' value={this.state.endYear} step="1"/>
                <br/>
                <p>Number Of Songs: {this.state.numSongs}</p>
                <input onChange={this.handleChange.bind(this)} name='numSongs' type='range' min='1' max='100' value={this.state.numSongs} step="1"/>
                <br/>
                <br/>
                <span>Show Artist Name: </span>
                <input onChange={this.handleChange.bind(this)} name='showArtistNames' type='checkbox' value={this.state.showArtistNames}/>
                <br/>
                <br/>
                <br/>
                <div className='intro-submit' onClick={(e)=>this.onSubmit(e, this.state)}>Submit</div>
            </div>
            </div>
        </React.Fragment>
        )
    }

    handleChange(e) {
        let stateName = e.target.name
        let val = e.target.value

        if(stateName === 'startYear') {
            if(parseInt(val) > parseInt(this.state.endYear)) {
                val = this.state.endYear
            }
        }
        else if(stateName === 'endYear') {
            if(parseInt(val) < parseInt(this.state.startYear)) {
                val = this.state.startYear
            }
        }

        this.setState(
            {
                [stateName]:val,
            }
        )
    }
}

class Intro extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Settings onSubmit={this.props.onSubmit}/>
            </React.Fragment>
        )
    }
}

export default Intro
