import React, { useEffect } from "react"
import cytoscape from "cytoscape"
import CytoscapeComponent from "react-cytoscapejs"
import CytoscapeDomNode from "cytoscape-dom-node"
import edgehandles from "cytoscape-edgehandles"
import contextMenus from "cytoscape-context-menus"
import "cytoscape-context-menus/cytoscape-context-menus.css"
import { creationMatrice } from "../util/fonctionMatriciel"

cytoscape.use(CytoscapeDomNode)
cytoscape.use(edgehandles)
cytoscape.use(contextMenus)

const GraphEditer = React.forwardRef((props, ref) => {
    var cy1 = null
    let eh = null
    const stylesheet = [
        // the stylesheet for the graph
        {
            selector: "node",
            style: {
                "background-color": "#666",
                "text-valign": "center",
                "text-halign": "center",
                label: "data(label)",
            },
        },
        {
            selector: "node[debut = 1], node[fin = 1]",
            style: {
                "background-color": "#1130f5",
            },
        },
        {
            selector: "node[chemin = 1]",
            style: {
                "background-color": "#903010",
            },
        },
        {
            selector: "edge",
            style: {
                width: 3,
                "line-color": "#ccc",
                "target-arrow-color": "#ccc",
                "target-arrow-shape": "triangle",
                "curve-style": "bezier",
                label: "data(label)",
            },
        },
        {
            selector: "edge[chemin = 1]",
            style: {
                "line-color": "#903010",
                "target-arrow-color": "#903010",
            },
        },
    ]

    var options = {
        // Customize event to bring up the context menu
        // Possible options https://js.cytoscape.org/#events/user-input-device-events
        evtType: "cxttap",
        // List of initial menu items
        // A menu item must have either onClickFunction or submenu or both
        menuItems: [
            {
                id: "changeValeur",
                content: "change valeur",
                tooltipText: "change valeur",
                selector: "edge",
                onClickFunction: function (edge) {
                    var val = parseInt(prompt("Valeur ?"))
                    if (val == null || isNaN(val)) val = 1
                    edge.target.data("label", val)

                    //suppression chemin lors d' un changement de donne
                    if (edge.cy.elements("[chemin = 1]").length != 0) {
                        edge.cy.elements("[chemin = 1]").data("chemin", 0)
                    }
                },
                disabled: false,
            },
            {
                id: "remove",
                content: "remove",
                tooltipText: "remove",
                image: { src: "assets/remove.svg", width: 12, height: 12, x: 6, y: 4 },
                selector: "edge",
                onClickFunction: function (event) {
                    var target = event.target || event.cyTarget
                    var removed = target.remove()

                    //supprssion chemin lors d' un suppression d' un arc
                    if (event.cy.elements("[chemin = 1]").length != 0) {
                        event.cy.elements("[chemin = 1]").data("chemin", 0)
                    }
                },
                hasTrailingDivider: true,
            },
            {
                //suppression d' un sommet
                id: "removeNode",
                content: "Supprimer",
                tooltipText: "Supprimer",
                image: { src: "assets/remove.svg", width: 12, height: 12, x: 6, y: 4 },
                selector: "node[fin = 1][id>2]",
                onClickFunction: function (event) {
                    var target = event.target || event.cyTarget
                    //recuperation de l'id de l' avant dernier sommet
                    var lastNodeId = parseInt(target.data("id")) - 1
                    //affectation de l' avant dernier sommet comme fin;
                    event.target
                        .cy()
                        .nodes("node#" + lastNodeId)
                        .data("fin", 1)
                    //suppression de la dernier sommet
                    target.remove()
                    //suppression des axes qui a un source sur l' avant dernier fin
                    event.target
                        .cy()
                        .edges('[source = "' + lastNodeId + '"]')
                        .remove()

                    //suppression chemin lors d' un suppression d' un sommet
                    if (event.cy.elements("[chemin = 1]").length != 0) {
                        event.cy.elements("[chemin = 1]").data("chemin", 0)
                    }
                },
                hasTrailingDivider: true,
            },
        ],
        // css classes that menu items will have
        menuItemClasses: [
            // add class names to this list
        ],
        // css classes that context menu will have
        contextMenuClasses: [
            // add class names to this list
        ],
        // Indicates that the menu item has a submenu. If not provided default one will be used
        submenuIndicator: { src: "assets/submenu-indicator-default.svg", width: 12, height: 12 },
    }

    //parametre de edge handler
    let defaults = {
        canConnect: function (sourceNode, targetNode) {
            // whether an edge can be created between source and target
            return !sourceNode.same(targetNode) && sourceNode.edgesTo(targetNode).length == 0 && targetNode.edgesTo(sourceNode).length == 0 && targetNode.data("debut") != 1 && sourceNode.data("fin") != 1 // e.g. disallow loops
            // return false;
        },
        edgeParams: function (sourceNode, targetNode) {
            // for edges between the specified source and target
            // return element object to be passed to cy.add() for edge
            return { data: { id: sourceNode.data("id") + "to" + targetNode.data("id"), source: sourceNode.data("id"), target: targetNode.data("id") } }
            // return {}
        },
        hoverDelay: 150, // time spent hovering over a target node before it is considered selected
        snap: true, // when enabled, the edge can be drawn by just moving close to a target node (can be confusing on compound graphs)
        snapThreshold: 50, // the target node must be less than or equal to this many pixels away from the cursor/finger
        snapFrequency: 15, // the number of times per second (Hz) that snap checks done (lower is less expensive)
        noEdgeEventsInDraw: true, // set events:no to edges during draws, prevents mouseouts on compounds
        disableBrowserGestures: true, // during an edge drawing gesture, disable browser gestures such as two-finger trackpad swipe and pinch-to-zoom
    }
    var drawOn = () => {
        if (eh !== null) {
            eh.enableDrawMode()
        }
    }
    var drawOff = () => {
        if (eh !== null) {
            eh.disableDrawMode()
        }
    }

    let colorChemin = (chemin) => {
        if (cy1 != null) {
            var i
            for (i = 1; i < chemin.length - 1; i++) {
                cy1.elements("node#" + chemin[i]).data("chemin", 1)
                cy1.elements('edge[source = "' + chemin[i] + '"][target = "' + chemin[i - 1] + '"]').data("chemin", 1)
            }
            cy1.elements('edge[source = "' + chemin[i] + '"][target = "' + chemin[i - 1] + '"]').data("chemin", 1)
        }
    }

    let decolorChemin = () => {
        if (cy1 != null && cy1.elements("[chemin = 1]").length != 0) {
            cy1.elements("[chemin = 1]").data("chemin", 0)
        }
    }

    var creationNodes = (nombreSommet) => {
        if (cy1 !== null) {
            cy1.remove(cy1.elements())
            //creation d' un sommet x1 debut
            cy1.add({
                data: { id: 1, label: "X1", debut: 1 },
                position: { x: 50, y: 10 },
            })
            var i = 2
            for (i = 2; i < nombreSommet; i++) {
                cy1.add({
                    data: { id: i, label: "X" + i },
                    position: { x: i * 50, y: 10 },
                })
            }
            //creation dernier sommet fin
            cy1.add({
                data: { id: i, label: "X" + i, fin: 1 },
                position: { x: i * 50, y: 10 },
            })
        }
    }

    var creationGraphParDefault = () => {
        cy1.remove(cy1.elements())
        cy1.add([
            { data: { id: 1, label: "X1", debut: 1 }, position: { x: 50, y: 150 } },
            { data: { id: 2, label: "X2" }, position: { x: 180, y: 60 } },
            { data: { id: 3, label: "X3" }, position: { x: 320, y: 150 } },
            { data: { id: 4, label: "X4" }, position: { x: 220, y: 220 } },
            { data: { id: 5, label: "X5" }, position: { x: 420, y: 60 } },
            { data: { id: 6, label: "X6", fin: 1 }, position: { x: 520, y: 150 }, fin: true },
            { data: { id: "1to2", source: "1", target: "2", label: "3", value: 3 } },
            { data: { id: "1to3", source: "1", target: "3", label: "8", value: 8 } },
            { data: { id: "1to4", source: "1", target: "4", label: "6", value: 6 } },
            { data: { id: "2to4", source: "2", target: "4", label: "2", value: 2 } },
            { data: { id: "2to5", source: "2", target: "5", label: "6", value: 6 } },
            { data: { id: "3to5", source: "3", target: "5", label: "1", value: 1 } },
            { data: { id: "4to3", source: "4", target: "3", label: "2", value: 2 } },
            { data: { id: "4to6", source: "4", target: "6", label: "7", value: 7 } },
            { data: { id: "5to6", source: "5", target: "6", label: "2", value: 2 } },
        ])
    }

    var recuperationMatrice = (valeurParDefaut) => {
        var matrice = []
        if (cy1 !== null) {
            var elements = cy1.elements()
            var nodes = []
            var edges = []
            elements.map((element) => {
                if (element.group() == "nodes") {
                    nodes.push(element.data())
                } else if (element.group() == "edges") {
                    edges.push(element.data())
                }
            })
            var tailleMatrice = nodes.length
            var i, j
            matrice = creationMatrice(tailleMatrice, valeurParDefaut)
            edges.map((edge) => {
                i = parseInt(edge.source, 10) - 1
                j = parseInt(edge.target, 10) - 1
                matrice[i][j] = parseInt(edge.label, 10)
            })
        }
        return matrice
    }

    useEffect(() => {
        cy1.on("ehcomplete", (event, sourceNode, targetNode, addedEdge) => {
            let val = parseInt(prompt("valeur?"))
            if (val == null || isNaN(val)) val = 1
            addedEdge.data("label", val)
            //suppression chemin lors d' un changement de donne
            if (event.cy.elements("[chemin = 1]").length != 0) {
                event.cy.elements("[chemin = 1]").data("chemin", 0)
            }
        })
        cy1.minZoom(0.5)
        cy1.maxZoom(2)

        //ajout d' un nodes en double Click
        cy1.on("dbltap", (event) => {
            //id == undefined => double click sur la background
            if (event.target.data("id") == undefined) {
                //suppression chemin lors d' un changement de donne
                if (event.cy.elements("[chemin = 1]").length != 0) {
                    event.cy.elements("[chemin = 1]").data("chemin", 0)
                }
                idNewNode = idLastNode + 1
                var idLastNode = event.target.elements("node").length
                var idNewNode = idLastNode + 1
                event.cy.elements("node#" + idLastNode).data("fin", 0)
                event.cy.add({ data: { id: idNewNode, label: "X" + idNewNode, fin: 1 }, position: { x: event.position.x, y: event.position.y } })
            }
        })
    }, [0])

    return (
        <>
            <div className="cytsocapteContainer">
                <div className="ct-btn-container">
                    <button onClick={creationGraphParDefault}>Graphe par defaut</button>
                    <button id="draw-on" onClick={drawOn}>
                        Draw mode on
                    </button>
                    <button id="draw-off" onClick={drawOff}>
                        Draw mode off
                    </button>
                </div>
                <CytoscapeComponent
                    elements={[]}
                    style={{ width: "100%", height: "400px" }}
                    stylesheet={stylesheet}
                    recuperationMatrice={recuperationMatrice}
                    colorChemin={colorChemin}
                    creationNodes={creationNodes}
                    decolorChemin={decolorChemin}
                    cy={(cy) => {
                        cy1 = cy
                        cy.contextMenus(options)
                        eh = cy.edgehandles(defaults)
                        console.log("cyto")
                    }}
                    ref={ref}
                />
            </div>
        </>
    )
})
const GraphEditerPur = React.memo(GraphEditer)
export default GraphEditerPur
