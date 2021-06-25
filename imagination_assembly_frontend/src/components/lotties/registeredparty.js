import React, { Component } from 'react'
import lottie from 'lottie-web'
import animationData from 'assets/lotties/celebration.json'

class UncontrolledLottie extends Component {

  state = {delay: 0}

  componentDidMount(){

    let animObj = lottie.loadAnimation({
      container: this.lottiediv,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animationData
    })
  }

  render(){

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    return (
      // style={{width:'200px', height:'300px'}}
      <div >
        
        <div ref={ref =>this.lottiediv = ref} style={{ height:'600px'}} ></div>
      </div>
    )
  }
}

export default UncontrolledLottie