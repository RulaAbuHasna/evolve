import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchProfDoc } from '../../backend/firebase.utils'

export function Prof() {
    const { uid } = useParams();
    const [data, setData] = useState({})
    const token = window.localStorage.getItem("token");

    useEffect(() => {
        fetchProfDoc(uid, token)
            .then((res) => {
                setData(res)
            })
            .catch((err) => {
                console.log(err)
                alert(err)
                window.location.href = '/signin'
            })
    }, [uid, token])

    return <h1>
        {data}
        this is the professor page
    </h1>
}