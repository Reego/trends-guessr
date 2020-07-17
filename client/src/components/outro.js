import React from 'react'

class Outro extends React.Component {

    render() {

        let splitdate = this.props.date.split('-')
        let date = splitdate[2] + '/' + splitdate[1] + '/' + splitdate[0]
        return (
            <React.Fragment>
            <div className='outro'>
                <h1>You correctly guessed {this.props.correct} out of {this.props.total} songs for the {date} chart!</h1>
                </div>
            </React.Fragment>
        )
    }
}

export default Outro
