// utils.js
export const copyMatrix = (matrix) => matrix.map((row) => [...row]);
export const transposeMatrix = (matrix) => matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));

// min.js
export const findMinimumPath = (initialMatrix, minMatrix) => {
  const matrixSize = initialMatrix.length;
  let currentRow = minMatrix.length - 1;
  const minPath = [];

  while (currentRow >= 0) {
    minPath.push(currentRow);

    if (initialMatrix[currentRow][0] === minMatrix[currentRow][0]) {
      minPath.push(0);
      break;
    }

    const nextRow = initialMatrix[currentRow].findIndex(
      (value, col) =>
        value !== Infinity &&
        minMatrix[currentRow][0] === value + minMatrix[col][0]
    );

    if (nextRow === -1) {
      currentRow--;
    } else {
      currentRow = nextRow;
    }
  }

  return minPath.reverse();
};

export const Minimum = async (matrix) => {
  const steps = [];
  const matrixSize = matrix.length;
  const transposedInitialMatrix = transposeMatrix(matrix);
  let currentMatrix = await copyMatrix(matrix);

  for (let k = 1; k < matrixSize - 1; k++) {
    const lastMatrix = await copyMatrix(currentMatrix);
    const inputNodes = [];
    const outputNodes = [];
    const changedNodes = [];

    for (let i = 0; i < matrixSize; i++) {
      if (currentMatrix[i][k] !== Infinity) {
        inputNodes.push(i);
      }

      if (i === k) {
        for (let j = 0; j < matrixSize; j++) {
          if (currentMatrix[i][j] !== Infinity) {
            outputNodes.push(j);
          }
        }
      }
    }

    for (const i of inputNodes) {
      for (const j of outputNodes) {
        const newValue = currentMatrix[i][k] + currentMatrix[k][j];
        const oldValue = currentMatrix[i][j];
        if (newValue < oldValue) {
          currentMatrix[i][j] = newValue;
          changedNodes.push([i, j]);
        }
      }
    }

    steps.push({
      k,
      lastMatrix,
      currentMatrix,
      changedNodes,
      inputNodes,
      outputNodes,
    });
  }

  let minPath;
  if (Number.isFinite(currentMatrix[0][matrixSize - 1])) {
    const minTransposedMatrix = transposeMatrix(currentMatrix);
    minPath = findMinimumPath(transposedInitialMatrix, minTransposedMatrix);
  }

  return { minPath, steps };
};

