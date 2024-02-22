import { copyMatrix, transposeMatrix } from "./utils"
import { findMinimum } from "."

async function demoucronMin(matrix1) {
    let steps = []
    let matrix = await copyMatrix(matrix1)
    let transposedInitialMatrix = transposeMatrix(matrix1)
    // console.log(matrix);
    const matrixSize = matrix.length
    let w = []
    let input = []
    let output = []
    let lastMatrix = []
    let currentMatrix = []
    let hasChanged = []
    for (var k = 1; k < matrixSize - 1; k++) {
        input = []
        output = []
        w = []
        hasChanged = []
        lastMatrix = await copyMatrix(matrix)

        const processStep = async (matrix, k) => {
            const matrixSize = matrix.length
            const input = []
            const output = []
            const w = []
            const hasChanged = []

            for (let i = 0; i < matrixSize; i++) {
                if (matrix[i][k] !== Infinity) {
                    input.push(i)
                }
                if (i === k) {
                    for (let j = 0; j < matrixSize; j++) {
                        if (matrix[i][j] !== Infinity) {
                            output.push(j)
                        }
                    }
                }
            }

            input.forEach((source) => {
                w[source] = []
                output.forEach((target) => {
                    w[source][target] = matrix[source][k] + matrix[k][target]
                    matrix[source][target] = w[source][target] <= matrix[source][target] ? w[source][target] : matrix[source][target]
                    hasChanged.push([source, target])
                })
            })

            const currentMatrix = await copyMatrix(matrix)

            return {
                input,
                output,
                w,
                hasChanged,
                currentMatrix,
            }
        }

        for (let k = 1; k < matrixSize - 1; k++) {
            const { input, output, w, hasChanged, currentMatrix } = await processStep(matrix, k)
            steps.push({
                k,
                lastMatrix: await copyMatrix(matrix),
                currentMatrix,
                hasChanged,
                input,
                output,
                w,
            })
        }
        steps.push({
            k: k,
            lastMatrix: lastMatrix,
            currentMatrix: currentMatrix,
            hasChanged: hasChanged,
            input: input,
            output: output,
            w: w,
        })
    }
    let minPath = undefined
    if (Number.isFinite(matrix[0][matrixSize - 1])) {
        let minTransposedMatrix = transposeMatrix(matrix)
        minPath = findMinimum(transposedInitialMatrix, minTransposedMatrix)
    }
    return {
        minPath: minPath,
        steps: steps,
    }
}

export default demoucronMin
