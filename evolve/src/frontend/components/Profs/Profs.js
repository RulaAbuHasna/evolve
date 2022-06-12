import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../Header/Header";
import { fetchProfDoc, fetchStudentDoc, getAllProfs } from '../../../backend/firebase.utils'
import { Footer } from "../Footer/Footer";
import { ProfCard } from "../../shared/ProfCard";
import { Input } from "@material-ui/core";

export function Profs({ isCurrentUser = false, isStudent = false }) {
    const { uid } = useParams()
    const [profs, setProfs] = useState([])
    const [isUser, setIsUser] = useState(isCurrentUser)
    const token = window.localStorage.getItem("token");
    const [searchedProfs, setSearchedCProfs] = useState([])
    const [search, setSearch] = useState('')

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
                    .then(() => {
                        setIsUser(true)
                    }).catch((err) => alert(err))
        }

        getAllProfs()
            .then((res) => {
                const docs = res?.docs
                setProfs(docs)
                setSearchedCProfs(docs)
                if (uid) {
                    const intial = docs?.filter((prof) => {
                        const profId = prof?.data()?.id
                        return profId !== uid
                    })
                    setProfs(intial)
                    setSearchedCProfs(intial)
                    return
                } else {
                    setProfs(docs)
                    setSearchedCProfs(docs)
                }
            })
            .catch((err) => {
                alert(err)
            })

    }, [uid, isStudent, token])

    const handleSearch = (e) => {
        const { value } = e.target
        setSearch(value)

        if (!value) {
            setSearchedCProfs(profs)
            return
        }
        const searched = profs.filter((prof) => {
            const profName = prof?.data()?.name?.toLowerCase();
            return profName.includes(value)
        })
        setSearchedCProfs(searched)
    }

    return <div>
        <Header isUser={isUser} uid={uid} isStudent={isStudent} />
        <div className="flex flex-col items-center mt-16">
            <div className="w-1/5">
                <Input placeholder="Search" value={search} onChange={handleSearch} type='text' fullWidth />
            </div>
            <div className="mt-6">
                {searchedProfs?.map((prof, idx) => {
                    const profData = prof?.data();
                    return <ProfCard key={idx} profData={profData} isUser={isUser} uid={uid} isStudent={isStudent} />
                })}
            </div>
        </div>
        <Footer />
    </div>
}