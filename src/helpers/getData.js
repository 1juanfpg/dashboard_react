export const getData = async(method) => {
    const url = 'https://007735284j.execute-api.us-east-1.amazonaws.com/beta/';
    const options = {method: 'GET'};

    const result = await fetch(url + method, options)
    .then(response => response.json())
    .catch(err => err);

    return result;
}