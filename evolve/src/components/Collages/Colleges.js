import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../Header/Header";
import { fetchProfDoc, fetchStudentDoc, getAllColleges } from '../../backend/firebase.utils'
import { Footer } from "../Footer/Footer";

export function Colleges({ isCurrentUser = false, isStudent = false }) {
    const { uid } = useParams()
    const [colleges, setColleges] = useState([])
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

        getAllColleges()
            .then((res) => {
                setColleges(res?.docs)
            })
            .catch((err) => {
                alert(err)
            })

    }, [uid, isStudent, token])

    return <div>
        <Header isUser={isUser} uid={uid} isStudent={isStudent} />
        all colleges page
        {colleges?.map((college) => {
            const collegeData = college?.data();
            return <h1 key={collegeData?.id}>{collegeData?.id}</h1>
        })}
        <Footer />
    </div>
}