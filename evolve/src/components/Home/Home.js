import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../Header/Header";
import { Sidebar } from '../Sidebar/Sidebar'
import { fetchProfDoc, fetchStudentDoc } from '../../backend/firebase.utils'

export function HomePage({ isCurrentUser = false, isStudent = false }) {
    const { uid } = useParams()
    const [data, setData] = useState({})
    const [isUser, setIsUser] = useState(isCurrentUser)
    const token = window.localStorage.getItem("token");

    useEffect(() => {
        if (isUser) {
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

    }, [])

    return <div>
        <Header isUser={isUser} isStudent={isStudent} uid={uid} />
        <div className="flex flex-row">
            <Sidebar />
        </div>
    </div>
}