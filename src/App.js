// import './App.css';
// import DemoncronBox from "./components/demoucronBox"
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "reactflow/dist/style.css"
import { ReactFlowProvider } from "reactflow"
import { Main } from "./page"

const App = () => {
    return (
        // <div className="App">
        //     <DemoncronBox />
        // </div>
        <>
            <ReactFlowProvider>
                <Main />
            </ReactFlowProvider>
        </>
    )
}

export default App
