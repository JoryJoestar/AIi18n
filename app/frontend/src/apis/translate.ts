import { useRequest } from '~/hooks/useRequest';

const { fetchData } = useRequest<TranslateResponse>();

export const hello = async () => {
    return fetchData("/", {
        method: "GET",
    })
};
export const translate = async (params: TranslateParams) => {
    return fetchData("/translate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    })
};