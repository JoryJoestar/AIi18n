const { fetchWrapper } = require('./fetchApi.js'); // Adjust the path 

export const fastapiAppUrl = 'http://127.0.0.1:10000'

export const translate = async (event, body) => {
    const res = await fetchWrapper.post(
        fastapiAppUrl + '/translate',
        body
    )
    const fileInfo = await res.json()
    return fileInfo
}
