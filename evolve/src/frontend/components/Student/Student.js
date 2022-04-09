import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchStudentDoc } from '../../../backend/firebase.utils'
import { Footer } from "../Footer/Footer";
import { Header } from '../Header/Header'
import Profile from "./Profile/Profile";
import { StudentContext } from "../../shared/Context";

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

    return <StudentContext.Provider value={data}>
        <Header isUser={isUser} isStudent={true} uid={uid} />
        <Profile />
        <Footer />
    </StudentContext.Provider>


}