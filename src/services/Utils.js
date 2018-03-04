import { apiHost, requestCount } from './configs';

const validateResponse = resp => {
    if (!resp.ok)
        throw new Error(`Fetch Request failed`, resp);
    return resp;
}
const jsonResponse = (resp) => resp.json();
const options = {
    method: 'POST',
    body: JSON.stringify({
        newFilters: [],
        sort_by: ['relevance']
    }),
    headers: {
        'content-type': 'application/json'
    }
};
export const getProducts = (index) => {
    const url = `${apiHost}pageNumber=${index}&count=${requestCount}&fromCache=true`;
    return fetch(url, options)
        .then(validateResponse)
        .then(jsonResponse);
}
