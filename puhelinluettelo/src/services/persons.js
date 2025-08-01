import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = nameObject => {
    return axios.post(baseUrl, nameObject)
}

const remove = id => {
    return axios.delete(baseUrl + '/' + id)
}

const update = (id, numberObject) => {
    return axios.put(baseUrl + '/' + id, numberObject)
}

export default {
    getAll: getAll,
    create: create,
    remove: remove,
    update: update
}