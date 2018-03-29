import React from 'react';

class Input extends React.Component {
    render() {
        let channelNum = this.props.channelArray[this.props.index].channelName;
        return (
            <div className="col s12 m4 l4 xl4">
                <div className="card-panel cardStyle z-depth-5">
                    <h2 className="flow-text">Input</h2>
                    <div className="range-field">
                        <label className="labelNameStyle" for="inputGain">Input Gain</label>
                        <label className="minStyle" for="inputGain">0</label>
                        <label className="maxStyle" for="inputGain">1</label>
                        <input onChange={()=> {this.props.changeHandler(`ch${channelNum}InputGain`, 
                                                                        'inputGain', 
                                                                        'gain', 
                                                                        Number(this.refs.inputGain.value), 
                                                                        this.props.index)}} 
                                                                        id="inputGain"
                                                                        type="range" 
                                                                        ref="inputGain" 
                                                                        value={this.props.channels[this.props.index].inputGain}
                                                                        min={0} max={1}
                                                                        step={0.01} />
                    </div>
                    <h2 className="flow-text">{this.props.channelArray[this.props.index].instrumentString}</h2>
                </div>
            </div>
        );
    }
}

export default Input;