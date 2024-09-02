import { useMutation, useQuery, useQueryClient } from "react-query";
import { getBulkOrders, getOrderById, getOrders,editOrder} from "./orderUrls";

const useGetOrders = (data) => {
  return useQuery(["get_orders", data], () => getOrders(data), {
    staleTime: 3000,
    keepPreviousData: true,
    // refetchOnWindowFocus: false,
  });
};
const useUpdateOrderStatus = () => {
  
  const queryClient = useQueryClient();

  return useMutation(({ orderId, newStatus }) => editOrder({ orderId, newStatus }), {
      onSuccess: (data) => {
          queryClient.invalidateQueries("get_orders");
          return data;
      },
      onError: (data) => {
          return data;
      },
  });
};

const useGetBulkOrders = (data) => {
  return useQuery(["get_bulk_orders", data], () => getBulkOrders(data), {
    staleTime: 3000,
    keepPreviousData: true,
    // refetchOnWindowFocus: false,
  });
};

const useGetOrderById = (data) => {
  return useQuery(["get_orders", data], () => getOrderById(data), {
    // staleTime: 30000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

export {
  useGetOrders,
  useGetOrderById,
  useGetBulkOrders,
  useUpdateOrderStatus
};
