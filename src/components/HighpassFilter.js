import React from 'react';

class HighpassFilter extends React.Component {
   
    render() {
        let channelNum = this.props.channelArray[this.props.index].channelName;
        return (
            <div className="col s12 m4 l4 xl4">
                <div className="card-panel z-depth-5 cardStyle">
                    <h2 className="flow-text">Filter</h2>
                    <h3 className="flow-text">High Pass</h3>
                    <div className="range-field">
                        <label className="labelNameStyle" for="frequency">Frequency</label>
                        <label className="minStyle" for="frequency">0hz</label>
                        <label className="maxStyle" for="frequency">20khz</label>
                        <input onChange={() => {this.props.changeHandler(`ch${channelNum}HighPassFilter`, 
                                                                        'highpassFreq', 
                                                                        'frequency', 
                                                                        Number(this.refs.highpassFreq.value), 
                                                                        this.props.index)}}
                                                                        id="frequency" 
                                                                        type="range" 
                                                                        ref="highpassFreq"
                                                                        value={this.props.channels[this.props.index].highpassFreq}
                                                                        min={0} 
                                                                        max={2000}
                                                                        step={1} />
                    </div>
                    <div className="range-field">
                        <label className="labelNameStyle" for="Q">Q</label>
                        <label className="minStyle" for="Q">0</label>
                        <label className="maxStyle" for="Q">15</label>
                        <input onChange={() => {this.props.changeHandler(`ch${channelNum}HighPassFilter`, 
                                                                        'highpassQ', 
                                                                        'Q', 
                                                                        Number(this.refs.highpassQ.value), 
                                                                        this.props.index)}}
                                                                        id="Q" 
                                                                        type="range" 
                                                                        ref="highpassQ" 
                                                                        value={this.props.channels[this.props.index].highpassQ}
                                                                        min={0.001} 
                                                                        max={15}
                                                                        step={0.001} />
                    </div>
                </div> 
            </div>
        );
    }
}

export default HighpassFilter;