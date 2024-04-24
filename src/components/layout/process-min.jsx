import Table from "../table"
import { useState, useCallback, useEffect } from "react"
import useStore from "../../store/flow-store"
import { MarkerType } from "reactflow"
import { getPathIndexes, getMatrixN, setMatrix1 } from "../../utils/min"
import { extractNodesJoined, getPathEdges, getPathNodes, verifyEdgeLabel, verifyNodesOutput } from "../../utils/matrix"

const ProcessMin = () => {
    const customUpdateEdge = useStore((state) => state.customUpdateEdge)
    const updateNodesColor = useStore((state) => state.updateNodesColor)
    const edges = useStore((state) => state.edges)
    const nodes = useStore((state) => state.nodes)
    const [matrixN, setMatrixN] = useState([])
    const [explanations, setExplanations] = useState([])
    const [titles, setTitles] = useState([])
    const [calculable, setCalculable] = useState(false)

    const handleCalculate = useCallback(() => {
        setMatrixN([])
        setExplanations([])
        const extractedNodes = extractNodesJoined(nodes, edges)
        const _tempMatrixN = []
        const nodeLabels = extractedNodes.map((obj) => obj.data.label)

        _tempMatrixN.push(setMatrix1(extractedNodes, edges))

        for (let i = 1; i < extractedNodes.length - 1; i++) {
            const newMatrix = getMatrixN(_tempMatrixN[i - 1], nodeLabels, i)
            setExplanations((prevExp) => [...prevExp, ...newMatrix.explanations])
            _tempMatrixN.push(newMatrix.matrix)
        }

        setMatrixN(_tempMatrixN)
        setTitles(nodeLabels)

        const pathIndexes = getPathIndexes(_tempMatrixN[0], _tempMatrixN[_tempMatrixN.length - 1])
        const pathNodes = getPathNodes(pathIndexes, extractedNodes)
        const pathEdges = getPathEdges(pathIndexes, extractedNodes, edges)

        updateNodesColor(pathNodes)

        edges.map((edge) => {
            const isPathEdge = pathEdges.includes(edge)
            const newStyle = {
                ...edge.style,
                stroke: isPathEdge ? "#16a600" : "#000",
            }
            const newMarkerEnd = {
                type: MarkerType.Arrow,
                width: 20,
                height: 20,
                color: isPathEdge ? "#16a600" : "#000",
            }

            customUpdateEdge(
                {
                    ...edge,
                    style: newStyle,
                    markerEnd: newMarkerEnd,
                },
                {
                    source: edge.source,
                    target: edge.target,
                    sourceHandle: null,
                    targetHandle: null,
                },
            )
        })
    }, [nodes, edges, updateNodesColor, customUpdateEdge])

    useEffect(() => {
        if (verifyEdgeLabel(edges) && verifyNodesOutput(edges).length === 1) {
            setCalculable(true)
        } else {
            setMatrixN([])
            setCalculable(false)
        }
    }, [nodes, edges])

    return (
        <div className="flex flex-col items-center col-span-3 p-6 overflow-auto scrollbar">
            <div className="w-full space-y-4">
                <h1 className="text-3xl font-extrabold uppercase text-center">Démonstration Min</h1>
                <button
                    disabled={!calculable}
                    onClick={handleCalculate}
                    className="btn btn-info uppercase w-full">
                    Trouver Chemin
                </button>
            </div>
            {calculable && (
                <div className="w-full">
                    {matrixN.map((matrix, index) => (
                        <div
                            key={index}
                            className="w-full my-5 border p-3 rounded-lg">
                            <h2 className="font-bold text-lg mb-5">
                                {index + 1 !== 1 ? (
                                    <span className="italic text-primary">Pour k = {index + 1}</span>
                                ) : (
                                    <>
                                        Matrice D<sub>{index + 1}</sub>
                                    </>
                                )}
                            </h2>
                            <div className="space-y-5">
                                <Table
                                    data={matrix}
                                    oldData={matrixN[index - 1]}
                                    titles={titles}
                                    k={index + 1}
                                />
                                {index > 0 && (
                                    <div>
                                        {explanations
                                            .map((explanation) => {
                                                console.log("Explanation MID:", explanation.mid)
                                                console.log("Current Index:", String(index))
                                                return explanation
                                            })
                                            .filter((explanation) => explanation.mid === `${index + 1}`)
                                            .map((explanation, i) => (
                                                <p
                                                    key={i}
                                                    className="text-sm flex flex-col gap-3">
                                                    <span>
                                                        W<sub>{explanation.input + explanation.output}</sub>
                                                        <sup>({index})</sup> = V<sub>{explanation.input + explanation.mid}</sub>
                                                        <sup>({index})</sup> + V<sub>{explanation.mid + explanation.output}</sub>
                                                        <sup>({index})</sup> = {explanation.vik} + {explanation.vkj} = {explanation.w},
                                                    </span>
                                                    <span>
                                                        V<sub>{explanation.input + explanation.output}</sub>
                                                        <sup>({index + 1})</sup> = max[W
                                                        <sub>{explanation.input + explanation.output}</sub>
                                                        <sup>({index})</sup>, V<sub>{explanation.input + explanation.output}</sub>
                                                        <sup>({index})</sup>] = max[{explanation.w}, {explanation.vij1}] = <span className="text-blue-500 font-semibold">{explanation.vij2}</span>.
                                                    </span>
                                                </p>
                                            ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ProcessMin
