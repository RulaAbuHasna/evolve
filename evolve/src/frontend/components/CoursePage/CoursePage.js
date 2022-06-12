import { useParams } from "react-router-dom"
import { Header } from "../Header/Header"
import { Footer } from "../Footer/Footer"
import { useEffect, useState } from "react";
import { getCourseData } from "../../../backend/firebase.utils";
import { ProfActivity } from "./ProfActivity";

const FragmentEnum = Object.freeze({
    PROF_ACTIVITY: 'lecturer activity',
    RATE: 'opinions and rate'
})

export default function CoursePage({ isStudent, isUser }) {
    const { courseid, uid } = useParams()
    if (!courseid) window.location.href = isStudent ? `student/${uid}` : `prof/${uid}`
    const [fragment, setFragment] = useState(FragmentEnum.PROF_ACTIVITY)
    const [courseData, setCourseData] = useState({})
    const [canRate, setCanRate] = useState(false)

    useEffect(() => {
        getCourseData(courseid)
            .then((res) => {
                setCourseData(res)
                setCanRate(!res?.rates?.includes(uid) && isStudent)
            })
            .catch((err) => alert(err))
    }, [courseid, isStudent, uid])

    return <>
        <Header isUser={isUser} isStudent={isStudent} uid={uid} />
        <h1 className="flex ml-20 pt-10 text-xl font-bold">{courseData?.name}{' - '}{courseData?.id}</h1>
        {canRate && <button className="flex ml-20 bg-gray-300 p-2 text-red-500 hover:bg-red-500 hover:text-white  rounded" onClick={() => window.location.href = `${courseid}/rate`}>Rate</button>
        }        <div className="flex">
            <div className="flex flex-col items-start gap-6 font-bold ml-20 mt-48 border-solid border-r-2 border-gray w-fit pr-5">
                <button className="hover:bg-red-500 p-2 hover:text-white rounded" onClick={() => setFragment(FragmentEnum.PROF_ACTIVITY)}>Lecturer Info And Activity</button>
                <button className="hover:bg-red-500 p-2 hover:text-white rounded" onClick={() => setFragment(FragmentEnum.RATE)}>View Opinons And Rates</button>
            </div>
            <div className='flex items-center mt-44 ml-12 m-auto'>
                {fragment === FragmentEnum.PROF_ACTIVITY && courseData?.profid &&
                    // <Activity name={data?.name} college={data?.college} gender={data?.gender} />
                    <ProfActivity uid={courseData.profid} />
                }
                {fragment === FragmentEnum.RATE &&
                    <div className="font-bold text-2xl gap-4 flex flex-col">
                        <h1>Total rate so far is: {courseData?.rate} </h1>
                        <h1>
                            Number of ratings is: {courseData?.rates?.length}
                        </h1>
                    </div>
                }
            </div>
        </div>
        <Footer />
    </>
}

//rate of courses page 
//can rate must iunclude if the cur student has the course in his course list too
//the page of update prof