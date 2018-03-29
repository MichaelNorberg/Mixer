import React from 'react';
   

let drawVisual;

class VuMeter extends React.Component {
    componentDidMount() {
        let getAverageVolume = (array) =>  {
            let values = 0;
            let average;
            let length = array.length;
            // get all the frequency amplitudes
            for (var i = 0; i < length; i++) {
                values += array[i];
            };
            average = values / length;
            return average;
        };
        
        let drawVU = () => {
            this.props.audioNodes[this.props.index][`ch${this.props.channelArray[this.props.index].channelName}Analyser`].smoothingTimeConstant = 0.3;
            this.props.audioNodes[this.props.index][`ch${this.props.channelArray[this.props.index].channelName}Analyser`].fftSize = 256;
            drawVisual = requestAnimationFrame(drawVU);
            let array = new Uint8Array(this.props.audioNodes[this.props.index][`ch${this.props.channelArray[this.props.index].channelName}Analyser`].frequencyBinCount);
            this.props.audioNodes[this.props.index][`ch${this.props.channelArray[this.props.index].channelName}Analyser`].getByteFrequencyData(array);
            let average = getAverageVolume(array);
            let canvas = document.getElementById(`ch${this.props.channelArray[this.props.index].channelName}Canvas`);
            let ctx = canvas.getContext('2d');
            var gradient = ctx.createLinearGradient(0, 0, 200, 0);
            gradient.addColorStop(0, '#ff0178');
            gradient.addColorStop(0.8, '#00003f');
            // clear the current state
            ctx.clearRect(0, 0, 100, 130);
            //set the fill style
            ctx.fillStyle = gradient;
            //create the meters
            ctx.fillRect(0,130-average, 100, 130);
        };
        drawVU();
    };
    componentWillUnmount() {
        cancelAnimationFrame(drawVisual);
    };
    render() {
        return (
            <div className="col s12 m4 l4 xl4">
                <div className="card-panel z-depth-5 cardStyle">
                    <h2 className="flow-text">VU Meter</h2>
                    <canvas className={'channelVU'}width={100} height={130} id={`ch${this.props.channelArray[this.props.index].channelName}Canvas`}>
                    </canvas>
                </div> 
            </div>   
        );
    }
}

export default VuMeter;