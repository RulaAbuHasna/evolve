import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProfDoc, fetchStudentDoc, getCollegeProfs } from '../../backend/firebase.utils'
import { ProfCard } from "../shared/ProfCard";
import { Input } from '@material-ui/core';

export function College({ isCurrentUser = false, isStudent = false }) {
    const { uid, colid } = useParams()
    const [profs, setProfs] = useState([])
    const [isUser, setIsUser] = useState(isCurrentUser)
    const token = window.localStorage.getItem("token");

    useEffect(() => {
        if (uid) {
            isStudent ?
                fetchStudentDoc(uid, token)
                    .then(() => {
                        setIsUser(true)
                    })
                    .catch((err) => alert(err))
                :
                fetchProfDoc(uid, token)
                    .then(() => {
                        setIsUser(true)
                    }).catch((err) => alert(err))
        }

        getCollegeProfs(colid)
            .then((res) => {
                setProfs(res?.docs)
            })
            .catch((err) => {
                alert(err)
            })

    }, [uid, isStudent, token, colid])

    return <div>
        <Header isUser={isUser} uid={uid} isStudent={isStudent} />
        <div className="flex flex-col items-center mt-16">
            <div className="w-1/5">
                <Input placeholder="Search" value={''} onChange={(e) => console.log('')} type='text' fullWidth />
            </div>
            <div className="mt-6">
                {profs.map((prof, idx) => {
                    const profData = prof?.data()
                    return <ProfCard key={idx} profData={profData} isUser={isUser} uid={uid} isStudent={isStudent} />
                })}
            </div>
        </div>
        <Footer />
    </div>
}