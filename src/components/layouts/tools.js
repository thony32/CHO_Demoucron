import React, { useState } from "react"
import { useRecoilState } from "recoil"
import { vertexCountState } from "../../store"
import { RxReset } from "react-icons/rx"
// import "../../index.css"

const Tools = ({ onGenerateGraph, onResetGraph }) => {
    const [pathType, setPathType] = useState("minPath")
    const [vertexCount, setVertexCount] = useRecoilState(vertexCountState)

    return (
        <div className="col-span-2 flex items-center justify-center">
            <div className="bg-white p-8 h-screen overflow-y-auto scrollbar">
                <h1 className="text-3xl text-center font-extrabold uppercase mb-6">Propriétés Graphe</h1>
                <div className="mb-4">
                    <label htmlFor="vertexCount" className="block font-semibold mb-2">
                        Sommets :
                    </label>
                    <input type="number" id="vertexCount" value={vertexCount} onChange={(e) => setVertexCount(Number(e.target.value))} placeholder="Nombre de sommets" className="px-4 py-2 w-full border rounded-full" />
                </div>
                <div className="flex gap-4">
                    <button onClick={() => onGenerateGraph(vertexCount)} className="px-6 py-2 text-xs text-white font-bold rounded-full bg-black/80 hover:bg-black active:scale-95 duration-300 w-full uppercase mb-6 cursor-pointer">
                        Générer graphe
                    </button>
                    <button onClick={onResetGraph} className="px-6 py-2 text-xs text-white font-bold rounded-full bg-gray-500/80 hover:bg-gray-500 active:scale-95 duration-300 mb-6 cursor-pointer">
                        <RxReset />
                    </button>
                </div>
                <div className="flex items-center mb-6">
                    <input type="radio" checked={pathType === "minPath"} name="path" id="maxPath" className="radio radio-gray-900 cursor-pointer" />
                    <label htmlFor="maxPath" className="ml-2 text-sm font-semibold">
                        Chemin Maximum
                    </label>
                </div>
                <div className="flex items-center mb-6">
                    <input type="radio" checked={pathType === "minPath"} name="path" id="minPath" className="radio radio-gray-900 cursor-pointer" />
                    <label htmlFor="minPath" className="ml-2 text-sm font-semibold">
                        Chemin Minimum
                    </label>
                </div>
                <h1 className="text-xl text-center font-extrabold uppercase mt-6">Valeurs des Arcs</h1>
                <div className="space-y-2 my-3">
                    <label htmlFor="vertexCount" className="block text-sm font-semibold">
                        Arc <span className="text-primary font-bold">(+Direction)</span> :
                    </label>
                    <input type="number" id="vertexCount" placeholder="Valeur" className="px-4 py-2 w-full border rounded-full" />
                </div>
                <button className="px-6 py-2 text-sm text-white font-bold rounded-full bg-black/80 hover:bg-black active:scale-95 disabled:bg-black/20 duration-300 w-full uppercase cursor-pointer">Trouver Chemin</button>
            </div>
        </div>
    )
}

export default Tools
