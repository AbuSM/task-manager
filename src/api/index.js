import {axios} from '../axios';


const getTasks = async () => (
    axios.get('')
);

const login = async (data) => (
    axios.post('/login/', data)
);

const createTask = async (data) => (
    axios.post('/create/', data)
);

const editTask = async (data, id) => (
    axios.post(`/edit/${id}`)
);

export {getTasks, login, createTask, editTask};
