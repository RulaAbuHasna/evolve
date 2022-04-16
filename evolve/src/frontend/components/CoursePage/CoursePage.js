import { useParams } from "react-router-dom"
import { Header } from "../Header/Header"
import { Footer } from "../Footer/Footer"

export default function CoursePage({ isStudent, isUser }) {
    const { courseid, uid } = useParams()

    return <>
        <Header isUser={isUser} isStudent={isStudent} uid={uid} />
        this is the course of id {courseid}
        <Footer />
    </>
}