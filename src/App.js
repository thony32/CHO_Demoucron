// import './App.css';
// import DemoncronBox from "./components/demoucronBox"
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "reactflow/dist/style.css"
import { ReactFlowProvider } from "reactflow"
import Main from "./page/Main"
import { RecoilRoot } from "recoil"

const App = () => {
    return (
        <RecoilRoot>
            <ReactFlowProvider>
                <Main />
            </ReactFlowProvider>
        </RecoilRoot>
    )
}

export default App
