export function ProfCard({ profData, isUser, isStudent, uid }) {

    const redirectToProfPage = () => {
        const profId = profData?.id
        window.location.href = isUser ?
            isStudent ?
                `/student/${uid}/profs/${profId}`
                : `/prof/${uid}/profs/${profId}`
            : `/profs/${profId}`
    }

    return <div className="flex justify-between gap-36 my-2 overflow-auto">
        <h1 key={profData?.name} className='text-lg font-mono'>{profData?.name}</h1>
        <button onClick={redirectToProfPage} className='w-24 h-8 bg-red-500 text-white rounded'>View</button>
    </div>
}