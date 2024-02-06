import { copyMatrix, transposeMatrix } from "./utils"
import { findMaximum } from "."

async function findLongestPath(matrixInput) {
    let steps = []

    let matrix = await copyMatrix(matrixInput)
    let initialMatrixTransposed = transposeMatrix(matrixInput)
    const matrixSize = matrix.length
    // let pathsWeights = [];
    let incomingNodes = []
    // let outgoingNodes = [];
    let previousMatrix = []
    let updatedMatrix = []
    // let changedCells = [];

    for (let node = 1; node < matrixSize - 1; node++) {
        let pathsWeights = []
        let outgoingNodes = []
        let changedCells = []
        incomingNodes = []
        outgoingNodes = []
        pathsWeights = []
        changedCells = []
        previousMatrix = await copyMatrix(matrix)

        for (let i = 0; i < matrixSize; i++) {
            if (matrix[i][node] !== Number.NEGATIVE_INFINITY) {
                incomingNodes.push(i)
            }
            if (i === node) {
                for (let j = 0; j < matrixSize; j++) {
                    if (matrix[i][j] !== Number.NEGATIVE_INFINITY) {
                        outgoingNodes.push(j)
                    }
                }
            }
        }

        incomingNodes.forEach((i) => {
            pathsWeights[i] = []
            outgoingNodes.forEach((j) => {
                let newPathWeight = matrix[i][node] + matrix[node][j]
                matrix[i][j] = Math.max(newPathWeight, matrix[i][j])
                if (matrix[i][j] === newPathWeight) {
                    changedCells.push([i, j])
                }
            })
        })

        updatedMatrix = await copyMatrix(matrix)
        steps.push({
            node,
            previousMatrix,
            updatedMatrix,
            changedCells,
            incomingNodes,
            outgoingNodes,
            pathsWeights,
        })
    }

    let longestPath = undefined
    if (Number.isFinite(matrix[0][matrixSize - 1])) {
        let finalMatrixTransposed = transposeMatrix(matrix)
        longestPath = findMaximum(initialMatrixTransposed, finalMatrixTransposed)
    }

    return {
        steps,
        longestPath,
    }
}

export default findLongestPath
