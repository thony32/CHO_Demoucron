// import './App.css';
// import DemoncronBox from "./components/demoucronBox"
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "reactflow/dist/style.css"
import { ReactFlowProvider } from "reactflow"
import { Main } from "./page"
import { BrowserView, MobileView } from "react-device-detect"

const App = () => {
    return (
        // <div className="App">
        //     <DemoncronBox />
        // </div>
        <>
            <BrowserView>
                <ReactFlowProvider>
                    <Main />
                </ReactFlowProvider>
            </BrowserView>
            <MobileView>
                <div className="text-5xl h-screen flex justify-center items-center text-red-500 text-center font-bold">
                    App not supported on mobile
                </div>
            </MobileView>
        </>
    )
}

export default App
