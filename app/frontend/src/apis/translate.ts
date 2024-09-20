import { useRequest } from '~/hooks/useRequest';

const { fetchData } = useRequest<TranslateResponse>();

export const translate = async (params: TranslateParams) => {
    return fetchData("/translate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    })
};