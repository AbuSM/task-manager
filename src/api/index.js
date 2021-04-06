import {axios} from '../axios';


const getTasks = async (params) => (
    axios.get('', {params})
);

const login = async (data) => (
    axios.post('/login/', data, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
);

const createTask = async (data) => (
    axios.post('/create/', data)
);

const editTask = async (data, id) => (
    axios.post(`/edit/${id}`, data)
);

export {getTasks, login, createTask, editTask};
