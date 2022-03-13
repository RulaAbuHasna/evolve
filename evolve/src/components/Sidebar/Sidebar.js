

export function Sidebar({ isUser = false, isStudent = false, uid }) {
    const BtnEnums = [
        { name: 'View lecturers', href: isUser ? isStudent ? `/student/${uid}/profs` : `/prof/${uid}/profs` : '/profs' },
        { name: 'View colleges', href: '/colleges' },
        { name: 'My course list', href: '/profile' },
    ]
    return <div className="flex flex-col flex-2 mt-44 w-44 ml-4">
        <div className=" bg-red-500 py-6 rounded text-white font-bold mb-2">Accessability</div>
        <ul className="flex flex-col border-r gap-4">
            {BtnEnums.map((btn, idx) => {
                return <CustomButtom key={idx} name={btn.name} href={btn.href} />
            })}
        </ul>
    </div>
}

const CustomButtom = ({ name, href }) => {
    const onClick = () => {
        window.location.href = href
    }

    return <button className="hover:bg-red-500 hover:text-white p-4 rounded mr-2" onClick={onClick}>
        {name}
    </button>
}