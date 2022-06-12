import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../Header/Header";
import { Sidebar } from '../Sidebar/Sidebar'
import { fetchProfDoc, fetchStudentDoc } from '../../../backend/firebase.utils'
import { Footer } from "../Footer/Footer";

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

    }, [isStudent, isUser, token, uid])

    return <div>
        <Header isUser={isUser} isStudent={isStudent} uid={uid} />
        <div className="flex flex-row">
            <Sidebar isUser={isUser} isStudent={isStudent} uid={uid} />
            <div className="m-auto">
                <h1 className="text-5xl my-6 italic">Welcom<span className="text-red-500">e </span>To <span className="text-red-500">e</span>volve</h1>
                <p>A platform which provides base for colleges to conduct students online feedbacks.</p>
            </div>
        </div>
        <Footer />
    </div>
}