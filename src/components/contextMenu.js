import React from "react"

const ContextMenu = ({ id, top, left, ...props }) => {
    return (
        <div style={{ top: top, left: left }} className="absolute flex flex-col w-[200px] xl:w-[150px] bg-red-500/80 rounded-full z-10" {...props}>
            <button className="py-2 px-4 text-sm hover:bg-red-500 duration-300 rounded-full flex justify-between items-center space-x-4">
                <span className="font-bold tracking-wide text-white">Supprimer</span>
            </button>
        </div>
    )
}

export default ContextMenu
