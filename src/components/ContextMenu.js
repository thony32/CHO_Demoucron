import React from "react"

const ContextMenu = ({ id, top, left, right, bottom, ...props }) => {
    
    return (
        <div style={{ top: top, left: left, right: right, bottom: bottom }} className="absolute flex flex-col w-[200px] xl:w-[250px] bg-red-500/80 rounded-sm z-10" {...props}>
            <button className="py-2 px-4 text-sm hover:bg-red-500 duration-300 rounded-sm flex justify-between items-center space-x-4">
                <span className="font-bold tracking-wide">Supprimer</span>
            </button>
        </div>
    )
}

export default ContextMenu
