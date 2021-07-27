import axios from "axios";
const dbLink = "https://bd6g4.sse.codesandbox.io/api/persons";

const getAll = () => {
  const request = axios.get(dbLink);
  return request.then((response) => response.data);
};

const addInfo = (newObject) => {
  const request = axios.post(dbLink, newObject);
  return request.then((response) => response.data);
};

const deleteInfo = (id) => {
  const request = axios.delete(dbLink + "/" + id);
  console.log(id);
  return request.then((response) => response.data);
};

const updateInfo = (id, newObject) => {
  const request = axios.put(`${dbLink}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default {
  getAll,
  addInfo,
  deleteInfo,
  updateInfo
};
