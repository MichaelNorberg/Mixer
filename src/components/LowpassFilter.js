import React from 'react';

class LowpassFilter extends React.Component {
    render() {
        let channelNum = this.props.channelArray[this.props.index].channelName;
        return (
            <div className="col s12 m4 l4 xl4">
                <div className="card-panel z-depth-5 cardStyle">
                    <h2 className="flow-text" >Filter</h2>
                    <h3 className="flow-text">Low Pass</h3>
                    <div className="range-field">
                        <label className="labelNameStyle" for="frequency">Frequency</label>
                        <label className="minStyle" for="frequency">0hz</label>
                        <label className="maxStyle" for="frequency">20khz</label>
                        <input onChange={() => {this.props.changeHandler(`ch${channelNum}LowPassFilter`,
                                                                        'lowpassFreq', 
                                                                        'frequency', 
                                                                        Number(this.refs.lowpassFreq.value), 
                                                                        this.props.index)}} 
                                                                        id="frequency"
                                                                        type="range" 
                                                                        ref="lowpassFreq"
                                                                        value={this.props.channels[this.props.index].lowpassFreq} 
                                                                        min={0} 
                                                                        step={1} 
                                                                        max={20000} />
                    </div>
                    <div className="range-field">
                        <label className="labelNameStyle" for='Q'>Q</label>
                        <label className="minStyle" for="Q">0</label>
                        <label className="maxStyle" for="Q">15</label>
                        <input onChange={() => {this.props.changeHandler(`ch${channelNum}LowPassFilter`, 
                                                                        'lowpassQ', 
                                                                        'Q', 
                                                                        Number(this.refs.lowpassQ.value), 
                                                                        this.props.index)}} 
                                                                        id="Q"
                                                                        type="range" 
                                                                        ref="lowpassQ"
                                                                        value={this.props.channels[this.props.index].lowpassQ} 
                                                                        min={0.001} 
                                                                        max={15}
                                                                        step={0.001} />
                    </div>
                </div> 
            </div>
        );
    }
}

export default LowpassFilter;