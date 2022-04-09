export default function CourseList({ courses }) {
    return <div>
        {courses?.map((course) => {
            return <div className="flex justify-between gap-36 my-2 overflow-auto">
                <h1 key={course?.name} className='text-lg font-mono'>{course?.name}</h1>
                <button className='w-24 h-8 bg-red-500 text-white rounded'>View</button>
            </div>
        })}
    </div>
}