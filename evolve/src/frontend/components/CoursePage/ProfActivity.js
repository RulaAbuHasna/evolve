import { useEffect, useState } from "react"
import { fetchProfDetails } from '../../../backend/firebase.utils'

export function ProfActivity({ uid }) {
    const [profInfo, setProfInfo] = useState({})

    useEffect(() => {
        fetchProfDetails(uid)
            .then((res) => {
                setProfInfo(res)
            })
            .catch((err) => alert(err))
    }, [uid])
    console.log(profInfo)

    return <div className="flex flex-col gap-4">
        <h1> Name : {profInfo?.name}</h1>
        <h1>Prof courses:{profInfo?.courses?.map((course) => {
            <div>{course.name} - {course.id}</div>
        })}

        </h1>
        <h1> College : {profInfo?.college}</h1>
    </div>
}