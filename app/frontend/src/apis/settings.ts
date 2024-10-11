import { useRequest } from '~/hooks/useRequest';

const { fetchData } = useRequest<any>();

export const set_api_key = async (model: string, api_key: string) => {
    return fetchData("/settings/apikey", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ "name": model, "value": api_key }),
    })
};