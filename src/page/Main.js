import React from "react"
import { FlowChart, FormData, Navbar } from "../components"

const Main = () => {
    return (
        <div className="w-full h-full">
            <Navbar />
            <div className="grid grid-cols-8 py-12 px-6">
                <FormData />
                <FlowChart />
            </div>
        </div>
    )
}

export default Main
