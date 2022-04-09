import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchProfDoc, fetchStudentDoc } from '../../../backend/firebase.utils'
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import Profile from './Profile/Profile'

export function Prof({ isCurrentUser = false, isStudent }) {
    const { uid, profid } = useParams();
    const [data, setData] = useState({})
    const [isUser, setIsUser] = useState(isCurrentUser)
    const token = window.localStorage.getItem("token");

    useEffect(() => {
        if (!uid) return
        isStudent ?
            fetchStudentDoc(uid, token)
                .then((res) => {
                    setData(res.data)
                    setIsUser(res.isLoggedIn)
                })
                .catch((err) => {
                    alert(err)
                    window.location.href = '/home'
                })
            :
            fetchProfDoc(uid, token)
                .then((res) => {
                    setData(res.data)
                    setIsUser(res.isLoggedIn)
                })
                .catch((err) => {
                    alert(err)
                    window.location.href = '/home'
                })

    }, [uid, token, profid, isStudent])
    //CHECK IF THE USER IS PROF && === PERSONAL ACOUNT 

    return <div>
        <Header isUser={isUser} uid={uid} isStudent={isStudent} />
        {!profid && <Profile data={data} />}
        <Footer />
    </div>
}