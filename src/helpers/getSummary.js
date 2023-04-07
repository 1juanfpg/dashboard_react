import { getData } from './getData';

export const getSummary = async() =>    {
    let min = await getData('min');
    let max = await getData('max');
    let prom = await getData('prom');
    let enddate = await getData('enddate');

    min.dateTem_min = new Date(min.timeTem_min).toISOString();
    min.dateHum_min = new Date(min.timeHum_min).toISOString();
    max.dateTem_max = new Date(max.timeTem_max).toISOString();
    max.dateHum_max = new Date(max.timeHum_max).toISOString();
    enddate.lastTimeMeasure = new Date(enddate.lastTimeMeasure).toISOString();

    prom.promHum = prom.promHum.toFixed(2);
    prom.promTem = prom.promTem.toFixed(2);

    return { ...min,...max, ...prom, ...enddate }
};