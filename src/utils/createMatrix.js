function createMatrix(tailleMatrice, valeurParDefaut) {
    var matrice = []
    for (var i = 0; i < tailleMatrice; i++) {
        matrice[i] = []
        for (var j = 0; j < tailleMatrice; j++) {
            matrice[i][j] = valeurParDefaut
        }
    }
    return matrice
}

export default createMatrix