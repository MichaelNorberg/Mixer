import React from 'react';

class FaderOutput extends React.Component {
    render() {
        let channelNum = this.props.channelArray[this.props.index].channelName;
        return (
            <div className="col s12 m4 l4 xl4">
                <div className="card-panel cardStyle z-depth-5">
                    <h2 className="flow-text">Output</h2>
                    <div className="range-field">
                        <label className="labelNameStyle" for="pan">Pan</label>
                        <label className="minStyle" for="pan">Left</label>
                        <label className="maxStyle" for="pan">Right</label>
                        <input onChange={()=> {this.props.changeHandler(`ch${channelNum}Pan`, 
                                                                        'pan', 
                                                                        'pan', 
                                                                        Number(this.refs.pan.value), 
                                                                        this.props.index)}} 
                                                                        id="pan"
                                                                        type="range" 
                                                                        ref="pan"
                                                                        value={this.props.channels[this.props.index].pan} 
                                                                        step={0.01} 
                                                                        min={-1} max={1} />
                    </div>
                    <div className="range-field">
                        <label className="labelNameStyle" for="channelFader">Channel Fader</label>
                        <label className="minStyle" for="channelFader">0</label>
                        <label className="maxStyle" for="channelFader">1</label>
                        <input onChange={()=> {this.props.changeHandler(`ch${channelNum}OutputGain`, 
                                                                        'outputGain', 
                                                                        'gain', 
                                                                        Number(this.refs.outputGain.value), 
                                                                        this.props.index)}} 
                                                                        id="channelFader"
                                                                        type="range" 
                                                                        ref="outputGain"
                                                                        value={this.props.channels[this.props.index].outputGain}  
                                                                        step={0.01}
                                                                        min={0} max={1} />
                    </div>
                    <a className="btn-floating btn-large waves-effect waves-light buttonStyle buttonHover" 
                    onClick={() => {this.props.solo(this.props.index)}}>S</a> 
                    <a className="btn-floating btn-large waves-effect waves-light buttonStyle buttonHover" 
                    onClick={() => {this.props.mute(this.props.index)}}>M</a> 
                </div> 
            </div>
        );
    }
}

export default FaderOutput;