import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../Header/Header";
import { fetchProfDoc, fetchStudentDoc, getAllProfs } from '../../backend/firebase.utils'
import { Footer } from "../Footer/Footer";

export function Profs({ isCurrentUser = false, isStudent = false }) {
    const { uid } = useParams()
    const [profs, setProfs] = useState([])
    const [isUser, setIsUser] = useState(isCurrentUser)
    const token = window.localStorage.getItem("token");

    useEffect(() => {
        if (uid) {
            isStudent ?
                fetchStudentDoc(uid, token)
                    .then((res) => {
                        setIsUser(true)
                    })
                    .catch((err) => alert(err))
                :
                fetchProfDoc(uid, token)
                    .then((res) => {
                        setIsUser(true)
                    }).catch((err) => alert(err))
        }

        getAllProfs()
            .then((res) => {
                setProfs(res?.docs)
            })
            .catch((err) => {
                alert(err)
            })

    }, [uid, isStudent, token])

    return <div>
        <Header isUser={isUser} uid={uid} isStudent={isStudent} />
        all profs page
        {profs?.map((prof) => {
            const profData = prof.data();
            return <h1 key={profData.id}>{profData.id}</h1>
        })}
        <Footer />
    </div>
}