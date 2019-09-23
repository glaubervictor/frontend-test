import { create } from "apisauce";

const api = create({
  baseURL: "https://swapi.co/api"
});

api.addResponseTransform(response => {
  if (!response.ok) throw response.data;
});

export default api;