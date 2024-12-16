import {useParams} from 'react-router-dom'


export default function Alterar(){

    const { id } = useParams()

    return(
        <div>
            <h1>Página Alterar {id}</h1>
        </div>
    )
}