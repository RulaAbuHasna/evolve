import { useState } from "react"
import { useParams } from "react-router-dom"
import { addNewPlan } from "../../../../../backend/firebase.utils"

export function UpdatePlan() {
    const [plan, setPlan] = useState('')
    const [label, setLabel] = useState('')
    const {uid} = useParams()

    const onSubmit = () => {
        if(!plan)alert('Please update the feild before submitting')
        addNewPlan({profid: uid, newPlan:plan}).then(res=>console.log(res)).catch(err=>console.log(err))
        setPlan('')
        setLabel('Successfully Submitted!')
    }

    return <div>
       {!label &&
       <div className="flex flex-col gap-2 justify-center">
        <textarea className="w-96 h-44 outline mt-6 pt-2 pl-4" value={plan} onChange={e=>setPlan(e.target.value)}/>
        <button className="bg-green-400 text-white p-4 rounded-full mr-4  w-2/5" onClick={onSubmit}>Add new plan</button>
        </div>
       }
       {label && <h1 className="text-lg mt-4 border rounded-full p-4">{label} <span onClick={()=>setLabel('')} className="text-red-400 cursor-pointer">Click Me</span> if you want to submit more!</h1>}
    </div>
}