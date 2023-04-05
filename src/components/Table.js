
import DataTable from 'react-data-table-component';


function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", theUrl, false); // false for synchronous request    
    xmlHttp.send();

    return xmlHttp.responseText;
}

const columns = [
    {
        name: 'Title',
        selector: row => row.title,
    },
    {
        name: 'Year',
        selector: row => row.year,
    },
];

const data = [
    {
        id: 1,
        title: 'Beetlejuice',
        year: '1988',
    },
    {
        id: 2,
        title: 'Ghostbusters',
        year: '1984',
    },
]

const Table = () => {
    const JSONResponse = httpGet("https://z5o5nstu1g.execute-api.us-east-1.amazonaws.com/beta/data");
    console.log(JSONResponse);
    return(
        <DataTable
            columns={columns}
            data={data}
        />
    )
}

export default Table