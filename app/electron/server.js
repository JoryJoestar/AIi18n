const { fetchData } = require('./fetchApi.js'); // Adjust the path 

const baseURL = 'http://127.0.0.1:10001'

export const translate = async (event, body) => {
    return fetchData(`${baseURL}/translate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
}
