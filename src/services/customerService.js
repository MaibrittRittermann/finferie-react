import http from './httpService';

const apiCustomerEndpoint = 'customers/';

export function getCustomers() {
    return http.get(apiCustomerEndpoint);
}

export function getCustomer(id) {
    return http.get(apiCustomerEndpoint + id);
}

export function saveCustomer(Customer) {

    if(Customer._id) {
        const body = {...Customer};
        delete body._id;
        return http.put(apiCustomerEndpoint + Customer._id, body);
    }
    return http.post(apiCustomerEndpoint, Customer);
}

export function deleteCustomer(id) {
    return http.delete(apiCustomerEndpoint + id);
}

export default {
    getCustomers,
    getCustomer,
    saveCustomer,
    deleteCustomer  
}

