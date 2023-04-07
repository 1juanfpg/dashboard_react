import { MeasureSummary } from './MeasureSummary'
import { LiveMeasure } from './LiveMeasure';

export const PrincipalBody = () => {
    return (
        <>
            {/* SELECTION BAR   */}
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button
                        className="nav-link active"
                        id="nav-live-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-live" 
                        type="button"
                        role="tab"
                        aria-controls="nav-live" 
                        aria-selected="true"
                        >
                            Live
                    </button>
                    <button
                        className="nav-link"
                        id="nav-summary-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-summay" 
                        type="button"
                        role="tab"
                        aria-controls="nav-summay" 
                        aria-selected="false"
                        >
                            Summary
                    </button>
                </div>
            </nav>


            {/* CONTENT */}
            <div className="tab-content" id="nav-tabContent">
                <div 
                    className="tab-pane fade show active tab-user"
                    id="nav-live"
                    role="tabpanel"
                    aria-labelledby="nav-live-tab"
                    tabIndex="0"
                    >
                        <LiveMeasure></LiveMeasure>
                </div>
                <div
                    className="tab-pane fade tab-user p-2"
                    id="nav-summay"
                    role="tabpanel"
                    aria-labelledby="nav-summary-tab"
                    tabIndex="1"
                    >
                        <MeasureSummary></MeasureSummary>
                </div>

            </div>
        </>
    )
}
