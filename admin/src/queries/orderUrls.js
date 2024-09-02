import request from "utils/request";

const getOrders = async (data) => request(`/orders/adminfetch?page=${data?.pageNo}&perpageitems=${data?.pageCount}`, 'GET', data)
const getBulkOrders = async (data) => request(`/orders/bulkorder?page=${data?.pageNo}&perpageitems=${data?.pageCount}`, 'GET', data)
const getOrderById = async (data) => request(`/orders/${data?.id}`, 'GET', data)
const editOrder = async ({ orderId, newStatus }) => request('orders/update-status', 'PUT', {orderId, newStatus})

export {
  getOrders,
  getOrderById,
  getBulkOrders,
  editOrder
};
