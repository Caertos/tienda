import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.10:3000',
});

export const listarClientes = () => api.get('/clientes');
export const crearCliente   = data => api.post('/clientes', data);
export const crearPedido    = data => api.post('/pedidos', data);
export const listarPedidos  = clienteId => api.get(`/pedidos?cliente_id=${clienteId}`);
export const crearPago      = data => api.post('/pagos', data);
export const listarRecibos  = () => api.get('/recibos');
// etc.
export default api;
