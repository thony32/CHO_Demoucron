/**
 * Transposes a given matrix.
 * @param {number[][]} matrix - The input matrix.
 * @returns {number[][]} The transposed matrix.
 */

export const transposeMatrix = (matrix) => {
    const matrixSize = matrix.length
    const transposedMatrix = matrix[0].map(() => new Array(matrixSize).fill(0))

    for (let row = 0; row < matrixSize; row++) {
        for (let col = 0; col < matrixSize; col++) {
            transposedMatrix[col][row] = matrix[row][col]
        }
    }

    return transposedMatrix
}

/**
 * Creates a square matrix of a given size and initializes it with a default value.
 * @param {number} size - The size of the matrix.
 * @param {number} defaultValue - The default value to initialize the matrix with.
 * @returns {number[][]} The created matrix.
 */

export const createMatrix = (size, defaultValue) => {
    const matrix = new Array(size).fill(0).map(() => new Array(size).fill(defaultValue))
    return matrix
}

/**
 * Creates a deep copy of a given matrix.
 * @param {number[][]} matrix - The input matrix to be copied.
 * @returns {number[][]} A deep copy of the input matrix.
 */

export const copyMatrix = async (matrix) => {
    const copiedMatrix = matrix.map((row) => [...row])
    return copiedMatrix
}
