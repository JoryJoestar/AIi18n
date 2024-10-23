import { useRequest } from '~/hooks/useRequest';

const { fetchData } = useRequest<any>();

// === Project ===

export const create_project = async (params: any) => {
    return fetchData("/project/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    })
};

export const update_project = async (params: any) => {
    return fetchData("/project/update", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    })
};

export const delete_project = async (params: any) => {
    return fetchData("/project/delete", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    })
};

export const get_project_by_id = async (params: any) => {
    return fetchData("/project/get", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    })
};

export const get_project_all = async () => {
    return fetchData("/project/get_all", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
};

// === ProjectItem ===

export const create_project_item = async (params: any) => {
    return fetchData("/project/item/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    })
};

export const update_project_item = async (params: any) => {
    return fetchData("/project/item/update", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    })
};

export const get_project_item_by_id = async (params: any) => {
    return fetchData("/project/item/get", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    })
};

export const get_project_item_all = async (params: any) => {
    return fetchData("/project/item/get_all", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    })
};

