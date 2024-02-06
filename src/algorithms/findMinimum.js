function findMinimum(matriceInitialeTransposed, matriceMinTransposed) {
   let tailleMatrice = matriceInitialeTransposed.length
   let index = matriceMinTransposed.length - 1
   let trouve = false
   //trouveRow: pour verifier si on trouve le sommet precedente
   let trouveRow = false
   let cheminMin = []
   //compteur pour eviter la boucle infini
   let compteur = tailleMatrice

   while (!trouve && compteur >= 0) {
       trouveRow = false
       cheminMin.push(index)
       if (matriceInitialeTransposed[index][0] == matriceMinTransposed[index][0]) {
           cheminMin.push(0)
           trouve = true
       }
       for (var i = 0; i < tailleMatrice && !trouveRow; i++) {
           if (matriceInitialeTransposed[index][i] != Infinity) {
               if (matriceMinTransposed[index][0] == matriceInitialeTransposed[index][i] + matriceMinTransposed[i][0]) {
                   index = i
                   trouveRow = true
               }
           }
       }
       compteur--
   }
   return cheminMin
}

export default findMinimum