import { useState } from "react"
import { useParams } from "react-router-dom"
import { addNewActivity } from "../../../../../backend/firebase.utils"

export function UpdateActivites() {
    const [activity, setActivity] = useState('')
    const {uid} = useParams()

    const onSubmit = () => {
        if(!activity)alert('Please update the feild before submitting')
        addNewActivity({profid: uid, newActivity:activity}).then(res=>console.log(res)).catch(err=>console.log(err))
        setActivity('')
        window.location.href = '/home'
    }

    return <div className="flex flex-col gap-2 justify-center">
        <textarea className="w-96 h-44 outline mt-6 pt-2 pl-4" value={activity} onChange={e=>setActivity(e.target.value)}/>
        <button className="bg-green-400 text-white p-4 rounded mr-2 w-1/4" onClick={onSubmit}>Update</button>
    </div>
}