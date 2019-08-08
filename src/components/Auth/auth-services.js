import axios from "axios";
import { compose } from "@material-ui/system";

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

  login(email, password) {
    return this.service
      .post("/auth/login", {
        username: email,
        password
      })
      .then(response => response.data)
      .catch(err => console.log(err));
  }

  deputadosatuais() {
    return this.service
      .get("/deputados/atuais")
      .then(response => response.data)
      .catch(err => console.log(err));
  }

  deputadostodos() {
    return this.service
      .get("/deputados/")
      .then(response => response.data)
      .catch(err => console.log(err));
  }

  senadorestodos() {
    return this.service
      .get("/senadores/historico")
      .then(response => response.data)
      .catch(err => console.log(err));
  }

  senadoresatuais() {
    return this.service
      .get("/senadores")
      .then(response => response.data)
      .catch(err => console.log(err));
  }



  detailsdeputados(id) {
    return this.service
      .get(`/deputados/sessoes/${id}`)
      .then(response => response.data)
      .catch(err => console.log(err));
  }

  sessoesPresentesDeputados(legis, situacao, nomeDeputado, legislaturas) {
    return this.service
    .post(`deputados/sessoes/info/${legis}/${situacao}`, {nomeDeputado, legislaturas})
    .then(response => response.data)
    .catch(err => console.log(err));
  }
}

export default AuthService;
