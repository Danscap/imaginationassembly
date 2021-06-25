import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import {Users} from 'axios.js'

import 'styles/pages/userreport.css'

class UserReport extends React.Component{

	constructor(props){
		super(props)

		this.state ={
			users: []
		}
	}

	getUsers = () =>{

		var dataAggregationMethod = 'byDateDescending'
		Users.getAllUsers(dataAggregationMethod)
			.then( res =>{
				console.log(res.data)

				this.setState({
					users: res.data.rows
				})
			})
	}

	componentDidMount(){
		this.getUsers()
	}
	render(){

		var tableRender = this.state.users.map((user, index1) =>{
			return (
				<tr key={index1}>
					{
						Object.keys(user).map((field, index2) =>{
							return(
								<td key={index2}>{user[field]}</td>
							)
						})
					}
				</tr>
			)
		})

		var tableHeadingsRender = Object.keys(this.state.users[0] || []).map((field, index) =>{

			return (
				<td className="title is-5" key={index}>{field}</td>
			)
		})
		return (
			<div className="container is-hcentered" >
				<div className="panel is-dark">
					<p className="panel-heading">User Report</p>
				</div>
				<div className="columns is-centered">
					<div className="column auto">

						<table className="table  is-hoverable is-selected userreporttable">
								
							<thead>
								<tr>{tableHeadingsRender}</tr> 
							</thead>
							<tbody>
								{tableRender}
													
							</tbody>

						</table>
					</div>
				</div>
				
			</div>

		)
	}
}
export default withRouter(UserReport)
