const findMaximum = (initialMatrix, maxMatrix) => {
    let matrixSize = initialMatrix.length
    let currentIndex = maxMatrix.length - 1
    let found = false
    let foundRow = false
    let maxPath = []
    let counter = matrixSize

    while (!found && counter >= 0) {
        foundRow = false
        maxPath.push(currentIndex)
        if (initialMatrix[currentIndex][0] === maxMatrix[currentIndex][0]) {
            maxPath.push(0)
            found = true
        }
        for (let i = 0; i < matrixSize && !foundRow; i++) {
            if (initialMatrix[currentIndex][i] !== Number.NEGATIVE_INFINITY) {
                if (maxMatrix[currentIndex][0] === initialMatrix[currentIndex][i] + maxMatrix[i][0]) {
                    currentIndex = i
                    foundRow = true
                }
            }
        }
        counter--
    }
    return maxPath
}

export default findMaximum
