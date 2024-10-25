import { useRequest } from '~/hooks/useRequest';

const { fetchData } = useRequest<any>();


export const get_api_key_status = async () => {
    return fetchData("/settings/apikeys/status", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
};

export const set_api_key = async (params: ApiKey) => {
    return fetchData("/settings/apikey", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    })
};

export const get_api_key = async (model: string) => {
    return fetchData("/settings/apikey", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ "name": model }),
    })
}