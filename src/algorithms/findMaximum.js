function findMaximum(matriceInitialeTransposed, matriceMaxTransposed) {
    let tailleMatrice = matriceInitialeTransposed.length
    let index = matriceMaxTransposed.length - 1
    let trouve = false
    //trouveRow: pour verifier si on trouve le sommet precedente
    let trouveRow = false
    let cheminMax = []
    //compteur pour eviter la boucle infini
    let compteur = tailleMatrice

    while (!trouve && compteur >= 0) {
        trouveRow = false
        cheminMax.push(index)
        if (matriceInitialeTransposed[index][0] == matriceMaxTransposed[index][0]) {
            cheminMax.push(0)
            trouve = true
        }
        for (var i = 0; i < tailleMatrice && !trouveRow; i++) {
            if (matriceInitialeTransposed[index][i] != Number.NEGATIVE_INFINITY) {
                if (matriceMaxTransposed[index][0] == matriceInitialeTransposed[index][i] + matriceMaxTransposed[i][0]) {
                    index = i
                    trouveRow = true
                }
            }
        }
        compteur--
    }
    return cheminMax
}

export default findMaximum