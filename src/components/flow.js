import "reactflow/dist/style.css"
import React, { useCallback, useRef } from "react"
import ReactFlow, { MiniMap, applyNodeChanges, applyEdgeChanges, MarkerType } from "reactflow"
import { useRecoilState } from "recoil"
import { edgesState, nodesState } from "../store"

const FlowChart = ({ onConnect }) => {
    const ref = useRef(null)
    const [nodes, setNodes] = useRecoilState(nodesState)
    const [edges, setEdges] = useRecoilState(edgesState)

    console.log(edges)
    console.log(nodes)

    const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), [setNodes])
    const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), [setEdges])

    // NOTE: Functions to handle deletion of nodes
    const onNodesDelete = (nodeId) => {
        setNodes((nodes) => nodes.filter((node) => node.id !== nodeId))
    }

    const defaultEdgeOptions = {
        type: "custom",
        style: { strokeWidth: 1, stroke: "black" },
        markerEnd: { type: MarkerType.Arrow, width: 20, height: 20, color: "#000" },
    }

    return (
        <div className="bg-gray-200 col-span-7 w-full h-auto justify-center items-center" ref={ref}>
            <ReactFlow
                minZoom={0.5}
                maxZoom={5}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodesDelete={onNodesDelete}
                fitView
                nodeOrigin={[0, 0]}
                defaultEdgeOptions={defaultEdgeOptions}
            >
                <MiniMap className="scale-[.80]" nodeColor="#000000" pannable={true} />
            </ReactFlow>
        </div>
    )
}

export default FlowChart
