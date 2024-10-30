import { useRequest } from '~/hooks/useRequest';

const { fetchData } = useRequest<any>();

export const translate = async (params: ReqTranslate) => {
    return fetchData("/translate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    })
};

export const get_translate_by_content = async (content: string) => {
    return fetchData("/translate/get", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ source_content: content }),
    })
};