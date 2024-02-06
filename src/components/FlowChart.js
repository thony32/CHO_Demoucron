import React, { useCallback, useRef } from "react"
import ReactFlow, { useNodesState, useEdgesState, addEdge, useReactFlow } from "reactflow"
import "reactflow/dist/style.css"

const initialNodes = [
    {
        id: "1",
        type: "input",
        data: { label: "Node" },
        position: { x: 0, y: 50 },
    },
]

let id = 2
const getId = () => `${id++}`

const FlowChart = () => {
    const reactFlowWrapper = useRef(null)
    const connectingNodeId = useRef(null)
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState([])
    const { screenToFlowPosition } = useReactFlow()
    console.log(edges)
    const onConnect = useCallback((params) => {
        // reset the start node on connections
        connectingNodeId.current = null
        setEdges((eds) => addEdge(params, eds))
    }, [])

    const onConnectStart = useCallback((_, { nodeId }) => {
        connectingNodeId.current = nodeId
    }, [])

    const onConnectEnd = useCallback(
        (event) => {
            if (!connectingNodeId.current) return

            const targetIsPane = event.target.classList.contains("react-flow__pane")

            if (targetIsPane) {
                // we need to remove the wrapper bounds, in order to get the correct position
                const id = getId()
                const newNode = {
                    id,
                    position: screenToFlowPosition({
                        x: event.clientX,
                        y: event.clientY,
                    }),
                    data: { label: `Node ${id}` },
                    origin: [0.5, 0.0],
                }

                setNodes((nds) => nds.concat(newNode))
                setEdges((eds) => eds.concat({ id, source: connectingNodeId.current, target: id }))
            }
        },
        [screenToFlowPosition]
    )

    return (
        <div className="bg-gray-200 col-span-6 w-full h-auto justify-center items-center rounded-2xl shadow-xl" ref={reactFlowWrapper}>
            <ReactFlow minZoom={0.2} maxZoom={100} nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} onConnectStart={onConnectStart} onConnectEnd={onConnectEnd} fitView fitViewOptions={{ padding: 2 }} nodeOrigin={[0.5, 0]} />
        </div>
    )
}

export default FlowChart
