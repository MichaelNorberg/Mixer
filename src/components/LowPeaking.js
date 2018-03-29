import React from 'react';

class LowPeaking extends React.Component {
    render() {
        let channelNum = this.props.channelArray[this.props.index].channelName;
        return (
            <div className="col s12 m4 l4 xl4">
                <div className="card-panel z-depth-5 cardStyle">
                    <h2 className="flow-text">Parametric Equalizer</h2>
                    <h3 className="flow-text">Low</h3>
                    <div className="range-field">
                        <label className="labelNameStyle" for="frequency3">Frequency</label>
                        <label className="minStyle" for="frequency3">60hz</label>
                        <label className="maxStyle" for="frequency3">250khz</label>
                        <input onChange={() => {this.props.changeHandler(`ch${channelNum}LowPeaking`, 
                                                                        'lowPeakingFreq', 
                                                                        'frequency', 
                                                                        Number(this.refs.lowPeakingFreq.value), 
                                                                        this.props.index)}}
                                                                        id="frequency3" 
                                                                        type="range" 
                                                                        ref="lowPeakingFreq" 
                                                                        value={this.props.channels[this.props.index].lowPeakingFreq}
                                                                        min={60} 
                                                                        step={1} 
                                                                        max={250} />
                    </div>
                    <div className="range-field">
                        <label className="labelNameStyle" for="Q3">Q</label>
                        <label className="minStyle" for="Q3">0</label>
                        <label className="maxStyle" for="Q3">15</label>
                        <input onChange={() => {this.props.changeHandler(`ch${channelNum}LowPeaking`, 
                                                                        'lowPeakingQ', 
                                                                        'Q', 
                                                                        Number(this.refs.lowPeakingQ.value), 
                                                                        this.props.index)}} 
                                                                        id="Q3"
                                                                        type="range" 
                                                                        ref="lowPeakingQ" 
                                                                        value={this.props.channels[this.props.index].lowPeakingQ}
                                                                        min={0.001} 
                                                                        max={6}
                                                                        step={0.001} />
                    </div>
                    <div className="range-field">
                        <label className="labelNameStyle" for="boost3">Boost</label>
                        <label className="minStyle" for="boost3">-12</label>
                        <label className="maxStyle" for="boost3">+12</label>
                        <input onChange={()=> {this.props.changeHandler(`ch${channelNum}LowPeaking`, 
                                                                        'lowPeakingGain', 
                                                                        'gain', 
                                                                        Number(this.refs.lowPeakingGain.value), 
                                                                        this.props.index)}}
                                                                        id="boost3" 
                                                                        type="range" 
                                                                        ref="lowPeakingGain"
                                                                        value={this.props.channels[this.props.index].lowPeakingGain} 
                                                                        min={-12} max={12}
                                                                        step={1} />
                    </div>   
                </div>
            </div>
        );
    }
}

export default LowPeaking;