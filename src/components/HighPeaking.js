import React from 'react';

class HighPeaking extends React.Component {
    render() {
        let channelNum = this.props.channelArray[this.props.index].channelName;
        return (
            <div className="col s12 m4 l4 xl4">
                <div className="card-panel z-depth-5 cardStyle">
                    <h2 className="flow-text">Parametric Equalizer</h2>
                    <h3 className="flow-text">High</h3>
                    <div className="range-field">
                        <label className="labelNameStyle" for="frequency1">Frequency</label>
                        <label className="minStyle" for="frequency1">10000hz</label>
                        <label className="maxStyle" for="frequency1">20khz</label>
                        <input onChange={() => {this.props.changeHandler(`ch${channelNum}HighPeaking`, 
                                                                        'highPeakingFreq', 
                                                                        'frequency', 
                                                                        Number(this.refs.highPeakingFreq.value), 
                                                                        this.props.index)}}
                                                                        id="frequency1" 
                                                                        type="range" 
                                                                        ref="highPeakingFreq"
                                                                        value={this.props.channels[this.props.index].highPeakingFreq} 
                                                                        min={10000} 
                                                                        step={1} 
                                                                        max={20000} />
                    </div>
                    <div className="range-field">
                        <label className="labelNameStyle" for="Q1">Q</label>
                        <label className="minStyle" for="Q1">0</label>
                        <label className="maxStyle" for="Q1">15</label>
                        <input onChange={() => {this.props.changeHandler(`ch${channelNum}HighPeaking`, 
                                                                        'highPeakingQ', 
                                                                        'Q', 
                                                                        Number(this.refs.highPeakingQ.value), 
                                                                        this.props.index)}}
                                                                        id="Q1" 
                                                                        type="range" 
                                                                        ref="highPeakingQ"
                                                                        value={this.props.channels[this.props.index].highPeakingQ} 
                                                                        min={0.001} 
                                                                        max={6}
                                                                        step={0.001} />
                    </div>
                    <div className="range-field">
                        <label className="labelNameStyle" for="boost1">Boost</label>
                        <label className="minStyle" for="boost1">-12</label>
                        <label className="maxStyle" for="boost1">+12</label>
                        <input onChange={()=> {this.props.changeHandler(`ch${channelNum}HighPeaking`, 
                                                                        'highPeakingGain', 
                                                                        'gain', 
                                                                        Number(this.refs.highPeakingGain.value), 
                                                                        this.props.index)}}
                                                                        id="boost1" 
                                                                        type="range" 
                                                                        ref="highPeakingGain"
                                                                        value={this.props.channels[this.props.index].highPeakingGain} 
                                                                        min={-12} max={12}
                                                                        step={1} />
                    </div>  
                </div>
            </div>
        );
    }
}

export default HighPeaking;