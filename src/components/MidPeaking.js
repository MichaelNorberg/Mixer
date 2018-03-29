import React from 'react';

class MidPeaking extends React.Component {
    render() {
        let channelNum = this.props.channelArray[this.props.index].channelName;
        return (
            <div className="col s12 m4 l4 xl4">
                <div className="card-panel z-depth-5 cardStyle">
                    <h2 className="flow-text">Parametric Equalizer</h2>
                    <h3 className="flow-text">Mid</h3>
                    <div className="range-field">
                        <label className="labelNameStyle" for="frequency2">Frequency</label>
                        <label className="minStyle" for="frequency2">350hz</label>
                        <label className="maxStyle" for="frequency2">7200khz</label>
                        <input onChange={() => {this.props.changeHandler(`ch${channelNum}MidPeaking`, 
                                                                        'midPeakingFreq', 
                                                                        'frequency', 
                                                                        Number(this.refs.midPeakingFreq.value), 
                                                                        this.props.index)}} 
                                                                        id="frequency2"
                                                                        type="range" 
                                                                        ref="midPeakingFreq"
                                                                        value={this.props.channels[this.props.index].midPeakingFreq} 
                                                                        min={350} 
                                                                        step={1} 
                                                                        max={7200} />
                    </div>
                    <div className="range-field">
                        <label className="labelNameStyle" for="Q2">Q</label>
                        <label className="minStyle" for="Q2">0</label>
                        <label className="maxStyle" for="Q2">15</label>
                        <input onChange={() => {this.props.changeHandler(`ch${channelNum}MidPeaking`, 
                                                                        'midPeakingQ', 
                                                                        'Q', 
                                                                        Number(this.refs.midPeakingQ.value), 
                                                                        this.props.index)}}
                                                                        id="Q2" 
                                                                        type="range" 
                                                                        ref="midPeakingQ"
                                                                        value={this.props.channels[this.props.index].midPeakingQ} 
                                                                        min={0.001} 
                                                                        max={6}
                                                                        step={0.001} />
                    </div>
                    <div className="range-field">
                        <label className="labelNameStyle" for="boost2">Boost</label>
                        <label className="minStyle" for="boost2">-12</label>
                        <label className="maxStyle" for="boost2">+12</label>
                        <input onChange={()=> {this.props.changeHandler(`ch${channelNum}MidPeaking`, 
                                                                        'midPeakingGain', 
                                                                        'gain', 
                                                                        Number(this.refs.midPeakingGain.value), 
                                                                        this.props.index)}} 
                                                                        id="boost2"
                                                                        type="range"
                                                                        value={this.props.channels[this.props.index].midPeakingGain} 
                                                                        ref="midPeakingGain" 
                                                                        min={-12} max={12}
                                                                        step={1} />
                    </div>  
                </div>
            </div>
        );
    }
}

export default MidPeaking;