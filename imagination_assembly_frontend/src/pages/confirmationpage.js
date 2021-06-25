import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import * as ROUTES from 'routes.js'

import CelebrationLottie from 'components/lotties/registeredparty.js'
class ConfirmationPage extends React.Component{

 	constructor(props){
 		super(props)
 	}

 	GoHome = e =>{
 		this.props.history.push(ROUTES.LANDING)
 	}
	render(){
		return (
			<div>
				<CelebrationLottie />
				<h2 className="title is-2">Thank you for registering!</h2>

				<button onClick={this.GoHome}>Return to Home</button>
			</div>
		)
	}
}
export default withRouter(ConfirmationPage)