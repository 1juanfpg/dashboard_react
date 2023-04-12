import { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import Flatpickr from "react-flatpickr";

import { getFilterData } from "../helpers/getFilterData";

import "flatpickr/dist/themes/material_green.css";
import '../styles/MeasureSummary.css';

export const MeasureSummary = () => {
    const [loadInfo, setLoad] = useState(true)
    const [initDate, setInitDate] = useState(null);
    const [endDate, setendDate] = useState(null);
    const [error, setError] = useState(null);
    const [summaryData, setSummaryData] = useState({
        dateHum_min: 0,
        dateHum_max: 0,
        dateTem_max: 0,
        dateTem_min: 0,
        lastDateMeasure: 0,
        lastHumMeasure: 0,
        lastTempMeasure: 0,
        lastTimeMeasure: 0,
        maxHum: 0,
        maxTem: 0,
        minHum: 0,
        minTem: 0,
        promHum: 0,
        promTem: 0,
        timeHum_max: 0,
        timeHum_min: 0,
        timeTem_max: 0,
        timeTem_min: 0
    });

    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: "ESP32 Temperature",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: [],
            },
            {
                label: "ESP32 Humidity",
                backgroundColor: "rgb(132,99,255)",
                borderColor: "rgb(132, 99, 255)",
                data: [],
            }
        ],
    });
    

    useEffect(() => {
        //getSummary()
        //    .then( newSummary => setSummaryData(newSummary));
    }, [])
    
    const handleClick = async() => {
        setLoad(false)
        if(initDate == null && endDate == null) {
            setError(1);
        } else if(initDate == null ){
            setError(2);
        } else if(endDate == null ){
            setError(3);
        } else if(endDate < initDate){
            setError(4)
        } else {
            setError(0)
            //const unixInitDate = convertirAUnix(initDate);
            //const unixEndDate = convertirAUnix(endDate);
            const unixInitDate = initDate.getTime()
            const unixEndDate = endDate.getTime()

            const esp32Items = await getFilterData(unixInitDate, unixEndDate);
            if(esp32Items[1].length >1 ){
                const tempValues = esp32Items[1].map((item) => {
                    return item.temp;
                });

                const humValues = esp32Items[1].map((item) => {
                    return item.hum;
                });

                const labels = esp32Items[1].map((item) => {
                    const myDate = new Date(item.timestamp);
                    return myDate.getDate().toString()
                        + "-" + (myDate.getMonth() + 1).toString()
                        + "-" + myDate.getFullYear()
                        + " " + myDate.getHours()
                        + ":" + myDate.getMinutes();
                });

                const myData = {
                    labels: labels,
                    datasets: [
                        {
                        label: "ESP32 Humidity",
                        backgroundColor: "rgb(255, 99, 132)",
                        borderColor: "rgb(255, 99, 132)",
                        data: humValues,
                        },
                        {
                        label: "ESP32 Temperature",
                        backgroundColor: "rgb(132, 99, 255)",
                        borderColor: "rgb(132, 99, 255)",
                        data: tempValues,
                        }
                    ],
                };
                setData(myData);
                
                setSummaryData({
                    dateHum_min: new Date(esp32Items[0].timeHum_min).toISOString(),
                    dateHum_max: new Date(esp32Items[0].timeHum_max).toISOString(),
                    dateTem_max: new Date(esp32Items[0].timeTem_max).toISOString(),
                    dateTem_min: new Date(esp32Items[0].timeTem_min).toISOString(),
                    maxHum: esp32Items[0].max_hum,
                    maxTem: esp32Items[0].max_temp,
                    minHum: esp32Items[0].min_hum,
                    minTem: esp32Items[0].min_temp,
                    promHum: esp32Items[0].promHum.toFixed(2),
                    promTem: esp32Items[0].promTem.toFixed(2),
                    timeHum_max: esp32Items[0].timeHum_max,
                    timeHum_min: esp32Items[0].timeHum_min,
                    timeTem_max: esp32Items[0].timeTem_max,
                    timeTem_min: esp32Items[0].timeTem_min,
                })
            }
        }
        setLoad(true)
    }

    const handleInitDateChange = (dates) => {
        setInitDate(dates[0]);
    };
    const handleEndDateChange = (dates) => {
        setendDate(dates[0]);
    };

    const convertirAUnix = (fecha) => {
        if (fecha) {
          return Math.floor(fecha.getTime() / 1000); // Dividir por 1000 para convertir de milisegundos a segundos
        }
        return null;
    };


    return (
        <>         
            <div className="row">
                <div className="col">
                    <form className="p-3">
                        <div className="row mx-auto d-flex justify-content-center" >
                            <div className="col-md-4">
                                <label className="form-label col-form-label col-form-label-sm" htmlFor="startDate">Start date</label>
                                <Flatpickr
                                    className={`input-date ${ (error ==1 || error == 2) && 'invalid'} `}
                                    data-enable-time
                                    onChange={handleInitDateChange}
                                    options={{
                                        time_24hr: true,
                                        dateFormat: "d/m/Y H:i", // Establece el formato de fecha y hora
                                    }}
                                    placeholder="dd/mm/yyyy hh:mm"
                                    value={initDate}
                                />
                                { (error == 1 || error == 2) && <p className="text-danger">Please choose a date</p>}
                            </div>
                            <div className="col-md-4">
                                <label className="form-label col-form-label col-form-label-sm" htmlFor="startDate">End date</label>
                                <Flatpickr
                                    className={`input-date ${(error ==1 || error == 3 || error == 4)  && 'invalid'}`}                                    data-enable-time
                                    onChange={handleEndDateChange}
                                    options={{
                                        time_24hr: true,
                                        dateFormat: "d/m/Y H:i", // Establece el formato de fecha y hora
                                    }}
                                    placeholder="dd/mm/yyyy hh:mm"
                                    value={endDate}
                                />               
                                { (error ==1 || error == 3) && <p className="text-danger">Please choose a date</p>}
                                { error ==4 && <p className="text-danger">Please choose a valid date</p>}
                            </div>
                        </div>
                        
                        <div className="m-2 d-flex justify-content-center">
                            <button  
                                type="button"  
                                className="btn btn-success btn-lg" 
                                onClick={handleClick}
                                disabled={!loadInfo}
                                >
                                { loadInfo && 'Consult'}
                                { !loadInfo &&
                                    <div class="spinner-border text-light" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                }
                            </button>
                        </div>
                        
                    </form>
                </div>

                <div className="col">
                    <table className="tg table mx-auto">
                        <thead>
                            <tr>
                                <th className="tg-0lax"></th>
                                <th className="tg-baqh cell-light" colSpan="2">MIN</th>
                                <th className="tg-baqh" colSpan="2">MAX</th>
                                <th className="tg-nrix cell-light" rowSpan="2">AVR</th>
                            </tr>
                            <tr>
                                <th className="tg-baqh"></th>
                                <th className="tg-baqh cell-light ">Value</th>
                                <th className="tg-baqh cell-light ">Date</th>
                                <th className="tg-baqh">Value</th>
                                <th className="tg-baqh">Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className="tg-baqh">Temperature</td>
                                <td className="tg-baqh cell-light ">{summaryData.minTem} °C</td>
                                <td className="tg-baqh cell-light ">{summaryData.dateTem_min}</td>
                                <td className="tg-baqh">{summaryData.maxTem} °C</td>
                                <td className="tg-baqh">{summaryData.dateTem_max}</td>
                                <td className="tg-baqh cell-light ">{summaryData.promTem} °C</td>
                            </tr>
                            <tr>
                                <td className="tg-baqh">Humidity</td>
                                <td className="tg-baqh cell-light ">{summaryData.minHum}%</td>
                                <td className="tg-baqh cell-light ">{summaryData.dateHum_min}</td>
                                <td className="tg-baqh">{summaryData.maxHum}%</td>
                                <td className="tg-baqh">{summaryData.dateHum_max}</td>
                                <td className="tg-baqh cell-light ">{summaryData.promHum}%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

            <div>
                {<Line data={data} />}
            </div>

        </>
    )
}
