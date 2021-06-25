import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import * as ROUTES from 'routes.js'

import {renderToStaticMarkup} from 'react-dom/server'

import LandingBackground from 'assets/backgrounds/landingbackground.js'

import DownloadingLottie from 'components/lotties/landingdownloading.js'
import 'styles/pages/landing.css'
class Landing extends React.Component{


	render(){
		const background1string = encodeURIComponent(renderToStaticMarkup(<LandingBackground/>))

		return (
			<div style={{backgroundImage: `url("data:image/svg+xml, ${background1string}")`, height: '800px'}}>
				<h3 className="title is-2 has-text-link-light ">Welcome to Imagination Assembly</h3>

				<h4 className="subtitle is-2 has-text-link-light ">Merkle Team</h4>


				<p ><Link className="landinglink" to={ROUTES.REGISTRATION}>Please Register.</Link></p>

				<p ><Link className="landinglink" to={ROUTES.USERREPORT}>View User Report</Link></p>


				<DownloadingLottie / >



			</div>
		)
	}
}

export default withRouter(Landing)