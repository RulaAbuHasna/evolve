import { useState } from "react"
import { useParams } from "react-router-dom"
import { addNewActivity } from "../../../../../backend/firebase.utils"

export function UpdateActivites() {
    const [activity, setActivity] = useState('')
    const [label, setLabel] = useState('')
    const {uid} = useParams()

    const onSubmit = () => {
        if(!activity)alert('Please update the feild before submitting')
        addNewActivity({profid: uid, newActivity:activity}).then(res=>console.log(res)).catch(err=>console.log(err))
        setActivity('')
        setLabel('Successfully Submitted!')
    }

    return <div>
       {!label &&
       <div className="flex flex-col gap-2 justify-center">
        <textarea className="w-96 h-44 outline mt-6 pt-2 pl-4" value={activity} onChange={e=>setActivity(e.target.value)}/>
        <button className="bg-green-400 text-white p-4 rounded-full mr-4  w-2/5" onClick={onSubmit}>Add new activity</button>
        </div>
       }
       {label && <h1 className="text-lg mt-4 border rounded-full p-4">{label} <span onClick={()=>setLabel('')} className="text-red-400 cursor-pointer">Click Me</span> if you want to submit more!</h1>}
    </div>
}