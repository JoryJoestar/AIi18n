import { useRequest } from '~/hooks/useRequest';

const { fetchData } = useRequest<any>();

// === Project ===

export const create_project = async (params: ReqProject) => {
    return fetchData("/project/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    })
};

export const update_project = async (params: ReqProject) => {
    return fetchData("/project/update", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    })
};

export const delete_project = async (project_id: number) => {
    return fetchData(`/project/delete/${project_id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
};

export const get_project_by_id = async (project_id: number) => {
    return fetchData(`/project/get/${project_id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
};

export const get_project_all = async () => {
    return fetchData(`/project/get_all`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
};

// === ProjectItem ===

export const create_project_item = async (params: ReqProjectItem) => {
    return fetchData("/project/item/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    })
};

export const update_project_item = async (params: ReqProjectItem) => {
    return fetchData("/project/item/update", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    })
};

export const delete_project_item = async (project_item_id: number) => {
    return fetchData("/project/item/delete", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ project_item_id: project_item_id }),
    })
};

export const get_project_item_by_id = async (project_item_id: number) => {
    return fetchData(`/project/item/get/${project_item_id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
};

export const get_project_item_all = async (project_id: number) => {
    return fetchData(`/project/item/get_all/${project_id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
};

