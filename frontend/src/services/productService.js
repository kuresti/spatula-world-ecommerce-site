/********************************
 * Required resources
 ********************************/
import API from './api';

export function getProducts() {
    return API.get('/products');
}

export function getProductById(id) {
    return API.get(`/products/${id}`);
}