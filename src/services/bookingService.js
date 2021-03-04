import http from './httpService';

const apiBookingEndpoint = 'bookings/';

export function getBookings() {
    return http.get(apiBookingEndpoint);
}

export function getBooking(id) {
    return http.get(apiBookingEndpoint + id);
}

export function saveBooking(booking) {

    if(booking._id) {
        const body = {...booking};
        delete body._id;
        return http.put(apiBookingEndpoint + booking._id, body);
    }
    return http.post(apiBookingEndpoint, booking);
}

export function deleteBooking(id) {
    return http.delete(apiBookingEndpoint + id);
}

export default {
    getBookings,
    getBooking,
    saveBooking,
    deleteBooking
}

