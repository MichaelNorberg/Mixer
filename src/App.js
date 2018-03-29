import React, { Component } from 'react';
import {Link, NavLink, Route, Switch} from 'react-router-dom';
import Transport from './components/Transport'
import Channel from './components/Channel';
import MasterSection from './components/MasterSection';
import './App.css';

//create audio context graph
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

//buffer Source constructor borrowed and modified 
function BufferLoader(context, urlList, callback) {
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = new Array();
  this.loadCount = 0;
};
//decoding and buffering the audio
BufferLoader.prototype.loadBuffer = function(url, index) {
  // Load buffer asynchronously
  let request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";
  let loader = this;
  request.onload = function() {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      request.response,
      function(buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        };
        loader.bufferList[index] = buffer;
        if (++loader.loadCount === loader.urlList.length)
          loader.onload(loader.bufferList, true);
      },
      function(error) {
        console.error('decodeAudioData error', error);
      }
    );
  };
  request.onerror = function() {
    alert('BufferLoader: XHR error');
  };
  request.send();
};
BufferLoader.prototype.load = function() {
  for (let i = 0; i < this.urlList.length; ++i)
  this.loadBuffer(this.urlList[i], i);
};

//channel and instrument deffinitions
 
let drums;
let beat;  
let bass;  
let keys;
let lead;
let rythem;  
let siren; 
let synthTwo; 
let synthOne; 
let vox; 
let voxdup;

