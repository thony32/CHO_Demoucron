import React from "react"

const FormData = () => {
    return (
        <div className="col-span-2 w-full h-auto flex items-center justify-center">
            <div className="bg-white rounded-lg p-8 shadow-lg">
                <h1 className="text-3xl text-center font-bold mb-6">Propriétés Graphe</h1>
                <div className="mb-4">
                    <label htmlFor="vertexCount" className="block text-lg mb-2">
                        Nombre de sommets
                    </label>
                    <input type="number" id="vertexCount" placeholder="Type here" className="input input-bordered w-full" />
                </div>
                <button className="btn btn-secondary w-full uppercase mb-6">Créer</button>
                <div className="flex items-center mb-6">
                    <input type="radio" name="path" id="maxPath" className="radio radio-primary" />
                    <label htmlFor="maxPath" className="ml-2">
                        Chemin Maximum
                    </label>
                </div>
                <div className="flex items-center mb-6">
                    <input type="radio" name="path" id="minPath" className="radio radio-primary" />
                    <label htmlFor="minPath" className="ml-2">
                        Chemin Minimum
                    </label>
                </div>
                <button className="btn btn-primary w-full uppercase">Trouver solution</button>
                <h1 className="text-3xl text-center font-bold mt-6">Valeurs des Arcs</h1>
                <div className="mb-4">
                    <label htmlFor="vertexCount" className="block text-lg mb-2">
                        Arc '{'value'}'
                    </label>
                    <input type="text" id="vertexCount" placeholder="Type here" className="input input-bordered w-full" />
                </div>
                <div className="mb-4">
                    <label htmlFor="vertexCount" className="block text-lg mb-2">
                        Arc '{'value'}'
                    </label>
                    <input type="text" id="vertexCount" placeholder="Type here" className="input input-bordered w-full" />
                </div><div className="mb-4">
                    <label htmlFor="vertexCount" className="block text-lg mb-2">
                        Arc '{'value'}'
                    </label>
                    <input type="text" id="vertexCount" placeholder="Type here" className="input input-bordered w-full" />
                </div>
            </div>
        </div>
    )
}

export default FormData
