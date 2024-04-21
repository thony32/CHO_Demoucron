import { create } from "zustand"
import { addEdge, applyNodeChanges, applyEdgeChanges, updateEdge } from "reactflow"

const useStore = create((set, get) => ({
    vertexCount: 2,
    nodes: [],
    edges: [],
    minimum: true,
    maximum: false,
    setMinimum: (value) => {
        set({ minimum: value })
    },
    setMaximum: (value) => {
        set({ maximum: value })
    },
    setVertexCount: (count) => {
        set({ vertexCount: count })
    },
    setNodes: (nodes) => {
        set({ nodes })
    },
    setEdges: (edges) => {
        set({ edges })
    },
    onNodesChange: (changes) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        })
    },
    onEdgesChange: (changes) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        })
    },
    onConnect: (connection) => {
        set({
            edges: addEdge(connection, get().edges),
        })
    },
    onEdgeUpdate: (prevEdge, newConnection) => {
        set({
            edges: updateEdge(prevEdge, newConnection, get().edges),
        })
    },
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node],
        })
    },
    editNodeLabel: (id, name) => {
        set({
            nodes: get().nodes.map((node) => {
                if (node.id === id) {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            label: name,
                        },
                    }
                }
                return node
            }),
        })
    },
    addEdge: (edge) => {
        set({
            edges: [...get().edges, edge],
        })
    },
    customUpdateEdge: (prevEdge, newConnection) => {
        set({
            edges: updateEdge(prevEdge, newConnection, get().edges),
        })
    },
    updateNodesColor: (pathNodes) => {
        set({
            nodes: get().nodes.map((node) => {
                if (pathNodes.some((pathNode) => pathNode.id === node.id)) {
                    node.style = {
                        ...node.style,
                        backgroundColor: "#16a600",
                        border: "1px solid #16a600",
                    }
                } else {
                    node.style = {
                        ...node.style,
                        backgroundColor: "#fff",
                        border: "1px solid #000",
                    }
                }
                return node
            }),
        })
    },
    resetGraph: () => {
        set({
            nodes: [],
        })
        set({
            edges: [],
        })
    },
}))

export default useStore
