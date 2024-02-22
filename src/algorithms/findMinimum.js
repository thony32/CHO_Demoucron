const findMinimum = (initialMatrix, minMatrix) => {
    const matrixSize = initialMatrix.length
    let currentIndex = minMatrix.length - 1
    let found = false
    let foundRow = false
    const minPath = []
    let counter = matrixSize

    while (!found && counter >= 0) {
        foundRow = false
        minPath.push(currentIndex)
        if (initialMatrix[currentIndex][0] === minMatrix[currentIndex][0]) {
            minPath.push(0)
            found = true
        }
        for (let i = 0; i < matrixSize && !foundRow; i++) {
            if (initialMatrix[currentIndex][i] !== Infinity) {
                if (minMatrix[currentIndex][0] === initialMatrix[currentIndex][i] + minMatrix[i][0]) {
                    currentIndex = i
                    foundRow = true
                }
            }
        }
        counter--
    }
    return minPath
}

export default findMinimum
