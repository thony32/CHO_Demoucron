// utils.js
import { transposeMatrix, copyMatrix } from "."

// max.js
export const findMaximumPath = (initialMatrix, maxMatrix) => {
    const matrixSize = initialMatrix.length
    let currentRow = maxMatrix.length - 1
    const maxPath = []

    while (currentRow >= 0) {
        maxPath.push(currentRow)

        if (initialMatrix[currentRow][0] === maxMatrix[currentRow][0]) {
            maxPath.push(0)
            break
        }

        const nextRow = initialMatrix[currentRow].findIndex(
            (value, col) => value !== Number.NEGATIVE_INFINITY && maxMatrix[currentRow][0] === value + maxMatrix[col][0]
        )

        if (nextRow === -1) {
            currentRow--
        } else {
            currentRow = nextRow
        }
    }

    return maxPath.reverse()
}

export const demoucronMax = async (matrix) => {
    const steps = []
    const matrixSize = matrix.length
    let currentMatrix = await copyMatrix(matrix)

    for (let k = 1; k < matrixSize - 1; k++) {
        const lastMatrix = await copyMatrix(currentMatrix)
        const inputNodes = []
        const outputNodes = []
        const changedNodes = []

        for (let i = 0; i < matrixSize; i++) {
            if (currentMatrix[i][k] !== Number.NEGATIVE_INFINITY) {
                inputNodes.push(i)
            }

            if (i === k) {
                for (let j = 0; j < matrixSize; j++) {
                    if (currentMatrix[i][j] !== Number.NEGATIVE_INFINITY) {
                        outputNodes.push(j)
                    }
                }
            }
        }

        for (const i of inputNodes) {
            for (const j of outputNodes) {
                const newValue = currentMatrix[i][k] + currentMatrix[k][j]
                const oldValue = currentMatrix[i][j]
                if (newValue > oldValue) {
                    currentMatrix[i][j] = newValue
                    changedNodes.push([i, j])
                }
            }
        }

        steps.push({
            k,
            lastMatrix,
            currentMatrix,
            changedNodes,
            inputNodes,
            outputNodes,
        })
    }

    let maxPath
    if (Number.isFinite(currentMatrix[0][matrixSize - 1])) {
        const maxTransposedMatrix = transposeMatrix(currentMatrix)
        maxPath = findMaximumPath(transposeMatrix(matrix), maxTransposedMatrix)
    }

    return { steps, maxPath }
}

