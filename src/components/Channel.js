import React from 'react';
import Input from './Input';
import LowpassFilter from './LowpassFilter';
import HighpassFilter from './HighpassFilter';
import HighPeaking from './HighPeaking';
import MidPeaking from './MidPeaking';
import LowPeaking from './LowPeaking';
import Compressor from './Compressor';
import FaderOutput from './FaderOutput';
import VuMeter from './VuMeter'

class Channel extends React.Component {
    render() {
        return (
            <div className="container channelStyle">
                <div className="row">
                    <Input changeHandler={this.props.changeHandler} 
                           channels={this.props.channels} 
                           channelArray={this.props.channelArray} 
                           index={this.props.index}/>
                    <LowpassFilter changeHandler={this.props.changeHandler} 
                                   channels={this.props.channels} 
                                   channelArray={this.props.channelArray} 
                                   index={this.props.index}/>
                    <HighpassFilter changeHandler={this.props.changeHandler} 
                                    channels={this.props.channels} 
                                    channelArray={this.props.channelArray} 
                                    index={this.props.index}/>
                    <HighPeaking changeHandler={this.props.changeHandler} 
                                 channels={this.props.channels} 
                                 channelArray={this.props.channelArray} 
                                 index={this.props.index}/>
                    <MidPeaking changeHandler={this.props.changeHandler} 
                                channels={this.props.channels} 
                                channelArray={this.props.channelArray} 
                                index={this.props.index}/>
                    <LowPeaking changeHandler={this.props.changeHandler} 
                                channels={this.props.channels} 
                                channelArray={this.props.channelArray} 
                                index={this.props.index}/>
                    <Compressor changeHandler={this.props.changeHandler} 
                                channels={this.props.channels} 
                                channelArray={this.props.channelArray} 
                                index={this.props.index}/>
                    <FaderOutput changeHandler={this.props.changeHandler} 
                                 channels={this.props.channels} 
                                 channelArray={this.props.channelArray}
                                 solo={this.props.solo}
                                 mute={this.props.mute} 
                                 index={this.props.index}/>
                    <VuMeter channelArray={this.props.channelArray} 
                             audioNodes={this.props.audioNodes} 
                             index={this.props.index}/>
                </div>
            </div>
        );
    }
}

export default Channel;