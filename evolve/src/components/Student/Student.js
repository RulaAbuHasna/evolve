import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchStudentDoc } from '../../backend/firebase.utils'
import { Footer } from "../Footer/Footer";
import { Header } from '../Header/Header'

export function Student() {
    const { uid } = useParams();
    const [data, setData] = useState({})
    const [isUser, setIsUser] = useState(false)
    const token = window.localStorage.getItem("token");

    useEffect(() => {
        fetchStudentDoc(uid, token)
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
        <Header isUser={isUser} isStudent={true} uid={uid} />
        this is the student profile page
        <Footer />
    </div>


}