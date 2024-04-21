import { useMediaQuery } from "react-responsive"
import Tools from "./components/layout/tools"
import FlowChart from "./components/flow"
import ProcessMax from "./components/layout/process-max"
import useStore from "./store/flow-store"
import ProcessMin from "./components/layout/process-min"

function App() {
    const isDesktop = useMediaQuery({ query: "(min-width: 1366px)" })
    const maximum = useStore((state) => state.maximum)
    const minimum = useStore((state) => state.minimum)

    if (isDesktop) {
        return (
            <>
                <div className="grid grid-cols-12 h-screen overflow-y-hidden">
                    <Tools />
                    <FlowChart />
                    {maximum ? <ProcessMax /> : minimum ? <ProcessMin /> : <ProcessMin/>}
                </div>
            </>
        )
    } else {
        return (
            <div className="h-screen flex justify-center items-center">
                <h1 className="text-2xl text-center text-red-400">
                    App not supported on mobile and tablet screen <span className="text-red-600 font-extrabold">(min-width: 1366px)</span>{" "}
                </h1>
            </div>
        )
    }
}

export default App
