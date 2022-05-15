import { Fragment, useEffect, useState } from "react";
import { Details } from "../../../shared/Details";
import CourseList from "../../../shared/CourseList";
import { useParams } from "react-router-dom";
import { fetchProfDetails } from "../../../../backend/firebase.utils";

const FragmentEnum = {
    DETAILS: 'details',
    COURSE_LIST: 'course list',
    PREV_LIST: 'prev course list',
    OPINIONS: 'opinions and rate'
}

export default function ProfPage({ curProfData, isStudent }) {
    const { profid } = useParams()
    const [fragment, setFragment] = useState(FragmentEnum.DETAILS)
    const [profData, setProfData] = useState()

    useEffect(() => {
        fetchProfDetails(profid).then((data) => setProfData(data))
    }, [])

    return <div className="flex">
        <div className="flex flex-col items-start gap-6 font-bold ml-20 mt-48 border-solid border-r-2 border-gray w-fit pr-5">
            <button className="hover:bg-red-500 p-2 hover:text-white rounded" onClick={() => setFragment(FragmentEnum.DETAILS)}>Details</button>
            <button className="hover:bg-red-500 p-2 hover:text-white rounded" onClick={() => setFragment(FragmentEnum.COURSE_LIST)}>View Course List</button>
            <button className="hover:bg-red-500 p-2 hover:text-white rounded" onClick={() => setFragment(FragmentEnum.PREV_LIST)}>Previous Course List</button>
        </div>
        <div className='flex items-center mt-44 ml-12 m-auto'>
            {fragment === FragmentEnum.DETAILS &&
                <Details name={profData?.name} college={profData?.college} gender={profData?.gender} />
            }
            {fragment === FragmentEnum.COURSE_LIST &&
                <CourseList courses={profData?.courses} isCurrentUser={true} isStudent={isStudent} />
            }
            {fragment === FragmentEnum.PREV_LIST &&
                <CourseList courses={profData?.courses} isCurrentUser={true} sStudent={isStudent} />
            }
        </div>
    </div>
}

/**
 * check the id of the course if it's in the curprof id courses list 
 * look at implemeting the course page / or rate look at the diff
 */