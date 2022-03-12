
const BtnEnums = [
    { name: 'View lecturers', href: '/profs' },
    { name: 'View colleges', href: '/colleges' },
    { name: 'My course list', href: '/profile' },
    { name: 'My details', href: '/profs' }
]

export function Sidebar() {
    return <div className="flex flex-col flex-2 mt-44 w-44 ml-4">
        <div className=" bg-red-500 py-6 rounded text-white font-bold mb-2">Accessability</div>
        <ul className="flex flex-col border-r gap-4">
            {BtnEnums.map((btn) => {
                return <CustomButtom name={btn.name} href={btn.href} />
            })}
        </ul>
    </div>
}

const CustomButtom = ({ name, href }) => {
    const onClick = () => {
        window.href.location = href
    }

    return <button className="hover:bg-red-500 hover:text-white p-4 rounded mr-2" onClick={onClick}>
        {name}
    </button>
}