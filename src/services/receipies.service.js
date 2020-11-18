import http from "../http-common";
import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.REACT_APP_API_URL;
class RecetaDataService {
  

  getIngredientes() {
    return axios.get(API_URL + 'ingredientes');
  }

  getReceta(id) {
   // return http.get(`/nikaido/receta/${id}`);
    return axios.get(API_URL + `receta/${id}`);
  }

  buscarRecetas(data) {
    return axios.post(API_URL + "recetas/buscar", data);
    
  }
}

export default new RecetaDataService();