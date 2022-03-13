import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../Header/Header";
import { fetchProfDoc, fetchStudentDoc } from '../../backend/firebase.utils'
import { Footer } from "../Footer/Footer";

export function Profs({ isCurrentUser = false, isStudent = false }) {
    const { uid } = useParams()
    const [data, setData] = useState({})
    const [isUser, setIsUser] = useState(isCurrentUser)
    const token = window.localStorage.getItem("token");

    useEffect(() => {
        if (uid) {
            isStudent ?
                fetchStudentDoc(uid, token)
                    .then((res) => {
                        setData(res)
                        setIsUser(true)
                    })
                    .catch((err) => alert(err))
                :
                fetchProfDoc(uid, token)
                    .then((res) => {
                        setData(res)
                        setIsUser(true)
                    }).catch((err) => alert(err))
        }

    }, [uid, isStudent, token])

    return <div>
        <Header isUser={isUser} uid={uid} isStudent={isStudent} />
        all profs page
        <Footer />
    </div>
}