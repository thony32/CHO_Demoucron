import "reactflow/dist/style.css"
import ReactFlow, { MiniMap, MarkerType, Background, BackgroundVariant } from "reactflow"
import useStore from "../store/flow-store"
import CustomEdge from './custom-edge';


const FlowChart = () => {
    const nodes = useStore((state) => state.nodes)
    const edges = useStore((state) => state.edges)
    const onNodesChange = useStore((state) => state.onNodesChange)
    const onEdgesChange = useStore((state) => state.onEdgesChange)
    const onConnect = useStore((state) => state.onConnect)
    const onEdgeUpdate = useStore((state) => state.onEdgeUpdate)

    const defaultEdgeOptions = {
        type: "custom",
        style: { strokeWidth: 1, stroke: "black" },
        markerEnd: { type: MarkerType.Arrow, width: 20, height: 20, color: "#000" },
    }

    const edgeTypes = {
		custom: CustomEdge,
	};

    return (
        <div className="col-span-6 2xl:col-span-7 w-full h-auto justify-center items-center">
            <ReactFlow
                minZoom={1}
                maxZoom={2}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onEdgeUpdate={onEdgeUpdate}
                edgeTypes={edgeTypes}
                fitView
                nodeOrigin={[0, 0]}
                defaultEdgeOptions={defaultEdgeOptions}
            >
                <Background variant={BackgroundVariant.Lines} />
                <MiniMap className="scale-[.80]" nodeColor="yellow" pannable={true} />
            </ReactFlow>
        </div>
    )
}

export default FlowChart
