import React, { useCallback, useRef, useState } from "react"
import ReactFlow, { useNodesState, useEdgesState, addEdge, useReactFlow, Controls, Background, MiniMap } from "reactflow"
import { ContextMenu } from "."
import "reactflow/dist/style.css"

const initialNodes = [
    {
        id: "1",
        type: "input",
        data: { label: "Node" },
        position: { x: 0, y: 0 },
    },
]

let id = 2
const getId = () => `${id++}`

const FlowChart = () => {
    const reactFlowWrapper = useRef(null)
    const connectingNodeId = useRef(null)
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState([])
    const [rightClickOnNode, setRightClickOnNode] = useState(false)
    const [menu, setMenu] = useState(null)
    const { screenToFlowPosition } = useReactFlow()
    console.log(edges)
    console.log(nodes)
    const onConnect = useCallback(
        (params) => {
            // reset the start node on connections
            connectingNodeId.current = null
            setEdges((eds) => addEdge(params, eds))
        },
        [setEdges]
    )

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
        [screenToFlowPosition, setNodes, setEdges]
    )

    // NOTE: Handle Node Context Menu event listener
    const showContextMenu = (event) => {
        event.preventDefault()
        const targetNode = event.target
        const isNode = targetNode && targetNode.classList.contains("react-flow__node")
        if (isNode) {
            // Si c'est un clic-droit sur un nœud, préparer l'affichage de ContextMenu spécifiquement pour ce nœud
            setRightClickOnNode(true)
            const pane = reactFlowWrapper.current.getBoundingClientRect()
            setMenu({
                id: targetNode.getAttribute("data-id"), // Obtention de l'ID du nœud sur lequel le clic droit a été effectué
                top: event.clientY,
                left: event.clientX,
                right: event.clientX,
                bottom: event.clientY,
            })
        } else {
            // Si ce n'est pas un clic-droit sur un nœud, ne pas afficher ContextMenu
            setRightClickOnNode(false)
            setMenu(null)
        }
    }

    // NOTE: Close the context menu if it's open whenever the window is clicked.
    const onPaneClick = useCallback(() => setMenu(null), [setMenu])

    return (
        <div className="bg-gray-200 col-span-7 w-full h-auto justify-center items-center" ref={reactFlowWrapper} onContextMenu={showContextMenu}>
            <ReactFlow minZoom={0.5} maxZoom={5} nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} onConnectStart={onConnectStart} onConnectEnd={onConnectEnd} onPaneClick={onPaneClick} fitView nodeOrigin={[0, 0]}>
                <Controls />
                <Background />
                <MiniMap className="scale-[.80]" nodeColor="#000000" pannable={true} />
                {menu && rightClickOnNode && <ContextMenu onClick={onPaneClick} {...menu} />}
            </ReactFlow>
        </div>
    )
}

export default FlowChart
