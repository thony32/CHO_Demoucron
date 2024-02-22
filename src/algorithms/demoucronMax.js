import { copyMatrix, transposeMatrix } from "./utils"
import { findMaximum } from "."

async function demoucronMax(matrix) {
    let steps = []
    let copyOfMatrix = await copyMatrix(matrix)
    let transposedMatrix = transposeMatrix(matrix)
    const matrixSize = matrix.length
    let lastMatrix = []
    let currentMatrix = []

    for (let k = 1; k < matrixSize - 1; k++) {
        let inputNodes = []
        let outputNodes = []
        let changedNodes = []

        lastMatrix = await copyMatrix(copyOfMatrix)

        for (let i = 0; i < matrixSize; i++) {
            if (copyOfMatrix[i][k] !== Number.NEGATIVE_INFINITY) {
                inputNodes.push(i)
            }
            if (i === k) {
                for (let j = 0; j < matrixSize; j++) {
                    if (copyOfMatrix[i][j] !== Number.NEGATIVE_INFINITY) {
                        outputNodes.push(j)
                    }
                }
            }
        }

        inputNodes.forEach((i) => {
            let w = []
            return outputNodes.map((j) => {
                w[j] = copyOfMatrix[i][k] + copyOfMatrix[k][j]
                copyOfMatrix[i][j] = w[j] >= copyOfMatrix[i][j] ? w[j] : copyOfMatrix[i][j]
                changedNodes.push([i, j])
                return null // Add a return value to satisfy Array.prototype.map()
            })
        })

        currentMatrix = await copyMatrix(copyOfMatrix)

        steps.push({
            k: k,
            lastMatrix: lastMatrix,
            currentMatrix: currentMatrix,
            changedNodes: changedNodes,
            inputNodes: inputNodes,
            outputNodes: outputNodes,
        })
    }
    let maxPath = undefined
    if (Number.isFinite(copyOfMatrix[0][matrixSize - 1])) {
        let maxTransposedMatrix = transposeMatrix(copyOfMatrix)
        maxPath = findMaximum(transposedMatrix, maxTransposedMatrix)
    }
    return {
        steps: steps,
        maxPath: maxPath,
    }
}

export default demoucronMax
