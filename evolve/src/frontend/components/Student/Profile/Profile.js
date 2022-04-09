import { useState } from "react"
import CourseList from "./CourseList"
import Details from "./Details"

const TabEnum = {
    DETAILS: 'details',
    COURSE_LIST: "course list"
}
export default function Profile() {
    const [tab, setTab] = useState(TabEnum.DETAILS)
    console.log(tab)

    return <div className="flex flex-row">
        <div className="flex flex-col items-start gap-6 font-bold ml-20 mt-48 border-solid border-r-2 border-gray pr-5">
            <button className="hover:bg-red-500 p-4 rounded" onClick={() => setTab(TabEnum.DETAILS)}>Details</button>
            <button className="hover:bg-red-500 p-4 rounded" onClick={() => setTab(TabEnum.COURSE_LIST)}>Course List</button>
        </div>
        <div className="flex-1">
            {tab === TabEnum.DETAILS && <Details />}
            {tab === TabEnum.COURSE_LIST && <CourseList />}
        </div>
    </div >
}