import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../Header/Header";
import { fetchProfDoc, fetchStudentDoc, getAllColleges } from '../../backend/firebase.utils'
import { Footer } from "../Footer/Footer";
import { CollegeCard } from "./CollegeCard";
import { Input } from '@material-ui/core';

export function Colleges({ isCurrentUser = false, isStudent = false }) {
    const { uid } = useParams()
    const [colleges, setColleges] = useState([])
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
        <div className="flex flex-col items-center mt-16">
            <div className="w-1/5">
                <Input placeholder="Search" value={''} onChange={(e) => console.log('')} type='text' fullWidth />
            </div>
            <div className="mt-6">
                {colleges?.map((college, idx) => {
                    const collegeData = college?.data();
                    return <CollegeCard key={idx} collegeData={collegeData} isUser={isUser} isStudent={isStudent} uid={uid} />
                })}
            </div>
        </div>
        <Footer />
    </div>
}