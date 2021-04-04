import {axios} from '../axios';


const getTasks = async () => (
    axios.get('')
);

const login = async (data) => (
    axios.post('/login/', data)
);

export {getTasks, login};
