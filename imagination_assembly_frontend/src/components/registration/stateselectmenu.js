import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import * as ROUTES from 'routes.js'
class RegistrationForm extends React.Component{

  //props : refSelectMenu (reference to menu set to registration form state) , 

  constructor(props){
    super(props)
  }

  render(){

    var us_states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA',
                     'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX',
                     'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
                    ]

    var statesrender = us_states.map( (state, index) =>{
      return (
        <option key={index} value={state}>{state}</option>
      )
    })
    return (
      <select className="select" ref={this.props.refSelectMenu} onChange={this.props.getData} >
        {statesrender}
      </select>
  
    )
  }
}

export default withRouter(RegistrationForm)