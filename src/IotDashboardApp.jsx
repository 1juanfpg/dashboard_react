import { MeasureSummary } from "./components/MeasureSummary"
import { SlChart } from "react-icons/sl";
import { PrincipalBody } from "./components/PrincipalBody";
    
export const IotDashboardApp = () => {
    return (
        <>
            <div className="container mt-1">

                <h1 className="center">IoT Dashboard App</h1>

                <PrincipalBody></PrincipalBody>

            </div>
        </>
    )
}
