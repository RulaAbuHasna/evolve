import { useState } from "react"
import { useParams } from "react-router-dom"
import { updateCourseList } from "../../../../../backend/firebase.utils"
import { Input } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';

export function UpdateCourseList() {
    const [courseName, setCourseName] = useState('')
    const [label, setLabel] = useState('')
    const {uid} = useParams()

    const onSubmit = () => {
        if(!courseName)alert('Please update all feilds before submitting')
        const id =  uuidv4()
        const course = {id, name: courseName}
        updateCourseList({profid: uid, newCourse:course, courseId: id}).then(res=>console.log(res)).catch(err=>console.log(err))
        setCourseName('')
        setLabel(`Successfully Submitted! ${courseName} id is ${id}`)
    }

    return <div>
    {!label &&
     <form className='flex flex-col place-items-center rounded p-6 mt-4 gap-4'>
     <Input value={courseName} onChange={(e) => setCourseName(e.target.value)} placeholder='Course Name'/>
     <button className="bg-green-400 text-white p-4 rounded-full mr-4 "  onClick={onSubmit}>Add new course</button>
 </form>
    }
    {label && <h1 className="text-lg mt-4 border rounded-full p-4">{label} <span onClick={()=>setLabel('')} className="text-red-400 cursor-pointer">Click Me</span> if you want to add more!</h1>}
 </div>
}