import { signProfOut, signStudentOut } from '../../backend/firebase.utils'

export function Header({ isUser = false, isStudent, uid }) {
    const signOut = async () => {
        isStudent ? await signStudentOut(uid) : await signProfOut(uid)
        window.location.href = '/signin'
    }

    const rediretToProfile = () => {
        window.location.href = isStudent ? `/students/${uid}` : `/profs/${uid}`;
    }

    const rediretToHome = () => {
        window.location.href = isUser ? isStudent ? `/students/${uid}/home` : `/profs/${uid}/home` : '/home';
    }

    return <div className="flex flex-row justify-between h-16 bg-black text-white items-center">
        <div className="ml-6">logo</div>
        <ul className="flex flex-row flex-3 h-full">
            <button className="hover:bg-red-500 p-4 rounded" onClick={rediretToHome}>Home</button>
            <button className="hover:bg-red-500 p-4 rounded">View All Lectures</button>
            {!isUser && <button className="hover:bg-red-500 p-4 rounded" onClick={() => window.location.href = '/signin'}>Log In</button>}
            {isUser && <> <button className="hover:bg-red-500 p-4 rounded" onClick={rediretToProfile}>Profile</button>
                <button className="hover:bg-red-500 p-4 rounded" onClick={signOut}>Sign Out</button></>}
        </ul>
    </div>
}