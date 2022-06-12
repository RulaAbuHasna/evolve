import CourseCard from "./CourseCard"

export default function CourseList({ courses, isStudent, isCurrentUser }) {
    return <div>
        {courses?.map((course, idx) => {
            return <CourseCard course={course} key={idx} isStudent={isStudent} isCurrentUser={isCurrentUser} />
        })
        }
    </div>
}