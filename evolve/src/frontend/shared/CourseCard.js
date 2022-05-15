import { useParams } from "react-router-dom"

export default function CourseCard({ course, isStudent, isCurrentUser }) {
    const { uid } = useParams()
    console.log(isStudent, '==')

    const handleViewCourse = () => {
        const { id } = course
        window.location.href = isCurrentUser ?
            isStudent ? `/student/${uid}/course/${id}` : `/prof/${uid}/course/${id}`
            : `/course/${id}`
    }

    return <div className="flex justify-between gap-36 my-2 overflow-auto">
        <h1 key={course?.id} className='text-lg font-mono'>{course?.name}</h1>
        <button className='w-24 h-8 bg-red-500 text-white rounded' onClick={handleViewCourse}>View</button>
    </div>
}