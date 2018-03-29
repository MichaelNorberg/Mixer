import React from 'react';

class Compressor extends React.Component {
    render() {
        let channelNum = this.props.channelArray[this.props.index].channelName;
        return (
            <div className="col s12 m4 l4 xl4">
                <div className="card-panel z-depth-5 cardStyle">
                    <h2 className="flow-text">Compressor</h2>
                    <div className="range-field">
                        <label className="labelNameStyle" for="threshold">Threshold</label>
                        <label className="minStyle" for="threshold">-100</label>
                        <label className="maxStyle" for="threshold">0</label>
                        <input onChange={()=> {this.props.changeHandler(`ch${channelNum}Compressor`, 
                                                                        'threshold', 
                                                                        'threshold', 
                                                                        Number(this.refs.threshold.value), 
                                                                        this.props.index)}}
                                                                        id="threshold" 
                                                                        type="range" 
                                                                        ref="threshold" 
                                                                        value={this.props.channels[this.props.index].threshold}
                                                                        step={0.1}
                                                                        min={-100} max={0} />
                    </div>
                    <div className="range-field">
                        <label className="labelNameStyle" for="Knee">Knee</label>
                        <label className="minStyle" for="Knee">0</label>
                        <label className="maxStyle" for="Knee">40</label>
                        <input onChange={()=> {this.props.changeHandler(`ch${channelNum}Compressor`, 
                                                                        'knee', 
                                                                        'knee', 
                                                                        Number(this.refs.knee.value), 
                                                                        this.props.index)}}
                                                                        id="knee" 
                                                                        type="range" 
                                                                        ref="knee"
                                                                        value={this.props.channels[this.props.index].knee}
                                                                        step={0.1} 
                                                                        min={0} max={40} />
                    </div>
                    <div className="range-field">
                        <label className="labelNameStyle" for="ratio">Ratio</label>
                        <label className="minStyle" for="ratio">1</label>
                        <label className="maxStyle" for="ratio">20</label>
                        <input onChange={()=> {this.props.changeHandler(`ch${channelNum}Compressor`, 
                                                                        'ratio', 
                                                                        'ratio', 
                                                                        Number(this.refs.ratio.value), 
                                                                        this.props.index)}}
                                                                        id="ratio" 
                                                                        type="range" 
                                                                        ref="ratio"
                                                                        value={this.props.channels[this.props.index].ratio} 
                                                                        step={1}
                                                                        min={1} max={20} />
                    </div>
                    <div className="range-field">
                        <label className="labelNameStyle" for="attack">Attack</label>
                        <label className="minStyle" for="attack">0</label>
                        <label className="maxStyle" for="attack">1</label>
                        <input onChange={()=> {this.props.changeHandler(`ch${channelNum}Compressor`, 
                                                                        'attack', 
                                                                        'attack', 
                                                                        Number(this.refs.attack.value), 
                                                                        this.props.index)}} 
                                                                        id="attack"
                                                                        type="range" 
                                                                        ref="attack"
                                                                        value={this.props.channels[this.props.index].attack} 
                                                                        step={0.01}
                                                                        min={0.01} max={1} />
                    </div>
                    <div className="range-field">
                        <label className="labelNameStyle" for="release">Release</label>
                        <label className="minStyle" for="release">0</label>
                        <label className="maxStyle" for="release">1</label>
                        <input onChange={()=> {this.props.changeHandler(`ch${channelNum}Compressor`, 
                                                                        'release', 
                                                                        'release', 
                                                                        Number(this.refs.release.value), 
                                                                        this.props.index)}}
                                                                        id="release" 
                                                                        type="range" 
                                                                        ref="release"
                                                                        value={this.props.channels[this.props.index].release} 
                                                                        step={0.01}
                                                                        min={0.01} max={1} />
                    </div>
                    <div className="range-field">
                        <label className="labelNameStyle" for="outputGain">Output Gain</label>
                        <label className="minStyle" for="outputGain">0</label>
                        <label className="maxStyle" for="outputGain">2</label>
                        <input onChange={()=> {this.props.changeHandler(`ch${channelNum}CompressorGain`, 
                                                                        'compressorGain', 
                                                                        'gain', 
                                                                        Number(this.refs.compressorGain.value), 
                                                                        this.props.index)}} 
                                                                        id="outputGain"
                                                                        type="range" 
                                                                        ref="compressorGain"
                                                                        value={this.props.channels[this.props.index].compressorGain} 
                                                                        step={0.01}
                                                                        min={0} max={2} />
                    </div>
                </div>  
            </div>
        );
    }
}

export default Compressor;