let channelArray = [
  {
    channelName: 'One',
    instrument: drums,
    instrumentString: 'Drums',
  },
  {
    channelName: 'Two',
    instrument: beat,
    instrumentString: 'Beat',
  },
  {
    channelName: 'Three',
    instrument: bass,
    instrumentString: 'Bass',
  },
  {
    channelName: 'Four',
    instrument: keys,
    instrumentString: 'Keys',
  },
  {
    channelName: 'Five',
    instrument: lead,
    instrumentString: 'Lead Guitar',
  },
  {
    channelName: 'Six',
    instrument: rythem,
    instrumentString: 'Rhythm Guitar',
  },
  {
    channelName: 'Seven',
    instrument: siren,
    instrumentString: 'Siren',
  },
  {
    channelName: 'Eight',
    instrument: synthTwo,
    instrumentString: 'Synth Two',
  },
  {
    channelName: 'Nine',
    instrument: synthOne,
    instrumentString: 'Synth One',
  },
  {
    channelName: 'Ten',
    instrument: vox,
    instrumentString: 'Vox',
  },
  {
    channelName: 'Eleven',
    instrument: voxdup,
    instrumentString: 'Vox Double',
  },
]; 
//create all the audio node instances within the audio context
const audioNodes = [];
let createAudioNodes = (channelArray) => {
  for(let i = 0; i < channelArray.length; i++) {
    audioNodes.push({
      //input component
      [`ch${channelArray[i].channelName}InputGain`]: audioCtx.createGain(),
      //EQ component
      //low pass
      [`ch${channelArray[i].channelName}LowPassFilter`]: new BiquadFilterNode(audioCtx, {type: "lowpass"}),
      //high pass
      [`ch${channelArray[i].channelName}HighPassFilter`]: new BiquadFilterNode(audioCtx, {type: "highpass"}),
      //high peaking
      [`ch${channelArray[i].channelName}HighPeaking`]: new BiquadFilterNode(audioCtx, {type: "peaking"}),
      //mid peaking
      [`ch${channelArray[i].channelName}MidPeaking`]: new BiquadFilterNode(audioCtx, {type: "peaking"}),
      //low peaking
      [`ch${channelArray[i].channelName}LowPeaking`]: new BiquadFilterNode(audioCtx, {type: "peaking"}),
      //compressor component
      [`ch${channelArray[i].channelName}Compressor`]: audioCtx.createDynamicsCompressor(),
      [`ch${channelArray[i].channelName}CompressorGain`]: audioCtx.createGain(),
      //fader output
      //panner
      [`ch${channelArray[i].channelName}Pan`]: audioCtx.createStereoPanner(),
      //channel output gain
      [`ch${channelArray[i].channelName}OutputGain`]: audioCtx.createGain(),
      //vu meter
      [`ch${channelArray[i].channelName}Analyser`]: audioCtx.createAnalyser(),
    });
  };
};
createAudioNodes(channelArray);
//store the buffered audio in an array for later use
let bufferCopies = [];
//defines buffer sources and connects the audio graph, also rebuilds destroyed nodes
let finishedLoading = (bufferList, fullyConnect) => {
  if(bufferCopies.length === 0){
    bufferCopies = Array.from(bufferList);
  };
  //create the source nodes
  for(let i = 0; i < channelArray.length; i++) {
    channelArray[i].instrument = audioCtx.createBufferSource();
  };
  
  //give the source nodes a buffer
  for(let i = 0; i < channelArray.length; i++) {
    channelArray[i].instrument.buffer = bufferList[i];
  };

  //connecting reborn buffernodes after distruction 
  for(let i= 0; i < channelArray.length; i++) {
    channelArray[i].instrument.connect(audioNodes[i][`ch${channelArray[i].channelName}InputGain`]);
  };
  //only called on start up
  if(fullyConnect) {
    for(let i = 0; i < channelArray.length; i++) {
      //channel connections
        channelArray[i].instrument.connect(audioNodes[i][`ch${channelArray[i].channelName}InputGain`]);
        audioNodes[i][`ch${channelArray[i].channelName}InputGain`].connect(audioNodes[i][`ch${channelArray[i].channelName}LowPassFilter`]);
        audioNodes[i][`ch${channelArray[i].channelName}LowPassFilter`].connect(audioNodes[i][`ch${channelArray[i].channelName}HighPassFilter`]);
        audioNodes[i][`ch${channelArray[i].channelName}HighPassFilter`].connect(audioNodes[i][`ch${channelArray[i].channelName}HighPeaking`]);
        audioNodes[i][`ch${channelArray[i].channelName}HighPeaking`].connect(audioNodes[i][`ch${channelArray[i].channelName}MidPeaking`]);
        audioNodes[i][`ch${channelArray[i].channelName}MidPeaking`].connect(audioNodes[i][`ch${channelArray[i].channelName}LowPeaking`]);
        audioNodes[i][`ch${channelArray[i].channelName}LowPeaking`].connect(audioNodes[i][`ch${channelArray[i].channelName}Compressor`]);
        audioNodes[i][`ch${channelArray[i].channelName}Compressor`].connect(audioNodes[i][`ch${channelArray[i].channelName}CompressorGain`]);
        audioNodes[i][`ch${channelArray[i].channelName}CompressorGain`].connect(audioNodes[i][`ch${channelArray[i].channelName}OutputGain`]);
        audioNodes[i][`ch${channelArray[i].channelName}OutputGain`].connect(audioNodes[i][`ch${channelArray[i].channelName}Pan`]);
        audioNodes[i][`ch${channelArray[i].channelName}OutputGain`].connect(audioNodes[i][`ch${channelArray[i].channelName}Analyser`]);
        audioNodes[i][`ch${channelArray[i].channelName}Pan`].connect(master[0].masterOutputGain);
    };
  };
};
//master section node definitions
let masterSplitterOptions = {
  numberOfOutputs : 2 
};
let master = [
  {
    masterOutputGain: audioCtx.createGain(),
    masterSplitter: new ChannelSplitterNode(audioCtx, masterSplitterOptions),
    VULeftAnlyser: audioCtx.createAnalyser(),
    VURightAnlyser: audioCtx.createAnalyser(),
    output: audioCtx.destination,
  },
];
//connect the master section
master[0].masterOutputGain.connect(master[0].masterSplitter);
master[0].masterSplitter.connect(master[0].VULeftAnlyser, 0);
master[0].masterSplitter.connect(master[0].VURightAnlyser, 1);
master[0].masterOutputGain.connect(master[0].output);

