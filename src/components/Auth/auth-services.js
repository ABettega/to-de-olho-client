import axios from "axios";

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:5000",
      withCredentials: true
    });
    this.service = service;
  }

  signup(firstName, lastName, password, email, gender, day, month, year) {
    return this.service
      .post("/auth/signup", {
        firstName,
        lastName,
        password,
        email,
        gender,
        day,
        month,
        year
      })
      .then(response => response.data)
      .catch(err => console.log(err));
  }

  login(email,password) {
    return this.service.post("/auth/login",{
      username: email ,password
    })
    .then(response => response.data)
    .catch(err=>console.log(err))
  }

  deputados(){
    return this.service.get("/deputados")
    .then(response => response.data)
    .catch(err => console.log(err))
  }

  senadores(){
    return this.service.get("/senadores")
    .then(response => response.data)
    .catch(err => console.log(err))
  }
}

export default AuthService;
