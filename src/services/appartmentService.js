import http from './httpService';

const apiEndpoint = "appartments/";

export function getAppartments() {
    return http.get(apiEndpoint);
}

export function getAppartment(id) {
    return http.get(apiEndpoint + id)
}

export function saveAppartment(appartment) {
    if(appartment._id) {
        const body = {...appartment};
        delete body._id;
        return http.put(apiEndpoint + appartment._id, body);
    }
    return http.post(apiEndpoint, appartment);
}

export function deleteAppartment(id) {
    return http.delete(apiEndpoint + id);
}