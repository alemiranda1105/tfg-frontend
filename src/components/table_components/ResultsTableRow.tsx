/* Private interface */
interface ResultTableRowProps {
    name: string,
    result: number
}

export function ResultTableRow({name, result}: ResultTableRowProps) {
    return (
        <>
            <tr>
                <th className="bg-gray-400">{name}</th>
            </tr>
            <tr>
                <td>{result}</td>
            </tr>
        </>
    )
}