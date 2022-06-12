import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../Header/Header";
import { fetchProfDoc, fetchStudentDoc, getAllColleges } from '../../../backend/firebase.utils'
import { Footer } from "../Footer/Footer";
import { CollegeCard } from "./CollegeCard";
import { Input } from '@material-ui/core';

export function Colleges({ isCurrentUser = false, isStudent = false }) {
    const { uid } = useParams()
    const [colleges, setColleges] = useState([])
    const [searchedColleges, setSearchedColleges] = useState([])
    const [search, setSearch] = useState('')
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
                setSearchedColleges(res?.docs)
            })
            .catch((err) => {
                alert(err)
            })

    }, [uid, isStudent, token])

    const handleSearch = (e) => {
        const { value } = e.target
        setSearch(value)

        if (!value) {
            setSearchedColleges(colleges)
            return
        }
        const searched = colleges.filter((college) => {
            const collegeName = college?.data()?.name?.toLowerCase();
            return collegeName.includes(value)
        })
        setSearchedColleges(searched)
    }

    return <div>
        <Header isUser={isUser} uid={uid} isStudent={isStudent} />
        <div className="flex flex-col items-center mt-16">
            <div className="w-1/5">
                <Input placeholder="Search" value={search} onChange={handleSearch} type='text' fullWidth />
            </div>
            <div className="mt-6">
                {searchedColleges?.map((college, idx) => {
                    const collegeData = college?.data();
                    return <CollegeCard key={idx} collegeData={collegeData} isUser={isUser} isStudent={isStudent} uid={uid} />
                })}
            </div>
        </div>
        <Footer />
    </div>
}