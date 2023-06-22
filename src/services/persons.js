import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
	return axios
		.get(baseUrl)
		.then((res) => res.data)
		.catch((err) => console.error(err));
};

const create = (person) => {
	return axios
		.post(baseUrl, person)
		.then((res) => res.data)
		.catch((err) => console.error(err));
};

const update = (id, person) => {
	return axios
		.put(`${baseUrl}/${id}`, person)
		.then((res) => res.data)
		.catch((err) => console.error(err));
};

const deletePerson = (id) => {
	return axios.delete(`${baseUrl}/${id}`);
};

const services = { getAll, create, update, delete: deletePerson };

export default services;
