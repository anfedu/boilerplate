import axios from "axios";

let url = "http://localhost:1337/api";
let urlEvent = url + "/events";
let urlUpload = url + "/upload";

export const getEvents = (params) => {
  return axios.get(urlEvent, {
    params,
  });
};

export const getEvent = (id) => {
  return axios.get(`${urlEvent}/${id}`);
};

export const postEvents = (values) => {
  return axios.post(urlEvent, {
    data: values,
  });
};

export const putEvents = (values, rowId) => {
  return axios.put(`${urlEvent}/${rowId}`, {
    data: values,
  });
};

export const deleteEvent = (id) => {
  return axios.delete(`${urlEvent}/${id}`);
};

export const upload = (values) => {
  return axios.post(urlUpload, values);
};

export const getFile = (rowId) => {
  return axios.get(`${urlUpload}/files/${rowId}`);
};
