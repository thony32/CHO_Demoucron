import React, { useRef } from "react"
import { Handle, Position } from "reactflow"
import { handleStyleRight, handleStyleLeft } from "."

const CustomNode = ({ data, isConnectable }) => {
    const contentRef = useRef(null)
    return (
        <>
            <div className="w-24 h-24 bg-red-200 rounded-full" ref={contentRef}>
                {data.label}
            </div>
            <Handle type="source" style={handleStyleRight} position={Position.Right} isConnectable={isConnectable} />
            <Handle type="target" style={handleStyleLeft} position={Position.Left} isConnectable={isConnectable} />
        </>
    )
}

export default CustomNode