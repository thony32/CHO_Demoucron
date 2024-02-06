function transposeMatrix(matrice) {
    let tailleMatrice = matrice.length
    let transposedMat = []
    for (var i = 0; i < tailleMatrice; i++) {
        transposedMat[i] = new Array(tailleMatrice)
    }
    matrice.forEach((row, i) => {
        row.forEach((cell, j) => {
            transposedMat[j][i] = cell
        })
    })
    return transposedMat
}

export default transposeMatrix