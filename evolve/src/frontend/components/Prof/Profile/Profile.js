import { Fragment, useState } from "react";
import { Details } from "../../../shared/Details";
import { UpdatePage } from "./Update/Update";
import CourseList from "../../../shared/CourseList";

const FragmentEnum = {
    DETAILS: 'details',
    COURSE_LIST: 'activites',
    UPDATE: 'update'
}

export default function Profile({ data }) {
    console.log(data)
    const [fragment, setFragment] = useState(Fragment.DETAILS)

    return <div className="flex">
        <div className="flex flex-col items-start gap-6 font-bold ml-20 mt-48 border-solid border-r-2 border-gray w-fit pr-5">
            <button className="hover:bg-red-500 p-2 hover:text-white rounded" onClick={() => setFragment(FragmentEnum.DETAILS)}>Details</button>
            <button className="hover:bg-red-500 p-2 hover:text-white rounded" onClick={() => setFragment(FragmentEnum.COURSE_LIST)}>View Course List</button>
            <button className="hover:bg-red-500 p-2 hover:text-white rounded" onClick={() => setFragment(FragmentEnum.UPDATE)}>Update Profile</button>
        </div>
        <div className='flex items-center mt-44 ml-12 m-auto'>
            {fragment === FragmentEnum.DETAILS &&
                <Details name={data?.name} college={data?.college} gender={data?.gender} />
            }
            {fragment === FragmentEnum.COURSE_LIST &&
                <CourseList courses={data?.courses} isCurrentUser={true} />
            }
            {fragment === FragmentEnum.UPDATE &&
                <UpdatePage />
            }
        </div>
    </div>
}

//connect profs with thier courses, and create the update profile page