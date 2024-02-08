import React from "react"
import { BaseEdge, EdgeLabelRenderer, getBezierPath } from "reactflow"

const CustomEdge = ({ id, data, sourceX, sourceY, targetX, targetY }) => {
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
    })

    const edgeLabelStyle = {
        position: "absolute",
        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
        pointerEvents: "all",
    }

    return (
        <>
            <BaseEdge id={id} path={edgePath} />
            <EdgeLabelRenderer>
                <label style={edgeLabelStyle} className="nodrag nopan text-lg text-white bg-gray-700 rounded-full w-12 h-12 p-2">
                    {data.value}
                </label>
            </EdgeLabelRenderer>
        </>
    )
}

export default CustomEdge
