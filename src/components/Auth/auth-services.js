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
      .then(response => { return response.data })
      .catch(err => console.log(err));
  }

  loggedin = () => {
    return this.service.get('/auth/loggedin')
    .then(response => response.data)
  }
  
  logout() {
    return this.service
      .get('/auth/logout')
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
    console.log(`deputados/sessoes/info/${legis}/${situacao}`);
    return this.service
    .post(`deputados/sessoes/info/${legis}/${situacao}`, {nomeDeputado, legislaturas})
    .then(response => response.data)
    .catch(err => console.log(err));
  }

  detailsVotacao(idVotacao) {
    return this.service
    .get(`/deputados/votacoes/${idVotacao}`)
    .then(response => {
      return axios.get(`https://dadosabertos.camara.leg.br/api/v2/proposicoes?siglaTipo=${response.data.documento.siglaTipo}&numero=${response.data.documento.numero}&ano=${response.data.documento.ano}&ordem=ASC&ordenarPor=id`)
      .then(res => {
        response.data.ementa = res.data.dados[0].ementa;
        response.data.votos.sort((a, b) => a.deputado.localeCompare(b.deputado));
        return response.data;
      })
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
  }

  getOneDeputado(nomeDeputado) {
    return this.service
    .get(`/deputados/nome/${nomeDeputado}`)
    .then(response => response.data)
    .catch(err => console.log(err));
  }
}

export default AuthService;
