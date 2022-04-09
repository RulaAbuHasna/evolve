import { Fragment, useState } from "react";
import { Activities } from "./Activites";
import { Details } from "../../../shared/Details";
import { UpdatePage } from "./Update/Update";

const FragmentEnum = {
    DETAILS: 'details',
    ACTIVITIES: 'activites',
    UPDATE: 'update'
}

export default function Profile({ data }) {
    const [fragment, setFragment] = useState(Fragment.DETAILS)

    return <div>
        <div className="flex flex-col items-start gap-6 font-bold ml-20 mt-48 border-solid border-r-2 border-gray w-fit pr-5">
            <button className="hover:bg-red-500 p-2 hover:text-white rounded" onClick={() => setFragment(FragmentEnum.DETAILS)}>Details</button>
            <button className="hover:bg-red-500 p-2 hover:text-white rounded" onClick={() => setFragment(FragmentEnum.ACTIVITIES)}>View Activities</button>
            <button className="hover:bg-red-500 p-2 hover:text-white rounded" onClick={() => setFragment(FragmentEnum.UPDATE)}>Update Profile</button>
        </div>
        {fragment === FragmentEnum.DETAILS && <Fragment>
            <Details />
        </Fragment>}
        {fragment === FragmentEnum.ACTIVITIES && <Fragment>
            <Activities />
        </Fragment>}
        {fragment === FragmentEnum.UPDATE && <Fragment>
            <UpdatePage />
        </Fragment>}
    </div>
}