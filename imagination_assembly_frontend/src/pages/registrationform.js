import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import {Users} from 'axios.js'
import StatesSelectMenu from 'components/registration/stateselectmenu.js'

import * as ROUTES from 'routes.js'

import Logo from 'assets/images/logo.png'

import 'styles/pages/registrationform.css'

class RegistrationForm extends React.Component{

	constructor(props){
		super(props)

		this.state={
			firstname: '',
			lastname: '',
			address1: '',
			address2: '',
			city: '',
			state: 'AL',
			zipcode: '',
			country: 'US',

			refselectMenu: '',
			signupError: '',
			maxFieldLength: '50'

		}

		this.refSelectMenu = null
	}

	firstnameInput = e =>{

		if(e.target.value === ""){
			this.setState({
				signupError: "",
				firstname: e.target.value
			})
			return
		}
		else if(e.target.value.length > this.state.maxFieldLength){
			this.setState({
				signupError: `first name cannot exceed ${this.state.maxFieldLength} characters`,
			})

			return
		}
		

		var arr = e.target.value.match(/[a-zA-Z\-\s_]/g)

		if(arr === null && e.target.value.length >0){

			this.setState({
				firstname: e.target.value,
				signupError: "first name can only contain letters or certain characters ( '-', '_', space, etc)" 
			})
			return
		}
		if( arr.length === e.target.value.length){

			this.setState({
				firstname: e.target.value,
				signupError: "" 
			})

		}
		else{

			this.setState({
				firstname: e.target.value,
				signupError: "first name can only contain letters or certain characters ( '-', '_', space, etc)" 
			})
			return
		}

	}

	lastnameInput = e =>{
		if(e.target.value === ""){
			this.setState({
				signupError: "",
				lastname: e.target.value
			})
			return
		}
		else if(e.target.value.length > this.state.maxFieldLength){
			this.setState({
				signupError: `last name cannot exceed ${this.state.maxFieldLength} characters`,
			})

			return
		}
		

		var arr = e.target.value.match(/[a-zA-Z\-\s_]/g)

		if(arr === null && e.target.value.length >0){

			this.setState({
				lastname: e.target.value,
				signupError: "last name can only contain letters or certain characters ( '-', '_', space, etc)" 
			})
			return
		}
		if( arr.length === e.target.value.length){

			this.setState({
				lastname: e.target.value,
				signupError: "" 
			})

		}
		else{

			this.setState({
				lastname: e.target.value,
				signupError: "last name can only contain letters or certain characters ( '-', '_', space, etc)" 
			})
			return
		}
	}

	address1Input = e =>{
		this.setState({
			address1: e.target.value
		})
	}

	address2Input = e =>{
		this.setState({
			address2: e.target.value
		})
	}

	cityInput = e =>{

		if(e.target.value === ""){
			this.setState({
				signupError: "",
				city: e.target.value
			})
			return
		}
		
		var arr = e.target.value.match(/[a-zA-Z\-\s_]/g)

		if(arr === null && e.target.value.length >0){

			this.setState({
				city: e.target.value,
				signupError: "city can only contain letters or certain characters ( '-', '_', space, etc)" 
			})
			return
		}
		if( arr.length === e.target.value.length){

			this.setState({
				city: e.target.value,
				signupError: "" 
			})

		}
		else{

			this.setState({
				city: e.target.value,
				signupError: "city can only contain letters or certain characters ( '-', '_', space, etc)" 
			})
			return
		}
	}

	getUSState = e =>{

		this.setState({
			state: this.refSelectMenu.value
		})
	}

	
	zipcodeInput = e =>{
		if(e.target.value === ""){
			this.setState({
				signupError: "",
				zipcode: e.target.value
			})
			return
		}
		
		var arr = e.target.value.match(/[0-9\-]/g)

		if(arr === null && e.target.value.length >0){

			this.setState({
				zipcode: e.target.value, 
				signupError: "zipcode can only contain numbers or '-' " 
			})
			return
		}
		if( arr.length === e.target.value.length){

			//check if zipcode is in 5 number format , or 9 number format with a dash
			if((e.target.value.length === 5 && (e.target.value.match(/[0-9]/g) || [] ).length === 5) ||  ((e.target.value.match(/[\-]/g) || []).length === 1 && e.target.value.length === 10)){
				this.setState({
					zipcode: e.target.value,
					signupError: "" 
				})
			}

			else {
				this.setState({
					zipcode: e.target.value,
					signupError: 'zipcode must be in 5-digit or 9-digit with dash format. e.g. 30017 , 98765-1234'
				})
			}

		}
		else{

			this.setState({
				zipcode: e.target.value,
				signupError: "zipcode can only contain numbers or '-' " 
			})
			return
		}
	}

	


