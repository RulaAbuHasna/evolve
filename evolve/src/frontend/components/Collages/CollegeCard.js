export function CollegeCard({ collegeData, isUser, isStudent, uid }) {

    const redirectToCollegePage = () => {
        const collegeId = collegeData?.id
        window.location.href = isUser ?
            isStudent ?
                `/student/${uid}/colleges/${collegeId}`
                : `/prof/${uid}/colleges/${collegeId}`
            : `/colleges/${collegeId}`
    }

    return <div className="flex justify-between gap-36 my-2 overflow-auto">
        <h1 key={collegeData?.name} className='text-lg font-mono'>{collegeData?.name}</h1>
        <button onClick={redirectToCollegePage} className='w-24 h-8 bg-red-500 text-white rounded'>View</button>
    </div>
}