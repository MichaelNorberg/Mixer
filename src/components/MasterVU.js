import React from 'react';
   

let drawVisualLeft;
let drawVisualRight;

class MasterVU extends React.Component {
    componentDidMount() {
        let getAverageVolumeLeft = (array) =>  {
            let values = 0;
            let average;
            let length = array.length;
            // get all the frequency amplitudes
            for (var i = 0; i < length; i++) {
                values += array[i];
            }
            average = values / length;
            return average;
        };
        let getAverageVolumeRight = (array) =>  {
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
        let drawVULeft = () => {
            this.props.master[0].VULeftAnlyser.smoothingTimeConstant = 0.3;
            this.props.master[0].VULeftAnlyser.fftSize = 256;
            drawVisualLeft = requestAnimationFrame(drawVULeft);
            let array = new Uint8Array(this.props.master[0].VULeftAnlyser.frequencyBinCount);
            this.props.master[0].VULeftAnlyser.getByteFrequencyData(array);
            let average = getAverageVolumeLeft(array);
            let canvas = document.getElementById('VULeft');
            let ctx = canvas.getContext('2d');
            var gradient = ctx.createLinearGradient(0, 0, 200, 0);
            gradient.addColorStop(0, '#ff0178');
            gradient.addColorStop(1, '#00003f');
            canvas.style.width="100%";
            canvas.style.height="100%";
            // clear the current state
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            //set the fill style
            ctx.fillStyle = gradient;
            //create the meters
            ctx.fillRect(0,130-average, canvas.width, canvas.height);
        }
        let drawVURight = () => {
            this.props.master[0].VURightAnlyser.smoothingTimeConstant = 0.3;
            this.props.master[0].VURightAnlyser.fftSize = 256;
            drawVisualRight = requestAnimationFrame(drawVURight);
            let array = new Uint8Array(this.props.master[0].VURightAnlyser.frequencyBinCount);
            this.props.master[0].VURightAnlyser.getByteFrequencyData(array);
            let average = getAverageVolumeRight(array);
            let canvas = document.getElementById('VURight');
            let ctx = canvas.getContext('2d');
            var gradient = ctx.createLinearGradient(0, 0, 200, 0);
            gradient.addColorStop(0, '#ff0178');
            gradient.addColorStop(1, '#00003f');
            canvas.style.width="100%";
            canvas.style.height="100%";
            // clear the current state
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            //set the fill style
            ctx.fillStyle = gradient;
            //create the meters
            ctx.fillRect(0,130-average, canvas.width, canvas.height);
        };
        drawVULeft();
        drawVURight();
    };
    componentWillUnmount() {
        cancelAnimationFrame(drawVisualLeft);
        cancelAnimationFrame(drawVisualRight);
    };
    render() {
        return (
            <div className="col s12 m8 l8 xl8">
                <div className="card-panel z-depth-5 cardStyle">
                    <h2 className="flow-text vuHeader">VU Meter</h2>
                    <div id="VUCard">
                        <div className="canvas-wrapper"> <canvas id={'VULeft'}></canvas></div>  
                        <div className="canvas-wrapper"> <canvas id={'VURight'}></canvas></div> 
                    </div> 
                </div> 
            </div>   
        );
    }
}

export default MasterVU;