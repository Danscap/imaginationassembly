import React from 'react'
import { Link, withRouter } from 'react-router-dom'




 class ScrollToTop extends React.Component{


	constructor(props){

		super(props)
	}


	/* LIFECYCLE METHODS */
	/* _________________ */
	componentDidUpdate(prevProps, prevState){
		if(prevProps.location.pathname !== this.props.location.pathname){
			window.scrollTo(0,0)
		}
	}

	componentDidMount(){
		window.scrollTo(0,0)
	}
	/* _________________ */


	



	
	render(){

		return null

	}
}



export default withRouter(ScrollToTop)

