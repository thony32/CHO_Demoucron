import { extractMatrix, extractNodesJoined, transposeMatrix } from "./matrix"

export function setMatrix1(nodes, edges) {
    const matrix = extractMatrix(extractNodesJoined(nodes, edges).length, "minimal")

    nodes.forEach((sourceNode, i) => {
        nodes.forEach((targetNode, j) => {
            const matchingEdge = edges.find((edge) => edge.source === sourceNode.id && edge.target === targetNode.id)
            matrix[i][j] = matchingEdge?.data?.label ?? matrix[i][j] ?? Infinity
        })
    })

    return matrix
}

export function getMatrixN(t, nodeLabels, k) {
    const matrix = t.map((row) => [...row])
    const explanations = []

    for (let i = 0; i < t.length; i++) {
        for (let j = 0; j < t.length; j++) {
            if (matrix[i][k] !== Infinity && matrix[k][j] !== Infinity) {
                const w = matrix[i][k] + matrix[k][j]
                const v = Math.min(w, matrix[i][j])
                explanations.push({
                    input: nodeLabels[i],
                    mid: nodeLabels[k],
                    output: nodeLabels[j],
                    vik: matrix[i][k],
                    vkj: matrix[k][j],
                    vij1: matrix[i][j],
                    w,
                    vij2: v,
                })
                matrix[i][j] = v
            }
        }
    }

    return { matrix, explanations }
}

export function getPathIndexes(matrix1, matrixN) {
    const matrix1Transposed = transposeMatrix(matrix1)
    const matrixNTransposed = transposeMatrix(matrixN)

    return findMinimum(matrix1Transposed, matrixNTransposed)
}

function findMinimum(matrix1Transposed, matrixNTransposed) {
    const matrixLength = matrix1Transposed.length
    let index = matrixNTransposed.length - 1
    let foundRow = false
    const minPath = []
    // Use counter to avoid infinite loop
    let counter = matrixLength

    while (counter >= 0) {
        foundRow = false
        minPath.push(index)

        if (matrix1Transposed[index][0] === matrixNTransposed[index][0]) {
            minPath.push(0)
            break // Break the loop when the path is found
        }

        for (let i = 0; i < matrixLength && !foundRow; i++) {
            const costFrom1 = matrix1Transposed[index][i]
            const costFromN = matrixNTransposed[i][0]

            if (costFrom1 !== Infinity) {
                if (matrixNTransposed[index][0] === costFrom1 + costFromN) {
                    index = i
                    foundRow = true
                }
            }
        }
        counter--
    }
    return minPath
}
