let express = require('express')
let bodyParser = require('body-parser')
let morgan = require('morgan')
var cookieParser = require('cookie-parser')
var cors = require('cors')
var fs = require('fs')




/* Useful Variables */
/*_______________________________________________________________________________*/



const PORT = 3301


var start_time_server = Date.now()
var end_time_server = null


	/* POSTGRES SETUP  */
/*_______________________________________________________________________________*/

let pg = require('pg')


let pool = new pg.Pool({
	port: 5432,
	password: String.raw`GPpP6XePQJ5Hsq4v`,
	database: 'ImaginationAssembly',
	max: 10,
	host: '162.55.214.143',
	user: 'postgres'
})

pool.on('error', (err, client) =>{
	console.log(`error: ${err} with idle client ${client}`)
})




/* EXPRESS SETUP  */
/*_______________________________________________________________________________*/
let app = express()

let routes = require('express').Router()

app.use(cors())
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}))

app.use(function(request, response, next){
	response.header("Access-Control-Allow-Origin", "*")
	//response.header("Access-Control-Allow-Credentials: true")
	response.header("Access-Control-Allow-Methods: OPTIONS, GET, POST, DELETE, PUT, PATCH")
	response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	next()
})

app.use(cookieParser())




/* API  */			
/*_______________________________________________________________________________*/
/*_______________________________________________________________________________*/



app.post('/api/users/register', (req, res) =>{

	var {firstname, lastname, address1, address2, city, state, zipcode, country} = req.body

	//arbitrary limit to prevent too much data in one field
	const FIELD_LIMIT = 1000

	

	if(firstname === '' || lastname === '' || address1 === '' || address2 === '' || city === '' || state === '' || zipcode === '' || country === '' ){
		res.status(501).send({error: 'one or more fields is empty'})
	}

	if(firstname.length > FIELD_LIMIT || lastname.length > FIELD_LIMIT || address1.length > FIELD_LIMIT || address2.length > FIELD_LIMIT 
		|| city.length > FIELD_LIMIT || state.length > FIELD_LIMIT || zipcode.length > FIELD_LIMIT || country.length > FIELD_LIMIT 
	  ){
		
		res.status(501).send({error: 'one or more fields is longer than allowed limit (1000)'})
	}


	validateFields = (fieldname, value) =>{

		switch(fieldname){
			case 'firstname':{
				var arr = value.match(/[a-zA-Z\-\s_]/g)
				if(arr === null && value.length >0){
					res.status(501).send({error: `first name can only contain letters or certain characters ( '-', '_', space, etc)`})
				}
				
				if( arr.length === value.length){
					return true
				}
				else{
					res.status(501).send({error: `first name can only contain letters or certain characters ( '-', '_', space, etc)`})
				}
			}

			case 'lastname':{
				var arr = value.match(/[a-zA-Z\-\s_]/g)
				if(arr === null && value.length >0){
					res.status(501).send({error: `last name can only contain letters or certain characters ( '-', '_', space, etc)`})
				}
				
				if( arr.length === value.length){
					return true
				}
				else{
					res.status(501).send({error: `last name can only contain letters or certain characters ( '-', '_', space, etc)`})
				}
			}

			case 'address1':{
				return true
			}

			case 'address2':{
				return true
			}

			case 'city':{
				var arr = value.match(/[a-zA-Z\-\s_]/g)
				if(arr === null && value.length >0){
					res.status(501).send({error: `city can only contain letters or certain characters ( '-', '_', space, etc)`})
				}
				
				if( arr.length === value.length){
					return true
				}
				else{
					res.status(501).send({error: `city can only contain letters or certain characters ( '-', '_', space, etc)`})
				}
			}

			case 'state':{

				//US states for state validation
				var us_states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA',
			                     'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX',
			                     'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
			                    ]

				if(us_states.includes(value))
					return true
				else{
					res.status(501).send({error: `state value provided is not a valid state`})
				}

			}

			case 'zipcode':{
				var arr = value.match(/[0-9\-]/g)

				if(arr === null && value.length >0){
					res.status(501).send({error: `zipcode can only contain numbers or '-' `})
				}
				if( arr.length === value.length){

					//check if zipcode is in 5 number format , or 9 number format with a dash
					if((value.length === 5 && (value.match(/[0-9]/g) || [] ).length === 5) ||  ((value.match(/[\-]/g) || []).length === 1 && value.length === 10)){
						return true
					}

					else {
						res.status(501).send({error: `zipcode can only contain numbers or '-' `})
					}

				}
				else{
					res.status(501).send({error: `zipcode can only contain numbers or '-' `})
				}
			}

			case 'country':{
				if(value === 'US')
					return true
				else{
					res.status(501).send({error: `country value provided is not a valid country`})
				}
			}
		}

	}
	
	var firstnameValidated =  validateFields('firstname', firstname)
	var lastnameValidated =  validateFields('lastname', lastname)
	var address1Validated =  validateFields('address1', address1)
	var address2Validated =  validateFields('address2', address2)
	var cityValidated =  validateFields('city', city)
	var stateValidated =  validateFields('state', state)
	var zipcodeValidated =  validateFields('zipcode', zipcode)
	var countryValidated =  validateFields('country', country)


	pool.connect((errConnect, db, done)=>{

		if(errConnect){
			console.log('err in api/users/register: ' + errConnect)
			done()
			res.status(500).end()
		}
		else{

			db.query('INSERT INTO users(firstname, lastname, address1, address2, city, state, zipcode, country, date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW()) returning id',[firstname, lastname, address1, address2, city, state, zipcode, country ],(errQuery, table)=>{
				if(errQuery){
					console.log('errQuery in db api/users/register :'+ errQuery)
					done()
					res.status(500).end()
				}
				else{
					done()

					if(table.rows.length > 0){
						res.send({rows: table.rows[0]})
					}
					//entry with username not found in database, good request
					else{
						//501 http code: request not fulfilled
						res.status(501).send({error: 'user unable to be registered'})
					}

				}


			})
		}
	})
})


app.post('/api/users/getallusers', (req, res) =>{
		
	var { dataAggregationMethod } = req.body

	var query = ''
	var query_args = []

	switch(dataAggregationMethod){
		case 'byDateDescending': {
			query = `SELECT firstname, lastname, address1, address2, city, state, zipcode, country, date::timestamp AT TIME ZONE '-00' AS date FROM users ORDER BY date DESC`
		}
	}


	pool.connect( (errConnect, db, done) =>{

		if(errConnect){
			console.log(`errConnect in /api/users/getallusers : ${errConnect}`)
			done()
			res.status(500).end()

		}
		else{
			db.query(query, query_args, (errQuery, table) =>{

				if(errQuery){
					console.log('errQuery in db checking /api/users/getallusers:'+ errQuery)
					done()
					res.status(500).end()

				}
				else{
					done()

					if(table.rows.length > 0){
						// console.log('GOT A ROW')
						res.send({rows: table.rows})
					}
					else{
						res.status(501).send({error: 'no users in database'})

					}
				}
			})
		}
	})

})

							/* USER  */
/*_______________________________________________________________________________*/



 var server = app.listen(PORT, () => console.log('listening on port' + PORT))
