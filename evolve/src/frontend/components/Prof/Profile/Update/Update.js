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
    const [hideCourse, setHideCourse] = useState(false)
    const [hidePlan, setHidePlan] = useState(false)
    const [hideActivity, setHideActivity] = useState(false)

    const hideTab = (name) => {
       switch(name){
        case UpdateEnum.COURSE:
           setHideCourse(true)
           setHidePlan(false)
           setHideActivity(false)
           break;
        case UpdateEnum.ACTIVITY:
           setHideCourse(false)
           setHidePlan(false)
           setHideActivity(true)
           break;
        case UpdateEnum.PLAN:
           setHideCourse(false)
           setHidePlan(true)
           setHideActivity(false)
           break;
        default:
            console.log('how did dat happen')
       }
    }

    return <div>
        <div className="flex flex-col gap-4">
            {!hideCourse && <button className='bg-red-500 text-white rounded p-4'
                onClick={() => {
                    setUpdateSatuts('Course')
                    hideTab('Course')
                }} >Update Course List
            </button>}
            {!hidePlan && <button className='bg-red-500 text-white rounded p-4'
                onClick={() => {
                    setUpdateSatuts('Plan')
                    hideTab('Plan')
                }} > Update Lecturer Plan</button>}
            {!hideActivity && <button className='bg-red-500 text-white rounded p-4' onClick={() => {
                setUpdateSatuts('Activity')
                hideTab('Activity')
            }}> Update Lecturer Avtivity</button>}
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