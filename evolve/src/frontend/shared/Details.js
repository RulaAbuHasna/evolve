export function Details({ name, college, gender }) {
    return <div className="flex flex-col gap-5">
        <div className="flex flex-row"><h1>Name: {name}</h1></div>
        <div className="flex flex-row"><h1>College: {college}</h1></div>
        <div className="flex flex-row"><h1>Gender: {gender}</h1></div>
    </div >
}