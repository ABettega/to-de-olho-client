
import axios from 'axios';

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: 'http://localhost:5000',
      withCredentials: true
    });
    this.service = service;
  }

  signup (firstName, lastName, password, email,sex,day,month,year){
    return this.service.post('/auth/signup', {firstName, lastName, password, email,sex,day,month,year})
    .then(response => {
        console.log(response.status)
        if(response.status === 401){
            console.log(response.json)
        }
        console.log('olaaaaaaaaa',response.status)
    })
    .catch(err => {
        console.log(err)
    })
  }
}

export default AuthService;