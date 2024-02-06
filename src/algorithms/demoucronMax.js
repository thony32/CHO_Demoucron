import { copyMatrix, transposeMatrix } from "./utils"
import { findMaximum } from "."

async function demoucronMax(matrice1) {
    //pour enregistrer chaque demarche de demoucron
    let demarche = []

    let matrice = await copyMatrix(matrice1)
    let matriceInitialeTransposed = transposeMatrix(matrice1)
    const tailleMatrice = matrice.length
    let w = []
    let entree = []
    let sortie = []
    let lastMatrice = []
    let currentMatrice = []
    let a_changee = []

    for (var k = 1; k < tailleMatrice - 1; k++) {
        entree = []
        sortie = []
        w = []
        //pour enregistrer les cellules qui ont ete changee - utilisation css
        a_changee = []
        lastMatrice = await copyMatrix(matrice)
        //detection des entrees et sortie
        for (var i = 0; i < tailleMatrice; i++) {
            if (matrice[i][k] !== Number.NEGATIVE_INFINITY) {
                entree.push(i)
            }
            if (i == k) {
                for (var j = 0; j < tailleMatrice; j++) {
                    if (matrice[i][j] !== Number.NEGATIVE_INFINITY) {
                        sortie.push(j)
                    }
                }
            }
        }
        entree.map((i) => {
            w[i] = []
            sortie.map((j) => {
                w[i][j] = matrice[i][k] + matrice[k][j]
                matrice[i][j] = w[i][j] >= matrice[i][j] ? w[i][j] : matrice[i][j]
                a_changee.push([i, j])
            })
        })
        currentMatrice = await copyMatrix(matrice)
        demarche.push({
            k: k,
            lastMatrice: lastMatrice,
            currentMatrice: currentMatrice,
            a_changee: a_changee,
            entree: entree,
            sortie: sortie,
            w: w,
        })
    }
    let cheminMax = undefined
    if (Number.isFinite(matrice[0][tailleMatrice - 1])) {
        let matriceMaxTransposed = transposeMatrix(matrice)
        cheminMax = findMaximum(matriceInitialeTransposed, matriceMaxTransposed)
    }
    return {
        demarche: demarche,
        cheminMax: cheminMax,
    }
}

export default demoucronMax
