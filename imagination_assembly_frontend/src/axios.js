import axios from 'axios'
import * as ROUTES from 'routes.js'

const API_ROOT = process.env.REACT_APP_SERVER_ADDRESS;

console.log('API_ROOT:' + API_ROOT)

const requests = {
  delete: url =>
    axios
      .delete(`${API_ROOT}${url}`),
      // .use(tokenPlugin)
      // .end(handleErrors)
      // .then(responseBody),
  get: url =>
    axios
      .get(`${API_ROOT}${url}`),
      // .use(tokenPlugin)
      // .end(handleErrors)
      // .then(responseBody),
  put: (url, body) =>
    axios
      .put(`${API_ROOT}${url}`, body),
      // .use(tokenPlugin)
      // .end(handleErrors)
      // .then(responseBody),
  post: (url, body) =>
    axios
      .post(`${API_ROOT}${url}`, body),
      // .use(tokenPlugin)
      // .end(handleErrors)
      // .then(responseBody),
};


const Users = {
  register: (firstname, lastname, address1, address2, city, state, zipcode, country) =>{
    return requests.post(`${ROUTES.API.register}`, {firstname: firstname, lastname: lastname, address1: address1, address2: address2, city: city, state: state, zipcode: zipcode, country: country})
  },

  getAllUsers: (dataAggregationMethod) =>{
    return requests.post(`${ROUTES.API.getallusers}`, {dataAggregationMethod})
  },

 };

export {
	Users
}

 export default requests