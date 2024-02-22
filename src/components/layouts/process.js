import React from "react"

const Process = () => {
    return (
        <div className="col-span-3 flex items-center justify-center bg-red-200">
            <div className="bg-white px-4 py-8 h-screen overflow-auto scrollbar w-full">
                <h1 className="text-3xl text-center font-extrabold uppercase mb-6">Démarche</h1>
                {/* Map values */}
                <div className="space-y-8 border py-4 px-2 rounded-lg">
                    <h1 className="text-xl font-bold text-primary italic">Pour k = <span className="text-red-500">valeur</span></h1>
                    <div className="space-y-6">
                        <h1 className="text-xl text-center font-bold bg-gray-200 py-2 rounded-full">
                            Matrice D<sub>1</sub>
                        </h1>
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th className="text-lg">1</th>
                                    <th className="text-lg">1</th>
                                    <th className="text-lg">1</th>
                                    <th className="text-lg">1</th>
                                    <th className="text-lg">1</th>
                                    <th className="text-lg">1</th>
                                    <th className="text-lg">1</th>
                                    <th className="text-lg">1</th>
                                    <th className="text-lg">1</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                <tr>
                                    <th className="text-lg">1</th>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                </tr>
                                {/* row 2 */}
                                <tr>
                                    <th className="text-lg">2</th>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>+&infin;</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td className="text-error">1</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                </tr>
                                {/* row 3 */}
                                <tr>
                                    <th className="text-lg">1</th>
                                    <td>3</td>
                                    <td>5</td>
                                    <td>7</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <th className="text-lg">1</th>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                </tr>
                                {/* row 2 */}
                                <tr>
                                    <th className="text-lg">2</th>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>-&infin;</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                </tr>
                                {/* row 3 */}
                                <tr>
                                    <th className="text-lg">1</th>
                                    <td>3</td>
                                    <td>5</td>
                                    <td>7</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Process
