import { Button } from "@material-ui/core";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchStudentDoc, signStudentOut } from '../../backend/firebase.utils'

export function Student() {
    const { uid } = useParams();
    const [data, setData] = useState({})
    const token = window.localStorage.getItem("token");

    const signOut = () => {
        signStudentOut(uid)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                alert(err)
            })
        window.location.href = '/signin'
    }

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
        this is the student page
        <Button onClick={() => signOut()} >Sign Out</Button>
    </h1>
}