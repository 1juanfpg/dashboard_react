import { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

import { getSummary } from "../helpers/getSummary";
import '../styles/MeasureSummary.css';
import { getData } from "../helpers/getData";

export const MeasureSummary = () => {
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
        getSummary()
            .then( newSummary => setSummaryData(newSummary));
    }, [])
    
    const handleClick = async() => {
        const esp32Items = await getData('data');

        const tempValues = esp32Items.map((item) => {
            return item.temp;
        });

        const humValues = esp32Items.map((item) => {
            return item.hum;
        });

        const labels = esp32Items.map((item) => {
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
    }




    return (
        <>

            <div className="row">
                <div className="col">
                    <form className="">
                        <div className="row mx-auto d-flex justify-content-center" >
                            <div className="col-md-4">
                                <label className="form-label col-form-label col-form-label-sm" htmlFor="startDate">Start date</label>
                                <input type="date"  className="form-control form-control-sm" id="startDate" name="start_date"></input>
                            </div>
                            <div className="col-md-4">
                                <label className="form-label col-form-label col-form-label-sm" htmlFor="startDate">End date</label>
                                <input type="date"  className="form-control form-control-sm" id="startDate" name="start_date"></input>
                            </div>
                        </div>
                        
                        <div className="m-2 d-flex justify-content-center">
                            <button  
                                type="button"  
                                className="btn btn-success btn-lg" 
                                onClick={handleClick}
                                >
                                Consult
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