class App extends Component {
  constructor() {
    super()
    this.state = {
      masterSection: [
        {
          outputGain: 1,
        }
      ],
      playing: false,
      paused: false,
      disabled: true,
      stopped: 1,
      channels: [
        {
          inputGain: 0.8,
          phase: true,
          lowpassFreq: 20000,
          lowpassQ: 1,
          highpassFreq: 0,
          highpassQ: 1,
          highPeakingFreq: 10000,
          highPeakingQ: 1,
          highPeakingGain: 0,
          midPeakingFreq: 3000,
          midPeakingQ:1,
          midPeakingGain: 0,
          lowPeakingFreq: 60,
          lowPeakingQ: 1,
          lowPeakingGain: 0,
          knee: 30,
          threshold: 0,
          ratio: 1,
          reduction: 0,
          attack: 0.4,
          release:0.1,
          compressorGain: 1,
          pan: 0,
          outputGain: 1,
          solo: false,
          mute: false,
          outputConnected: true,
        },
        {
          inputGain: 0.8,
          phase: true,
          lowpassFreq: 20000,
          lowpassQ: 1,
          highpassFreq: 0,
          highpassQ: 1,
          highPeakingFreq: 10000,
          highPeakingQ: 1,
          highPeakingGain: 0,
          midPeakingFreq: 3000,
          midPeakingQ:1,
          midPeakingGain: 0,
          lowPeakingFreq: 60,
          lowPeakingQ: 1,
          lowPeakingGain: 0,
          knee: 30,
          threshold: 0,
          ratio: 1,
          reduction: 0,
          attack: 0.4,
          release:0.1,
          compressorGain: 1,
          pan: 0,
          outputGain: 1,
          solo: false,
          mute: false,
          outputConnected: true,
        },
        {
          inputGain: 0.8,
          phase: true,
          lowpassFreq: 20000,
          lowpassQ: 1,
          highpassFreq: 0,
          highpassQ: 1,
          highPeakingFreq: 10000,
          highPeakingQ: 1,
          highPeakingGain: 0,
          midPeakingFreq: 3000,
          midPeakingQ:1,
          midPeakingGain: 0,
          lowPeakingFreq: 60,
          lowPeakingQ: 1,
          lowPeakingGain: 0,
          knee: 30,
          threshold: 0,
          ratio: 1,
          reduction: 0,
          attack: 0.4,
          release:0.1,
          compressorGain: 1,
          pan: 0,
          outputGain: 1,
          solo: false,
          mute: false,
          outputConnected: true,
        },
        {
          inputGain: 0.8,
          phase: true,
          lowpassFreq: 20000,
          lowpassQ: 1,
          highpassFreq: 0,
          highpassQ: 1,
          highPeakingFreq: 10000,
          highPeakingQ: 1,
          highPeakingGain: 0,
          midPeakingFreq: 3000,
          midPeakingQ:1,
          midPeakingGain: 0,
          lowPeakingFreq: 60,
          lowPeakingQ: 1,
          lowPeakingGain: 0,
          knee: 30,
          threshold: 0,
          ratio: 1,
          reduction: 0,
          attack: 0.4,
          release:0.1,
          compressorGain: 1,
          pan: 0,
          outputGain: 1,
          solo: false,
          mute: false,
          outputConnected: true,
        },
        {
          inputGain: 0.8,
          phase: true,
          lowpassFreq: 20000,
          lowpassQ: 1,
          highpassFreq: 0,
          highpassQ: 1,
          highPeakingFreq: 10000,
          highPeakingQ: 1,
          highPeakingGain: 0,
          midPeakingFreq: 3000,
          midPeakingQ:1,
          midPeakingGain: 0,
          lowPeakingFreq: 60,
          lowPeakingQ: 1,
          lowPeakingGain: 0,
          knee: 30,
          threshold: 0,
          ratio: 1,
          reduction: 0,
          attack: 0.4,
          release:0.1,
          compressorGain: 1,
          pan: 0,
          outputGain: 1,
          solo: false,
          mute: false,
          outputConnected: true,
        },
        {
          inputGain: 0.8,
          phase: true,
          lowpassFreq: 20000,
          lowpassQ: 1,
          highpassFreq: 0,
          highpassQ: 1,
          highPeakingFreq: 10000,
          highPeakingQ: 1,
          highPeakingGain: 0,
          midPeakingFreq: 3000,
          midPeakingQ:1,
          midPeakingGain: 0,
          lowPeakingFreq: 60,
          lowPeakingQ: 1,
          lowPeakingGain: 0,
          knee: 30,
          threshold: 0,
          ratio: 1,
          reduction: 0,
          attack: 0.4,
          release:0.1,
          compressorGain: 1,
          pan: 0,
          outputGain: 1,
          solo: false,
          mute: false,
          outputConnected: true,
        },
        {
          inputGain: 0.8,
          phase: true,
          lowpassFreq: 20000,
          lowpassQ: 1,
          highpassFreq: 0,
          highpassQ: 1,
          highPeakingFreq: 10000,
          highPeakingQ: 1,
          highPeakingGain: 0,
          midPeakingFreq: 3000,
          midPeakingQ:1,
          midPeakingGain: 0,
          lowPeakingFreq: 60,
          lowPeakingQ: 1,
          lowPeakingGain: 0,
          knee: 30,
          threshold: 0,
          ratio: 1,
          reduction: 0,
          attack: 0.4,
          release:0.1,
          compressorGain: 1,
          pan: 0,
          outputGain: 1,
          solo: false,
          mute: false,
          outputConnected: true,
        },
        {
          inputGain: 0.8,
          phase: true,
          lowpassFreq: 20000,
          lowpassQ: 1,
          highpassFreq: 0,
          highpassQ: 1,
          highPeakingFreq: 10000,
          highPeakingQ: 1,
          highPeakingGain: 0,
          midPeakingFreq: 3000,
          midPeakingQ:1,
          midPeakingGain: 0,
          lowPeakingFreq: 60,
          lowPeakingQ: 1,
          lowPeakingGain: 0,
          knee: 30,
          threshold: 0,
          ratio: 1,
          reduction: 0,
          attack: 0.4,
          release:0.1,
          compressorGain: 1,
          pan: 0,
          outputGain: 1,
          solo: false,
          mute: false,
          outputConnected: true,
        },
        {
          inputGain: 0.8,
          phase: true,
          lowpassFreq: 20000,
          lowpassQ: 1,
          highpassFreq: 0,
          highpassQ: 1,
          highPeakingFreq: 10000,
          highPeakingQ: 1,
          highPeakingGain: 0,
          midPeakingFreq: 3000,
          midPeakingQ:1,
          midPeakingGain: 0,
          lowPeakingFreq: 60,
          lowPeakingQ: 1,
          lowPeakingGain: 0,
          knee: 30,
          threshold: 0,
          ratio: 1,
          reduction: 0,
          attack: 0.4,
          release:0.1,
          compressorGain: 1,
          pan: 0,
          outputGain: 1,
          solo: false,
          mute: false,
          outputConnected: true,
        },
        {
          inputGain: 0.8,
          phase: true,
          lowpassFreq: 20000,
          lowpassQ: 1,
          highpassFreq: 0,
          highpassQ: 1,
          highPeakingFreq: 10000,
          highPeakingQ: 1,
          highPeakingGain: 0,
          midPeakingFreq: 3000,
          midPeakingQ:1,
          midPeakingGain: 0,
          lowPeakingFreq: 60,
          lowPeakingQ: 1,
          lowPeakingGain: 0,
          knee: 30,
          threshold: 0,
          ratio: 1,
          reduction: 0,
          attack: 0.4,
          release:0.1,
          compressorGain: 1,
          pan: 0,
          outputGain: 1,
          solo: false,
          mute: false,
          outputConnected: true,
        },
        {
          inputGain: 0.8,
          phase: true,
          lowpassFreq: 20000,
          lowpassQ: 1,
          highpassFreq: 0,
          highpassQ: 1,
          highPeakingFreq: 10000,
          highPeakingQ: 1,
          highPeakingGain: 0,
          midPeakingFreq: 3000,
          midPeakingQ:1,
          midPeakingGain: 0,
          lowPeakingFreq: 60,
          lowPeakingQ: 1,
          lowPeakingGain: 0,
          knee: 30,
          threshold: 0,
          ratio: 1,
          reduction: 0,
          attack: 0.4,
          release:0.1,
          compressorGain: 1,
          pan: 0,
          outputGain: 1,
          solo: false,
          mute: false,
          outputConnected: true,
        },
        ]
    };
  };
  componentDidMount() {
    for(let i = 0; i < channelArray.length; i++) {
      //channel default slider values
      audioNodes[i][`ch${channelArray[i].channelName}InputGain`].gain.setTargetAtTime(this.state.channels[i].inputGain, audioCtx.currentTime, 0.001);
      audioNodes[i][`ch${channelArray[i].channelName}LowPassFilter`].frequency.setTargetAtTime(this.state.channels[i].lowpassFreq, audioCtx.currentTime, 0.001);
      audioNodes[i][`ch${channelArray[i].channelName}LowPassFilter`].Q.setTargetAtTime(this.state.channels[i].lowpassQ, audioCtx.currentTime, 0.001);
      audioNodes[i][`ch${channelArray[i].channelName}HighPassFilter`].frequency.setTargetAtTime(this.state.channels[i].highpassFreq, audioCtx.currentTime, 0.001);
      audioNodes[i][`ch${channelArray[i].channelName}HighPassFilter`].Q.setTargetAtTime(this.state.channels[i].highpassQ, audioCtx.currentTime, 0.001);
      audioNodes[i][`ch${channelArray[i].channelName}HighPeaking`].frequency.setTargetAtTime(this.state.channels[i].highPeakingFreq, audioCtx.currentTime, 0.001);
      audioNodes[i][`ch${channelArray[i].channelName}HighPeaking`].Q.setTargetAtTime(this.state.channels[i].highPeakingQ, audioCtx.currentTime, 0.001);
      audioNodes[i][`ch${channelArray[i].channelName}HighPeaking`].gain.setTargetAtTime(this.state.channels[i].highPeakingGain, audioCtx.currentTime, 0.001);
      audioNodes[i][`ch${channelArray[i].channelName}MidPeaking`].frequency.setTargetAtTime(this.state.channels[i].midPeakingFreq, audioCtx.currentTime, 0.001);
      audioNodes[i][`ch${channelArray[i].channelName}MidPeaking`].Q.setTargetAtTime(this.state.channels[i].midPeakingQ, audioCtx.currentTime, 0.001);
      audioNodes[i][`ch${channelArray[i].channelName}MidPeaking`].gain.setTargetAtTime(this.state.channels[i].midPeakingGain, audioCtx.currentTime, 0.001);
      audioNodes[i][`ch${channelArray[i].channelName}LowPeaking`].frequency.setTargetAtTime(this.state.channels[i].lowPeakingFreq, audioCtx.currentTime, 0.001);
      audioNodes[i][`ch${channelArray[i].channelName}LowPeaking`].Q.setTargetAtTime(this.state.channels[i].lowPeakingQ, audioCtx.currentTime, 0.001);
      audioNodes[i][`ch${channelArray[i].channelName}LowPeaking`].gain.setTargetAtTime(this.state.channels[i].lowPeakingGain, audioCtx.currentTime, 0.001);
      audioNodes[i][`ch${channelArray[i].channelName}Compressor`].threshold.setTargetAtTime(this.state.channels[i].threshold, audioCtx.currentTime, 0.001);
      audioNodes[i][`ch${channelArray[i].channelName}Compressor`].knee.setTargetAtTime(this.state.channels[i].knee, audioCtx.currentTime, 0.001);
      audioNodes[i][`ch${channelArray[i].channelName}Compressor`].ratio.setTargetAtTime(this.state.channels[i].ratio, audioCtx.currentTime, 0.001);
      audioNodes[i][`ch${channelArray[i].channelName}Compressor`].attack.setTargetAtTime(this.state.channels[i].attack, audioCtx.currentTime, 0.001);
      audioNodes[i][`ch${channelArray[i].channelName}Compressor`].release.setTargetAtTime(this.state.channels[i].release, audioCtx.currentTime, 0.001);
      audioNodes[i][`ch${channelArray[i].channelName}CompressorGain`].gain.setTargetAtTime(this.state.channels[i].compressorGain, audioCtx.currentTime, 0.001);
      audioNodes[i][`ch${channelArray[i].channelName}OutputGain`].gain.setTargetAtTime(this.state.channels[i].outputGain, audioCtx.currentTime, 0.001);
      audioNodes[i][`ch${channelArray[i].channelName}Pan`].pan.setTargetAtTime(this.state.channels[i].pan, audioCtx.currentTime, 0.001);
    }
    master[0].masterOutputGain.gain.setTargetAtTime(this.state.masterSection[0].outputGain, audioCtx.currentTime, 0.001);
    //load source material into the BufferLoader
    let bufferLoader = new BufferLoader(
      audioCtx,
      [
        '/assets/audio/Phoenix - 1901/drums.mp3',
        '/assets/audio/Phoenix - 1901/beat.mp3',
        '/assets/audio/Phoenix - 1901/bass.mp3',
        '/assets/audio/Phoenix - 1901/keys.mp3',
        '/assets/audio/Phoenix - 1901/otherguitar.mp3',
        '/assets/audio/Phoenix - 1901/rythmguitar.mp3',
        '/assets/audio/Phoenix - 1901/siren.mp3',
        '/assets/audio/Phoenix - 1901/synth2.mp3',
        '/assets/audio/Phoenix - 1901/synth.mp3',
        '/assets/audio/Phoenix - 1901/voice.mp3',
        '/assets/audio/Phoenix - 1901/voicedry.mp3',
      ],
       (bufferList, fullyConnect) => {
        finishedLoading(bufferList, fullyConnect);
        this.disabled();
      });
    bufferLoader.load();
  };
  disabled = () => {
    this.setState({
      disabled: false,
    });
  };
  //handles all channel sliders
  changeHandler = (nodeName, stateName, key, value, index) => {
    let newValue = value;
    let newArray = Array.from(this.state.channels);
    newArray[index][stateName] = newValue;
    this.setState({
      channels: newArray
    }, () => {
      audioNodes[index][nodeName][key].setTargetAtTime(this.state.channels[index][stateName], audioCtx.currentTime, 0.001);
    });
  };
  //handles all sliders in the master section
  masterSectionHandler = (nodeName, stateName, key, value, index) => {
    let newValue = value;
    let newArray = Array.from(this.state.masterSection);
    newArray[index][stateName] = newValue;
    this.setState({
      masterSection: newArray
    }, () => {
      master[index][nodeName][key].setTargetAtTime(this.state.masterSection[index][stateName], audioCtx.currentTime, 0.001);
    });
  };
  solo = (index) => {
    let newArray = Array.from(this.state.channels);
    newArray[index].solo = !newArray[index].solo;
    this.setState({
      channels: newArray,
    }, () => {
      let soloed = [];
      for(let i = 0; i < this.state.channels.length; i++) {
        if(this.state.channels[i].solo) {
          soloed.push(this.state.channels[i])
        };
      };
      if(soloed.length === 0) {
        for(let i = 0; i < this.state.channels.length; i++) {
          if(!this.state.channels[i].mute) {
            audioNodes[i][`ch${channelArray[i].channelName}Pan`].connect(master[0].masterOutputGain);
            let newArray = Array.from(this.state.channels);
            newArray[i].outputConnected = true;
            this.setState({
              channels: newArray
            });
          };
        };
      }
      else {
        for(let i = 0; i < this.state.channels.length; i++) {
          // if its solod and the output is not connected connect it
          if(this.state.channels[i].solo && !this.state.channels[i].outputConnected && !this.state.channels[i].mute) {
            audioNodes[i][`ch${channelArray[i].channelName}Pan`].connect(master[0].masterOutputGain);
            let newArray = Array.from(this.state.channels);
            newArray[i].outputConnected = true;
            this.setState({
              channels: newArray
            });
          }
          else if(!this.state.channels[i].solo && this.state.channels[i].outputConnected) {
            audioNodes[i][`ch${channelArray[i].channelName}Pan`].disconnect(master[0].masterOutputGain);
            let newArray = Array.from(this.state.channels);
            newArray[i].outputConnected = false;
            this.setState({
              channels: newArray
            });
          };
        };
      }; 
    });
  };
  mute = (index) => {
    let newArray = Array.from(this.state.channels);
    newArray[index].mute = !newArray[index].mute;
    this.setState({
      channels: newArray,
    }, () => {
        if(this.state.channels[index].mute) {
          audioNodes[index][`ch${channelArray[index].channelName}Pan`].disconnect(master[0].masterOutputGain);
          let newArray = Array.from(this.state.channels);
          newArray[index].outputConnected = false;
          this.setState({
            channels: newArray
          });
        }
        else {
          audioNodes[index][`ch${channelArray[index].channelName}Pan`].connect(master[0].masterOutputGain);
          let newArray = Array.from(this.state.channels);
          newArray[index].outputConnected = true;
          this.setState({
            channels: newArray
          })
        };
    });    
  };
  play = () => {
    if (this.state.paused === false && this.state.playing === false && this.state.stopped === 1) {
      for(let i = 0; i < channelArray.length; i++) {
        channelArray[i].instrument.start(0);
      };
    } 
    else if (this.state.paused === false && this.state.playing === false && this.state.stopped > 1) {      
      let someBuffers = Array.from(bufferCopies);
      finishedLoading(someBuffers, false);
      for(let i = 0; i < channelArray.length; i++) {
        channelArray[i].instrument.start(0);
      };
    }
    else {
      audioCtx.resume()
    }
    this.setState({
      paused: false,
      playing: true,
    })
  };
  pause = () => {   
    audioCtx.suspend()
    this.setState({
      paused: true,
      playing: false,
    })
  };
  stop = () => {
    let stopped = this.state.stopped + 1;
    for(let i = 0; i < channelArray.length; i++) {
      channelArray[i].instrument.stop(0);
    };
    this.setState({
      paused: false,
      playing: false,
      stopped: stopped,
    })
  }
  render() {
    let pageBackground = {
      backgroundColor: "#00003f",
      height: "100%"
    };
    let stateArray = this.state.channels
    let channelsJSX = stateArray.map((channel, i) => {
      return <Route path= {"/Channel" + (i + 1)}  render={(props)=> {return <Channel match={props.match}
                                                                                     changeHandler={this.changeHandler}
                                                                                     channelArray={channelArray}
                                                                                     channels={this.state.channels}
                                                                                     audioNodes={audioNodes}
                                                                                     solo={this.solo}
                                                                                     mute={this.mute}
                                                                                     key={i}
                                                                                     index={i}/>}}/>
    })
    return (
      <div style={pageBackground}>
        <nav className="navStyle">
          <div className="nav-wrapper">
            <Link to="/" exact className="brand-logo navLinkStyle">Mixer</Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><NavLink exact className="navLinkStyle" activeClassName= "active" to="/">Master</NavLink></li>
              <li><NavLink className="navLinkStyle" activeClassName= "active" to="/Channel1">CH1</NavLink></li>
              <li><NavLink className="navLinkStyle" activeClassName= "active" to="/Channel2">CH2</NavLink></li>
              <li><NavLink className="navLinkStyle" activeClassName= "active" to="/Channel3">CH3</NavLink></li>
              <li><NavLink className="navLinkStyle" activeClassName= "active" to="/Channel4">CH4</NavLink></li>
              <li><NavLink className="navLinkStyle" activeClassName= "active" to="/Channel5">CH5</NavLink></li>
              <li><NavLink className="navLinkStyle" activeClassName= "active" to="/Channel6">CH6</NavLink></li>
              <li><NavLink className="navLinkStyle" activeClassName= "active" to="/Channel7">CH7</NavLink></li>
              <li><NavLink className="navLinkStyle" activeClassName= "active" to="/Channel8">CH8</NavLink></li>
              <li><NavLink className="navLinkStyle" activeClassName= "active" to="/Channel9">CH9</NavLink></li>
              <li><NavLink className="navLinkStyle" activeClassName= "active" to="/Channel10">CH10</NavLink></li>
              <li><NavLink className="navLinkStyle" activeClassName= "active" to="/Channel11">CH11</NavLink></li>
            </ul>
          </div>
        </nav>
        <Switch>
          <Route path= "/" exact render={(props)=> {return <MasterSection masterSection={this.state.masterSection} 
                                                                          masterSectionHandler={this.masterSectionHandler}
                                                                          master={master}
                                                                          match={props.match}/>}}/>
          {channelsJSX}
        </Switch>
        <footer className="footer">
          <Transport play={this.play} pause={this.pause} stop={this.stop} disabled={this.state.disabled}/>
        </footer>
      </div>
    );
  }
}

export default App;
