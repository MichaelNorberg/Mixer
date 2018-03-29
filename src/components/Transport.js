import React from 'react';

class Transport extends React.Component {
    render() {
        return (
            <div>
                <a className="btn-floating btn-large waves-effect waves-light transport buttonHover" onClick={this.props.pause}
                                                                                                     disabled={this.props.disabled}>
                    <i className="material-icons">pause</i>
                </a>
                <a className="btn-floating btn-large waves-effect waves-light transport buttonHover" onClick={this.props.play}
                                                                                                     disabled={this.props.disabled}>
                    <i className="material-icons">play_arrow</i>
                </a>
                <a className="btn-floating btn-large waves-effect waves-light transport buttonHover" onClick={this.props.stop}
                                                                                                     disabled={this.props.disabled}>
                    <i className="material-icons">stop</i>
                </a>
            </div>
        );
    }
}

export default Transport;