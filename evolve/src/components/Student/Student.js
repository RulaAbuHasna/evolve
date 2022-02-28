import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchStudentDoc } from '../../backend/firebase.utils'

export function Student() {
    const { uid } = useParams();
    const [data, setData] = useState({})
    const token = window.localStorage.getItem("token");

    useEffect(() => {
        fetchStudentDoc(uid, token)
            .then((res) => {
                setData(res)
            })
            .catch((err) => {
                alert(err)
            })
    }, [uid, token])

    return <h1>
        {data}
        this is the student page
    </h1>
}