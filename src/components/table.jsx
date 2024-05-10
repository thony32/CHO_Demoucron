/* eslint-disable react/prop-types */
import { cn } from "../utils/cn"

const Table = ({ data, oldData, titles, k }) => {
    return (
        <>
            <div className="space-y-8 -z-[9999] py-4 px-2 rounded-lg">
                <div className="space-y-6">
                    <h1 className={`${k === 1 ? 'hidden' : ''} text-xl text-center font-bold bg-gray-200 py-2 rounded-full`}>
                        Matrice D<sub>{k}</sub>
                    </h1>
                    <table className="">
                        <thead>
                            <tr>
                                <th></th>
                                {titles.map((header, index) => (
                                    <th key={index} className="text-center text-lg px-4 py-2">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index}>
                                    <th className="px-4 py-2 text-center text-lg">{titles[index]}</th>
                                    {row.map((cell, colIndex) => (
                                        <td
                                            key={colIndex}
                                            className={cn("text-center border border-black px-3 font-semibold", oldData && cell != oldData[index][colIndex] && "text-blue-500")}>
                                            {cell === Infinity ? "+∞" : cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Table
