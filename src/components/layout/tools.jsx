import { useState } from "react"
import useStore from "../../store/flow-store"
import { Position } from "reactflow"

const Tools = () => {
    const addNode = useStore((state) => state.addNode)
    const resetGraph = useStore((state) => state.resetGraph)
    const vertexCount = useStore((state) => state.vertexCount)
    const setVertexCount = useStore((state) => state.setVertexCount)
    const maximum = useStore((state) => state.maximum)
    const minimum = useStore((state) => state.minimum)
    const setMinimum = useStore((state) => state.setMinimum)
    const setMaximum = useStore((state) => state.setMaximum)
    const setNodes = useStore((state) => state.setNodes)
    const edges = useStore((state) => state.edges)
    const setEdges = useStore((state) => state.setEdges)
    const [value, setValue] = useState({})
    console.log(maximum)
    console.log(minimum)

    const handleRadioChange = (e) => {
        const { value } = e.target
        if (value === "maximum") {
            setMaximum(true)
            setMinimum(false)
        } else if (value === "minimum") {
            setMinimum(true)
            setMaximum(false)
        }
    }

    const handleLabelChange = (edgeId, newLabel) => {
        setEdges(
            edges.map((edge) => {
                if (edge.id === edgeId) {
                    return {
                        ...edge,
                        data: { ...edge.data, label: newLabel },
                    }
                }
                return edge
            }),
        )
    }

    const handleChange = (edgeId, value) => {
        setValue((prevValues) => ({
            ...prevValues,
            [edgeId]: value,
        }))
        handleLabelChange(edgeId, Number(value))
    }

    const generateGraph = () => {
        const newNodes = []
        for (let i = 1; i <= vertexCount; i++) {
            const nodeType = i === 1 ? "input" : i === vertexCount ? "output" : "default"
            newNodes.push({
                id: `${i}`,
                type: nodeType,
                position: { x: Math.random() * 100, y: Math.random() * 200 },
                data: { label: `S${i}` },
                style: { borderRadius: 100, width: 50, height: 50, border: 1, display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold", backgroundColor: "gray" },
                sourcePosition: Position.Right,
                targetPosition: Position.Left,
            })
        }
        addNode(newNodes)
        setNodes(newNodes)
    }

    return (
        <div className=" col-span-3 2xl:col-span-2 flex items-center justify-center">
            <div className="bg-gray-200 p-8 h-screen overflow-y-auto scrollbar space-y-4">
                <div className="mb-6 flex justify-between items-center">
                    <h1 className="text-3xl font-extrabold uppercase ">Propriétés Graphe</h1>
                    <button
                        className="btn btn-circle btn-ghost"
                        onClick={() => document.getElementById("my_modal_2").showModal()}>
                        <svg
                            className="w-6 h-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM7.92 9.234v.102a.5.5 0 0 0 .5.5h.997a.499.499 0 0 0 .499-.499c0-1.29.998-1.979 2.34-1.979 1.308 0 2.168.689 2.168 1.67 0 .928-.482 1.359-1.686 1.91l-.344.154C11.379 11.54 11 12.21 11 13.381v.119a.5.5 0 0 0 .5.5h.997a.499.499 0 0 0 .499-.499c0-.516.138-.723.55-.912l.345-.155c1.445-.654 2.529-1.514 2.529-3.39v-.103c0-1.978-1.72-3.441-4.164-3.441-2.478 0-4.336 1.428-4.336 3.734zm2.58 7.757c0 .867.659 1.509 1.491 1.509.85 0 1.509-.642 1.509-1.509 0-.867-.659-1.491-1.509-1.491-.832 0-1.491.624-1.491 1.491z"
                                fill="#000000"
                            />
                        </svg>
                    </button>
                    <dialog
                        id="my_modal_2"
                        className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Minimum</h3>
                            <p className="py-4">
                                <section>
                                    <h2 className="text-sm">
                                        1 - Poser W<sub>ij</sub>
                                        <sup>(1)</sup> = V
                                        <sub>
                                            (x<sub>i</sub>, x<sub>j</sub>)
                                        </sub>{" "}
                                        si (x<sub>i</sub>, x<sub>j</sub>) ∈ U sinon W<sub>ij</sub>
                                        <sup>(1)</sup> = +∞
                                    </h2>
                                    <h2 className="text-sm">
                                        2 - Mettre les valeurs dans une matrice de dimension n x n, D<sub>1</sub>
                                    </h2>
                                    <h2 className="text-sm">
                                        3 -
                                        <span className="ml-1">
                                            Calculer W<sub>ij</sub>
                                            <sup>(k-1)</sup> = V<sub>ik</sub>
                                            <sup>(k-1)</sup> + V<sub>kj</sub>
                                            <sup>(k-1)</sup>, puis V<sub>ij</sub>
                                            <sup>(k)</sup> = min[W<sub>ij</sub>
                                            <sup>(k-1)</sup>, V<sub>ij</sub>
                                            <sup>(k-1)</sup>]. <br />
                                            Former la matrice Dk. <br />
                                            Arrêter dès que k = n - 1
                                        </span>
                                    </h2>
                                </section>
                            </p>
                            <h3 className="font-bold text-lg">Maximum</h3>
                            <p className="py-4">
                                <section>
                                    <h2 className="text-sm">
                                        1 - Poser W<sub>ij</sub>
                                        <sup>(1)</sup> = V
                                        <sub>
                                            (x<sub>i</sub>, x<sub>j</sub>)
                                        </sub>{" "}
                                        si (x<sub>i</sub>, x<sub>j</sub>) ∈ U sinon W<sub>ij</sub>
                                        <sup>(1)</sup> = 0
                                    </h2>
                                    <h2 className="text-sm">
                                        2 - Mettre les valeurs dans une matrice de dimension n x n, D<sub>1</sub>
                                    </h2>
                                    <h2 className="text-sm">
                                        3 -
                                        <span className="ml-1">
                                            Calculer W<sub>ij</sub>
                                            <sup>(k-1)</sup> = V<sub>ik</sub>
                                            <sup>(k-1)</sup> + V<sub>kj</sub>
                                            <sup>(k-1)</sup>, puis V<sub>ij</sub>
                                            <sup>(k)</sup> = max[W<sub>ij</sub>
                                            <sup>(k-1)</sup>, V<sub>ij</sub>
                                            <sup>(k-1)</sup>]. <br />
                                            Former la matrice Dk. <br />
                                            Arrêter dès que k = n - 1
                                        </span>
                                    </h2>
                                </section>
                            </p>
                        </div>
                        <form
                            method="dialog"
                            className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="vertexCount"
                        className="block font-semibold mb-2">
                        Sommets :
                    </label>
                    <input
                        type="number"
                        id="vertexCount"
                        value={vertexCount}
                        onChange={(e) => setVertexCount(Number(e.target.value))}
                        placeholder="Nombre de sommets"
                        className="px-4 py-2 w-full border rounded-full"
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <button
                        className="btn btn-neutral uppercase"
                        onClick={generateGraph}>
                        Générer graphe
                    </button>
                    <button
                        className="btn btn-error"
                        onClick={resetGraph}>
                        Réinitialiser
                    </button>
                </div>
                <div className="flex items-center mb-6">
                    <input
                        type="radio"
                        value="maximum"
                        checked={maximum}
                        onChange={handleRadioChange}
                        name="path"
                        id="maxPath"
                        className="radio radio-gray-900 cursor-pointer"
                    />
                    <label
                        htmlFor="maxPath"
                        className="ml-2 text-sm font-semibold">
                        Chemin Maximum
                    </label>
                </div>
                <div className="flex items-center mb-6">
                    <input
                        type="radio"
                        value="minimum"
                        checked={minimum}
                        onChange={handleRadioChange}
                        name="path"
                        id="minPath"
                        className="radio radio-gray-900 cursor-pointer"
                    />
                    <label
                        htmlFor="minPath"
                        className="ml-2 text-sm font-semibold">
                        Chemin Minimum
                    </label>
                </div>
                <h1 className="text-xl text-center font-extrabold uppercase mt-6">Valeurs des Arcs</h1>
                {edges
                    .sort((a, b) => {
                        const sourceComparison = parseInt(a.source) - parseInt(b.source)
                        return sourceComparison === 0 ? parseInt(a.target) - parseInt(b.target) : sourceComparison
                    })
                    .map((edge) => (
                        <div
                            className="space-y-2 my-3"
                            key={edge.id}>
                            <label
                                htmlFor={`edge-${edge.id}`}
                                className="block text-sm font-semibold">
                                Arc{" "}
                                <span className="text-lg font-bold">
                                    {edge.source} {"->"} {edge.target}
                                </span>{" "}
                                :
                            </label>
                            <input
                                type="number"
                                id={`edge-${edge.id}`}
                                placeholder="Valeur"
                                value={value[edge.id] || ""}
                                onChange={(e) => handleChange(edge.id, e.target.value)}
                                className="px-4 py-2 w-full border rounded-full"
                                min="1"
                            />
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Tools
