/********************************
 * Required resources
 ********************************/
import API from './api';

export const getProducts = () => API.get('/');
export const getProductById = () => API.get('/:id');