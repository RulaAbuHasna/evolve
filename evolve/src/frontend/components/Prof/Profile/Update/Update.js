import { useState } from "react"
import { UpdateActivites } from "./UpdateActivites"
import { UpdateCourseList } from "./UpdateCourseList"
import { UpdatePlan } from "./UpdatePlan"

const UpdateEnum = {
    COURSE: 'Course',
    PLAN: 'Plan',
    ACTIVITY: 'Activity'
}

export function UpdatePage() {
    const [updateStatus, setUpdateSatuts] = useState('')

    return <div>
        <div>
            <button className='w-24 h-8 bg-red-500 text-white rounded' onClick={setUpdateSatuts('Course')}>Update Course List</button>
            <button className='w-24 h-8 bg-red-500 text-white rounded' onClick={setUpdateSatuts('Plan')} > Update Lecturer Plan</button>
            <button className='w-24 h-8 bg-red-500 text-white rounded' onClick={setUpdateSatuts('Activity')} > Update Lecturer Avtivity</button>
        </div >
        <div>
            {updateStatus === UpdateEnum.COURSE && <>
                <UpdateCourseList />
            </>}
            {updateStatus === UpdateEnum.PLAN && <>
                <UpdatePlan />
            </>}
            {updateStatus === UpdateEnum.ACTIVITY && <>
                <UpdateActivites />
            </>}
        </div>
    </div >
}