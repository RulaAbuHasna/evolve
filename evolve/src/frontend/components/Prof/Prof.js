import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchProfDoc } from '../../../backend/firebase.utils'
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";

export function Prof() {
    const { uid, profid } = useParams();
    const [data, setData] = useState({})
    const [isUser, setIsUser] = useState(false)
    const token = window.localStorage.getItem("token");

    useEffect(() => {
        fetchProfDoc(uid, token)
            .then((res) => {
                setData(res)
                setIsUser(true)
            })
            .catch((err) => {
                alert(err)
                window.location.href = '/home'
            })
    }, [uid, token])

    return <div>
        <Header isUser={isUser} uid={uid} isStudent={false} />
        prof page
        <Footer />
    </div>
}