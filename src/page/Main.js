/* eslint-disable no-unused-vars */
import React from "react"
import { FlowChart, Process, Tools } from "../components"
import { useMediaQuery } from "react-responsive"
import { useRecoilState } from "recoil"
import { nodesState, edgesState, vertexCountState } from "../store"
import { useCallback } from "react"
import { addEdge, Position } from "reactflow"

const Main = () => {
    const isDesktop = useMediaQuery({ query: "(min-width: 1900px)" })
    const [vertexCount, setVertexCount] = useRecoilState(vertexCountState)
    const [nodes, setNodes] = useRecoilState(nodesState)
    const [edges, setEdges] = useRecoilState(edgesState)
    console.log(vertexCount)
    console.log(nodes)
    console.log(edges)

    const onConnect = useCallback((params) => setEdges((els) => addEdge({ ...params, type: "CustomEdge" }, els)), [setEdges])

    // NOTE: Generate Graph Nodes
    const generateGraph = (vertexCount) => {
        const newNodes = []
        for (let i = 1; i <= vertexCount; i++) {
            const nodeType = i === 1 ? "input" : i === vertexCount ? "output" : "default"
            newNodes.push({
                id: `${i}`,
                type: nodeType,
                position: { x: Math.random() * 1000 - 500, y: Math.random() * 1000 }, // X est aléatoire entre -500 et 500, Y est 0
                data: { label: `S${i}` },
                style: { borderRadius: 100, width: 100, height: 100, border: 1 },
                sourcePosition: Position.Right,
                targetPosition: Position.Left,
            })
        }
        setNodes(newNodes)
        setEdges([]) // Réinitialiser les arêtes
    }

    // NOTE: Reset Graph
    const resetGraph = () => {
        setNodes([])
        setEdges([])
    }

    if (isDesktop) {
        return (
            <>
                <div className="grid grid-cols-12 h-screen overflow-y-hidden">
                    <Tools onGenerateGraph={generateGraph} onResetGraph={resetGraph} />
                    <FlowChart onConnect={onConnect} />
                    <Process />
                </div>
            </>
        )
    } else {
        return (
            <div className="h-screen flex justify-center items-center">
                <h1 className="text-2xl text-center text-red-400">
                    App not supported on smaller screen <span className="text-red-600 font-extrabold">(min-width: 1900px)</span>{" "}
                </h1>
            </div>
        )
    }
}

export default Main
