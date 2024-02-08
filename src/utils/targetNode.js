import React, { useRef } from "react"
import { Handle, Position } from "reactflow"
import { handleStyleLeft } from "."

const TargetNode = ({ data, isConnectable }) => {
    const contentRef = useRef(null)
    return (
        <>
            <div className="w-24 h-24 rounded-full" ref={contentRef}>
                {data.label}
            </div>
            <Handle type="source" style={handleStyleLeft} position={Position.Left} isConnectable={isConnectable} />
        </>
    )
}

export default TargetNode
