import { ref } from 'vue';

export function useRequest<T>() {
    const loading = ref<boolean>(false);
    const baseURL = 'http://localhost:10000';

    const fetchData = (url: string, options?: RequestInit): Promise<T> => {
        loading.value = true;

        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${baseURL}${url}`, options);
                if (!response.ok) {
                    throw new Error('网络错误');
                }
                const result = await response.json();
                resolve(result as T); // 处理成功
            } catch (err) {
                reject(err); // 处理失败
            } finally {
                loading.value = false;
            }
        });
    };

    return { loading, fetchData };
}