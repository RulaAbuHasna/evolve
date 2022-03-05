import { useEffect, useState } from "react"
import { Button } from "@material-ui/core";
import { useParams } from "react-router-dom"
import { fetchProfDoc, signProfOut } from '../../backend/firebase.utils'

export function Prof() {
    const { uid } = useParams();
    const [data, setData] = useState({})
    const token = window.localStorage.getItem("token");

    const signOut = () => {
        signProfOut(uid)
            .then(() => {
                window.location.href = '/signin'
            })
            .catch((err) => {
                alert(err)
            })

    }

    useEffect(() => {
        fetchProfDoc(uid, token)
            .then((res) => {
                setData(res)
            })
            .catch((err) => {
                alert(err)
                window.location.href = '/signin'
            })
    }, [uid, token])

    return <h1>
        this is the professor page
        <Button onClick={() => signOut()} >Sign Out</Button>
    </h1>
}