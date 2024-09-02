import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addCategory,
  getCategoryById,
  editCategory,
  deleteCategory,
  addProduct,
  deleteProduct,
  getCategory,
  getProductById,
  getProducts,
  updateProduct,
} from "./productUrls";

const useGetCategory = (data) => {
  return useQuery(["get_category", data], () => getCategory(data), {
    staleTime: 3000,
    keepPreviousData: true,
    // refetchOnWindowFocus: false,
  });
};


const useGetCategorysById = (data) => {
  return useQuery(["get_category", data], () => getCategoryById(data), {
      staleTime: 3000,
      keepPreviousData: true,
      // refetchOnWindowFocus: false,
  });
};

const useEditCategorys = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => editCategory(data), {
      onSuccess: (data) => {
          queryClient.invalidateQueries("get_category");
          return data;
      },
      onError: (data) => {
          return data;
      },
  });
};

const useDeleteCategorys = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => deleteCategory(data), {
      onSuccess: (data) => {
          queryClient.invalidateQueries("get_category");
          return data;
      },
      onError: (data) => {
          return data;
      },
  });
};

const useGetProducts = (data) => {
  return useQuery(["get_products", data], () => getProducts(data), {
    // staleTime: 30000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

const useGetProductById = (data) => {
  return useQuery(["get_products", data], () => getProductById(data), {
    // staleTime: 30000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};


const useAddCategory = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => addCategory(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("get_category");
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};

const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => addProduct(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("get_products");
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};
const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => updateProduct(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("get_products");
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};
const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => deleteProduct(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("get_products");
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};

export {
  useGetCategory,
  useEditCategorys, 
  useGetCategorysById, 
  useDeleteCategorys ,
  useGetProducts,
  useGetProductById,
  useAddCategory,
  useAddProduct,
  useUpdateProduct,
  useDeleteProduct
};
