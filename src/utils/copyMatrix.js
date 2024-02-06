async function copyMatrix(matrice1) {
    let matrice = []
    for (var i = 0; i < matrice1.length; i++) {
        matrice[i] = []
        for (var j = 0; j < matrice1.length; j++) {
            matrice[i][j] = matrice1[i][j]
        }
    }
    return [...matrice]
}

export default copyMatrix
