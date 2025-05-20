import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.10:3000', // Unifica el prefijo /api aquí
});

export const listarClientes = () => api.get('/clientes');
export const crearCliente   = data => api.post('/clientes', data);

export const crearPedido = async (data) => {
  // data: { cliente_id, productos: [{descripcion, monto}, ...] }
  return await api.post('/pedidos', data); // Usa api.post y ruta relativa
};

export const listarPedidos  = clienteId => api.get(`/pedidos?cliente_id=${clienteId}`);
export const crearPago      = data => api.post('/pagos', data);
export const listarRecibos  = () => api.get('/recibos');
export const listarPagos     = clienteId => api.get(`/pagos?cliente_id=${clienteId}`);
export const detalleCliente = clienteId => api.get(`/detalleClientes/${clienteId}`);
// etc.
export default api;
