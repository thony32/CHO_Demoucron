import { copyMatrix, transposeMatrix } from './utils'
import { findMinimum } from '.'

async function demoucronMin(matrice1) {
    let demarche = []
    let matrice = await copyMatrix(matrice1)
    let matriceInitialeTransposed = transposeMatrix(matrice1)
    // console.log(matrice);
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
        a_changee = []
        lastMatrice = await copyMatrix(matrice)

        for (var i = 0; i < tailleMatrice; i++) {
            if (matrice[i][k] !== Infinity) {
                entree.push(i)
            }
            if (i == k) {
                for (var j = 0; j < tailleMatrice; j++) {
                    if (matrice[i][j] !== Infinity) {
                        sortie.push(j)
                    }
                }
            }
        }
        entree.map((i) => {
            w[i] = []
            sortie.map((j) => {
                w[i][j] = matrice[i][k] + matrice[k][j]
                matrice[i][j] = w[i][j] <= matrice[i][j] ? w[i][j] : matrice[i][j]
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
    let cheminMin = undefined
    if (Number.isFinite(matrice[0][tailleMatrice - 1])) {
        let matriceMinTransposed = transposeMatrix(matrice)
        cheminMin = findMinimum(matriceInitialeTransposed, matriceMinTransposed)
    }
    return {
        cheminMin: cheminMin,
        demarche: demarche,
    }
}

export default demoucronMin