import { useMutation, useQuery, useQueryClient } from "react-query";
import {
    getBlogs,
    addBlogs,
    getBlogsById,
    editBlogs,
    deleteBlogs,
    addBanners,
    editBanners,
    deleteBanners,
    getBannersById,
    getBanners
} from "./storeUrls";

const useGetBlogs = (data) => {
    return useQuery(["get_blogs", data], () => getBlogs(data), {
        staleTime: 3000,
        keepPreviousData: true,
        // refetchOnWindowFocus: false,
    });
};

const useGetBlogsById = (data) => {
    return useQuery(["get_blogs", data], () => getBlogsById(data), {
        staleTime: 3000,
        keepPreviousData: true,
        // refetchOnWindowFocus: false,
    });
};

const useAddBlogs = () => {
    const queryClient = useQueryClient();

    return useMutation((data) => addBlogs(data), {
        onSuccess: (data) => {
            queryClient.invalidateQueries("get_blogs");
            return data;
        },
        onError: (data) => {
            return data;
        },
    });
};

const useEditBlogs = () => {
    const queryClient = useQueryClient();

    return useMutation((data) => editBlogs(data), {
        onSuccess: (data) => {
            queryClient.invalidateQueries("get_blogs");
            return data;
        },
        onError: (data) => {
            return data;
        },
    });
};

const useDeleteBlogs = () => {
    const queryClient = useQueryClient();

    return useMutation((data) => deleteBlogs(data), {
        onSuccess: (data) => {
            queryClient.invalidateQueries("get_blogs");
            return data;
        },
        onError: (data) => {
            return data;
        },
    });
};

const useGetBanners = (data) => {
    return useQuery(["get_banners", data], () => getBanners(data), {
        staleTime: 3000,
        keepPreviousData: true,
        // refetchOnWindowFocus: false,
    });
};

const useGetBannersById = (data) => {
    return useQuery(["get_banners", data], () => getBannersById(data), {
        staleTime: 3000,
        keepPreviousData: true,
        // refetchOnWindowFocus: false,
    });
};

const useAddBanners = () => {
    const queryClient = useQueryClient();

    return useMutation((data) => addBanners(data), {
        onSuccess: (data) => {
            queryClient.invalidateQueries("get_banners");
            return data;
        },
        onError: (data) => {
            return data;
        },
    });
};

const useEditBanners = () => {
    const queryClient = useQueryClient();

    return useMutation((data) => editBanners(data), {
        onSuccess: (data) => {
            queryClient.invalidateQueries("get_banners");
            return data;
        },
        onError: (data) => {
            return data;
        },
    });
};

const useDeleteBanners = () => {
    const queryClient = useQueryClient();

    return useMutation((data) => deleteBanners(data), {
        onSuccess: (data) => {
            queryClient.invalidateQueries("get_banners");
            return data;
        },
        onError: (data) => {
            return data;
        },
    });
};

export {
    useGetBlogs,
    useGetBlogsById,
    useAddBlogs,
    useEditBlogs,
    useDeleteBlogs,
    useGetBanners,
    useGetBannersById,
    useAddBanners,
    useEditBanners,
    useDeleteBanners
};
