import http from "../http-common";

class TutorialDataService {
  getAll() {
    return http.get("/tutorials");
  }

  getIngredientes() {
    return http.get("/nikaido/ingredientes");
  }

  getReceta(id) {
    return http.get(`/nikaido/receta/${id}`);
  }

  get(id) {
    return http.get(`/tutorials/${id}`);
  }

  create(data) {
    return http.post("/tutorials", data);
  }

  update(id, data) {
    return http.put(`/tutorials/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tutorials/${id}`);
  }

  deleteAll() {
    return http.delete(`/tutorials`);
  }

  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }

  buscarRecetas(data) {
    return http.post("/nikaido/recetas/buscar", data);
  }
}

export default new TutorialDataService();