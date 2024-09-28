// api.js

export function fetchData(url, options) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('网络错误');
            }
            const result = await response.json();
            resolve(result); // 处理成功
        } catch (err) {
            reject(err); // 处理失败
        }
    });
}