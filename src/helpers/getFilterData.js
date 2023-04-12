export const getFilterData = async(initDate, endDate) => {
    const url = 'https://007735284j.execute-api.us-east-1.amazonaws.com/beta/filter';
    const options = {method: 'POST', body: '{"start":'+initDate+',"end":'+endDate+'}'};

    const result = await fetch(url, options)
        .then(response => response.json())
        .catch(err => err);

    return result;
}