

export function extractMatrix(n, type) {
	if (typeof n !== "number" || n <= 0) {
		return [];
	}

	return Array.from({ length: n }, () =>
		Array.from({ length: n }, () => (type === "maximal" ? 0 : +Infinity))
	);
}

export function extractNodesJoined(nodes, edges) {
	const nodesJoined = nodes.filter((node) => {
		return edges.some(
			(edge) => edge.source === node.id || edge.target === node.id
		);
	});

	const nodeOutput = edges.find(
		(edge) => !edges.some((e) => e.source === edge.target)
	)?.target;

	if (nodeOutput) {
		const index = nodesJoined.findIndex((node) => node.id === nodeOutput);
		if (index !== -1) {
			const removedNode = nodesJoined.splice(index, 1)[0];
			nodesJoined.push(removedNode);
		}
	}

	return nodesJoined;
}

export function verifyEdgeLabel(edges) {
	return edges.every((edge) => edge.data?.label) && edges.length > 0;
}

export function verifyNodesOutput(edges) {
	const uniqueTargets = edges
		.map((edge) => edge.target)
		.filter((target, index, array) => array.indexOf(target) === index);

	const uniqueTargetsNotInSources = uniqueTargets.filter(
		(target) => !edges.some((edge) => edge.source === target)
	);

	return uniqueTargetsNotInSources;
}

export function transposeMatrix(matrix) {
	const transposedMat = [];
	for (let i = 0; i < matrix.length; i++) {
		transposedMat[i] = new Array(matrix.length);
	}
	matrix.forEach((row, i) => {
		row.forEach((cell, j) => {
			transposedMat[j][i] = cell;
		});
	});
	return transposedMat;
}

export function getPathNodes(indexes, nodes) {
	return nodes.filter((_node, index) => indexes.includes(index));
}

export function getPathEdges(indexes, nodes, edges) {
	const pathEdges = [];

	for (let i = 1; i < indexes.length; i++) {
		const edgeId = `reactflow__edge-${nodes[indexes[i]].id}-${nodes[indexes[i - 1]].id}`;
		const foundedEdge = edges.find((edge) => edge.id === edgeId);

		foundedEdge && pathEdges.unshift(foundedEdge);
	}

	return pathEdges;
}