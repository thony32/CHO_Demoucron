import React from "react"
import { FlowChart, Process, Tools } from "../components"
import { useMediaQuery } from "react-responsive"

const Main = () => {
    const isDesktop = useMediaQuery({ query: "(min-width: 1900px)" })

    if (isDesktop) {
        return (
            <>
                <div className="grid grid-cols-12 h-screen overflow-y-hidden">
                    <Tools />
                    <FlowChart />
                    <Process />
                </div>
            </>
        )
    } else {
        return (
            <div className="h-screen flex justify-center items-center">
                <h1 className="text-2xl text-center text-red-500">
                    App not supported on smaller screen <span className="text-red-600 font-extrabold">(min-width: 1900px)</span>{" "}
                </h1>
            </div>
        )
    }
}

export default Main