	register = e =>{
		e.preventDefault()

		var firstname = this.state.firstname
		var lastname = this.state.lastname
		var address1 = this.state.address1
		var address2 = this.state.address2
		var city = this.state.city
		var state = this.state.state
		var zipcode = this.state.zipcode
		var country = this.state.country

		//check fields

		if(firstname === '' || lastname === '' || address1 === '' || address2 === '' || city === '' || state === '' || zipcode === '' || country === '' ){
			this.setState({
				signupError: 'One or more fields is blank. Please fill out each field.'
			})
			return
		}

		else if(this.state.signupError.length > 0)
			return

		Users.register(firstname, lastname, address1, address2, city, state, zipcode, country)
			.then( res =>{
				console.log(res)

				//redirect to confirmation page
				this.props.history.push(ROUTES.CONFIRMATION)

			})

	}

	render(){
		return (
			<div className="container is-fluid columns is-vcentered" >
				<div className="column is-half"> 
					<div className="column is-half registrationformcontainer">
						<h2 className="title is-2">Register</h2>
						<form className="" onSubmit={this.register}>
							

							<div className="field ">
								<label htmlFor="" className="label is-left">First Name</label>
								<div className="control">
									<input 
									value={this.state.firstname}
									onChange={this.firstnameInput}
									placeholder="First Name"
									type="text"
									className="input"
									/>
								</div>
							</div>

							<div className="field ">
								<label htmlFor="" className="label is-left">Last Name</label>
								<div className="control">
									<input 
									value={this.state.lastname}
									onChange={this.lastnameInput}
									placeholder="Last Name"
									className="input"
									type="text"
									className="input"

									/>
								</div>
							</div>

							<div className="field">
								<label htmlFor="" className="label is-left">Address 1</label>
								<div className="control">
									<input 
									value={this.state.address1}
									onChange={this.address1Input}
									placeholder="Address 1"
									type="text"
									className="input"

									/>
								</div>
							</div>

							<div className="field">
								<label htmlFor="" className="label is-left">Address 2</label>
								<div className="control">
									<input 
									value={this.state.address2}
									onChange={this.address2Input}
									placeholder="Address 2"
									type="text"
									className="input"

									/>
								</div>
							</div>

							<div className="field">
								<label htmlFor="" className="label is-left">City</label>
								<div className="control">
									<input 
									value={this.state.city}
									onChange={this.cityInput}
									placeholder="City"
									type="text"
									className="input"

									/>
								</div>
							</div>

							<div className="field">
								<label htmlFor="" className="label is-left">State</label>
								<div className="control">
									<StatesSelectMenu refSelectMenu={ref => this.refSelectMenu = ref} getData={this.getUSState} />
									
								</div>
							</div>

							<div className="field">
								<label htmlFor="" className="label is-left">Zip Code</label>
								<div className="control">
									<input 
									value={this.state.zipcode}
									onChange={this.zipcodeInput}
									placeholder="Zip Code"
									type="text"
									className="input"

									/>
								</div>
							</div>
							
							<div className="field">
								<label htmlFor="" className="label is-left">Country</label>
								<div className="control">
									<input 
									value={this.state.country}
									placeholder="Country (US)"
									disabled
									type="text"
									className="input"

									/>
								</div>
							</div>
							
							

							<button >Submit</button>

							{
								this.state.signupError.length > 0 ?
									<p>{this.state.signupError}</p>
								:
									null
							}

						</form>
					</div>
					
				</div>
				
				<div className="column is-half">
					
					<img src={Logo} alt=""/>
				</div>
			</div>
		)
	}
}

export default withRouter(RegistrationForm)