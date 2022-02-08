import { MethodInterface } from "./MethodsTableComponent";

interface MethodDetailsProps {
    method: MethodInterface
}

export const MethodDetailsComponent = ({method}: MethodDetailsProps) => {
    return (
        <div className="flex flex-col">
            <h3>Nombre</h3>
            <h4>{method.name}</h4>
            <h3>Descripción</h3>
            <h4>{method.info}</h4>
            <h3>Link de la publicación</h3>
            <h4>{method.link}</h4>
            <h3>Resultados:</h3>
            <h4>f1_score: {method.results[0].f1_score}</h4>
            <h4>recall_score: {method.results[1].recall_score}</h4>
            <h4>precision_score: {method.results[2].precision_score}</h4>
        </div>
    )
}