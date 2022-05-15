import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchProfDoc, fetchStudentDoc } from '../../../backend/firebase.utils'
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import Profile from './Profile/Profile'
import ProfPage from "./ProfPage/ProfPage";

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

    return <div>
        <Header isUser={isUser} uid={uid} isStudent={isStudent} />
        {!profid && <Profile data={data} />}
        {profid && <ProfPage curProfData={data} isStudent={isStudent} />}
        <Footer />
    </div>
}