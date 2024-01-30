import React, { useState } from "react"

function NombreSommet() {
    const [nombreSommet, setnombreSommet] = useState(0)
    return (
        <>
            <input type="number" value={nombreSommet} onChange={(e) => setnombreSommet(e.target.value)} />
            <button>Creer</button>
            <button>Graphe par defaut</button>
        </>
    )
}

export default NombreSommet
