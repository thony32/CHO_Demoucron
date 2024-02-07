import React, { useCallback, useRef, useState } from "react"
import ReactFlow, { addEdge, Controls, Background, MiniMap, applyNodeChanges, applyEdgeChanges } from "reactflow"
import { ContextMenu } from "."
import "reactflow/dist/style.css"
import { useRecoilState } from "recoil"
import { edgesState, nodesState } from "../store"

const FlowChart = () => {
    const reactFlowWrapper = useRef(null)
    const connectingNodeId = useRef(null)
    const [nodes, setNodes] = useRecoilState(nodesState)
    const [edges, setEdges] = useRecoilState(edgesState)
    const [menu, setMenu] = useState(null)
    
    console.log(edges)
    console.log(nodes)

    // NOTE: Function to handle connection between nodes
    const onConnect = useCallback(
        (params) => {
            // reset the start node on connections
            connectingNodeId.current = null
            setEdges((eds) => addEdge(params, eds))
        },
        [setEdges]
    )


    // NOTE: All ReactFlow Props Functions
    const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), [setNodes])
    const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), [setEdges])

    // NOTE: Handle Node Context Menu event listener
    const showContextMenu = (event) => {
        event.preventDefault()
        const targetNode = event.target
        const isNode = targetNode && targetNode.classList.contains("react-flow__node")
        if (isNode) {
            // Si c'est un clic-droit sur un nœud, afficher ContextMenu à la position du curseur
            setMenu({
                id: targetNode.getAttribute("data-id"), // Obtention de l'ID du nœud sur lequel le clic droit a été effectué
                top: `${event.clientY}px`, // Assurez-vous que c'est une chaîne
                left: `${event.clientX - 320}px`,
            })
        } else {
            // Si le clic droit est hors d'un nœud, ne pas afficher de menu
            setMenu(null)
        }
    }

    // NOTE: Close the context menu if it's open whenever the window is clicked.
    const onPaneClick = useCallback(() => setMenu(null), [setMenu])

    return (
        <div className="bg-gray-200 col-span-7 w-full h-auto justify-center items-center" ref={reactFlowWrapper} onContextMenu={showContextMenu}>
            <ReactFlow minZoom={0.5} maxZoom={5} nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} onPaneClick={onPaneClick} fitView nodeOrigin={[0, 0]}>
                <Controls />
                <Background />
                <MiniMap className="scale-[.80]" nodeColor="#000000" pannable={true} />
                {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
            </ReactFlow>
        </div>
    )
}

export default FlowChart
