import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Footer } from "../Footer/Footer"
import { Header } from "../Header/Header"
import { fetchStudentDoc } from "../../../backend/firebase.utils"

function Rate() {
    const { uid } = useParams()
    const [isUser, setIsUser] = useState()
    const token = window.localStorage.getItem("token");

    useEffect(() => {
        fetchStudentDoc(uid, token)
            .then(() => {
                setIsUser(true)
            })
            .catch((err) => {
                window.location.href = '/home'
                alert(err)
            }
            )
    }, [uid, token])

    return <div>
        <Header isStudent={true} isUser={isUser} uid={uid} />

        <Footer />
    </div>
}

export default Rate
//save the total in the total rate of thec course id in /course -> count the rates length and multiplie with rate number then add the current and dividie by 2
// save the uid of the student in rates array as well 