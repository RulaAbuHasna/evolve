import { useState } from "react"
import CourseList from "../../../shared/CourseList"
import { Details } from "../../../shared/Details"
import { useContext } from "react"
import { StudentContext } from "../../../shared/Context"

const TabEnum = {
    DETAILS: 'details',
    COURSE_LIST: "course list"
}
export default function Profile() {
    const [tab, setTab] = useState(TabEnum.DETAILS)
    const { data } = useContext(StudentContext)
    const { gender, name, college, courses, email } = data || {}

    return <div className="flex flex-row">
        <div className="flex flex-col items-start gap-6 font-bold ml-20 mt-48 border-solid border-r-2 border-gray pr-5">
            <button className="hover:bg-red-500 p-4 rounded" onClick={() => setTab(TabEnum.DETAILS)}>Details</button>
            <button className="hover:bg-red-500 p-4 rounded" onClick={() => setTab(TabEnum.COURSE_LIST)}>Course List</button>
        </div>
        <div>
            <div className="flex border-b-2 border-gray gap-2 mt-12 p-4">
                <img src='https://upload.wikimedia.org/wikipedia/commons/e/ec/RandomBitmap.png' alt='' width="100px" className="rounded-full" />
                <div>
                    <h1>{name}</h1>
                    <p>{email}</p>
                </div>
            </div>
            <div className="flex items-center mt-12 ml-12 m-auto">
                {tab === TabEnum.DETAILS && <Details gender={gender} name={name} college={college} />}
                {tab === TabEnum.COURSE_LIST && <CourseList courses={courses} isStudent={true} isCurrentUser={true} />}
            </div>
        </div>
    </div >
}