import React, { useRef } from "react"
import { Handle, Position } from "reactflow"
import { handleStyleRight } from "."

const SourceNode = ({ data, isConnectable }) => {
    const contentRef = useRef(null)
    return (
        <>
            <div className="w-24 h-24 rounded-full" ref={contentRef}>
                {data.label}
            </div>
            <Handle type="source" style={handleStyleRight} position={Position.Right} isConnectable={isConnectable} />
        </>
    )
}

export default SourceNode
