import React from 'react';
import MasterVU from './MasterVU'

class MasterSection extends React.Component {
    render() {
        return (
            <div className="container masterStyle">
                <div className="row">
                    <div className="col s12 m4 l4 xl4">
                        <div className="card-panel z-depth-5 cardStyle">
                            <h2 className="flow-text">Master Output</h2>
                            <div className="range-field">
                                <label className="labelNameStyle" for="outputGain">Gain</label>
                                <label className="minStyle" for="outputGain">0</label>
                                <label className="maxStyle" for="outputGain">1</label>
                                <input onChange={() => {this.props.masterSectionHandler('masterOutputGain', 
                                                                                        'outputGain', 
                                                                                        'gain', 
                                                                                        Number(this.refs.outputGain.value), 
                                                                                        0)}} 
                                                                                        id="outputGain"
                                                                                        type="range" 
                                                                                        ref="outputGain" 
                                                                                        value={this.props.masterSection[0].outputGain} 
                                                                                        min={0} 
                                                                                        step={0.001} 
                                                                                        max={1} />
                            </div>
                        </div> 
                    </div>
                    <MasterVU master={this.props.master}/>
                </div>
            </div>
            
        );
    }
}

export default MasterSection;