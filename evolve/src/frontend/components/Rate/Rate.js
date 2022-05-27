import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Footer } from "../Footer/Footer"
import { Header } from "../Header/Header"
import { fetchStudentDoc, getCourseData, updateCourseData } from "../../../backend/firebase.utils"

const questionsSet = [
    'Rate how much you learned of the goals of this course',
    'Rate the professor explaination of this course',
    'Rate the reactive learning of this course',
    'Rate the quality of the instructions in this course',
    'Rate the quality of the textbooks provided',
    'Rate the balance of this course exams questions',
    'Rate how balanced the number of homeworks and essays were',
    'Rate how much you were comfortable asking questions within the class room',
    'Rate how much organized was this course',
    'Rate your overall experience of the course'
]

function Rate() {
    const { uid, courseid } = useParams()
    const [isUser, setIsUser] = useState()
    const [courseData, setCourseData] = useState({})

    const [q0, setQ0] = useState()
    const [q1, setQ1] = useState()
    const [q2, setQ2] = useState()
    const [q3, setQ3] = useState()
    const [q4, setQ4] = useState()
    const [q5, setQ5] = useState()
    const [q6, setQ6] = useState()
    const [q7, setQ7] = useState()
    const [q8, setQ8] = useState()
    const [q9, setQ9] = useState()

    const token = window.localStorage.getItem("token");

    useEffect(() => {
        fetchStudentDoc(uid, token)
            .then(() => {
                setIsUser(true)
            })
            .catch((err) => {
                window.location.href = '/home'
                alert(err)
            })
        getCourseData(courseid)
            .then((res) => {
                setCourseData(res)
            })
            .catch((err) => alert(err))
    }, [uid, token, courseid])

    const handleRate = (e) => {
        const { value, name } = e.target
        if (name === "q0") {
            setQ0(value)
        } else if (name === "q1") {
            setQ1(value)
        } else if (name === "q2") {
            setQ2(value)
        } else if (name === "q3") {
            setQ3(value)
        } else if (name === "q4") {
            setQ4(value)
        } else if (name === "q5") {
            setQ5(value)
        } else if (name === "q6") {
            setQ6(value)
        } else if (name === "q7") {
            setQ7(value)
        } else if (name === "q8") {
            setQ8(value)
        } else {
            setQ9(value)
        }
    }

    const handleSubmit = () => {
        if (!q0 || !q1 || !q2 || !q3 || !q4 || !q5 || !q6 || !q7 || !q8 || !q9) {
            alert('Please Fill All Required Feilds')
            return
        }
        const avg = parseInt(q0) + parseInt(q1) + parseInt(q2) + parseInt(q3) + parseInt(q4) + parseInt(q5) + parseInt(q6) + parseInt(q7) + parseInt(q8) + parseInt(q9)
        const len = courseData?.rates?.length
        const prevRate = courseData?.rate * len

        const rates = courseData?.rates
        rates.push(uid)
        const rate = (prevRate + avg) / (len + 1);

        const data = { rate, rates }
        updateCourseData(courseid, data).then((res) => {
            window.location.href = `/student/${uid}/course/${courseid}`
        }).catch((err) => {
            alert('Error submitting rate, please contact Rula :D', err)
        })
    }


    return <div className="flex flex-col gap-4">
        <Header isStudent={true} isUser={isUser} uid={uid} />
        <div className="flex flex-col gap-2">
            <span className="text-xl font-semibold"> {courseData?.name} - {courseData?.id}</span>
            <div className="border-gray border-2 p-4 w-1/4 italic">
                2 (Strongly Disagree) - 4 (Disagree) - 6 (unbiased) - 8 (Agree) - 10 (Strongly Agree)
            </div>
        </div>
        <div className="overflow-scroll max-h-screen">
            {questionsSet.map((question, idx) => {
                return <div className="flex flex-col gap-2 mt-6" key={idx}>
                    <p className="text-lg font-serif">{question}</p>
                    <div className="flex justify-center gap-6">
                        <div className="flex gap-1">
                            <label htmlFor='1'>2</label>
                            <input className='mt-1.5' type='radio' id='0' name={'q' + idx} value={2} onChange={handleRate} />
                        </div>
                        <div className="flex gap-1">
                            <label htmlFor='2'>4</label>
                            <input className='mt-1.5' type='radio' id='1' name={'q' + idx} value={4} onChange={handleRate} />
                        </div>
                        <div className="flex gap-1">
                            <label htmlFor='3'>6</label>
                            <input className='mt-1.5' type='radio' id='2' name={'q' + idx} value={6} onChange={handleRate} />
                        </div>
                        <div className="flex gap-1">
                            <label htmlFor='4'>8</label>
                            <input className='mt-1.5' type='radio' id='3' name={'q' + idx} value={8} onChange={handleRate} />
                        </div >
                        <div className="flex gap-1">
                            <label htmlFor='5'>10</label>
                            <input className='mt-1.5' type='radio' id='4' name={'q' + idx} value={10} onChange={handleRate} />
                        </div >
                    </div >
                </div >
            })}
            <button className='w-24 h-8 bg-red-500 text-white rounded mt-5' onClick={handleSubmit}>Submit</button>
        </div >
        <Footer className='relative' />
    </div >
}

export default Rate
//save the total in the total rate of thec course id in /course -> count the rates length and multiplie with rate number then add the current and dividie by 2
// save the uid of the student in rates array as well 