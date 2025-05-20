import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.10:3000',
});

export const listarClientes = () => api.get('/clientes');
export const crearCliente   = data => api.post('/clientes', data);

export const crearPedido = async (data) => {
  return await api.post(`/crearPedido/${data.cliente_id}`, data);
};

export const listarPedidos  = clienteId => api.get(`/pedidos?cliente_id=${clienteId}`);
export const crearPago      = data => api.post('/pagos', data);
export const listarRecibos  = () => api.get('/recibos');
export const listarPagos     = clienteId => api.get(`/pagos?cliente_id=${clienteId}`);
export const detalleCliente = clienteId => api.get(`/detalleClientes/${clienteId}`);

