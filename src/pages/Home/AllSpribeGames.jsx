import React, { useEffect, useState } from 'react'
import { fetchAllGamesSpribe, fetchGameURLSpribe } from '../../reusable_component/gameApi'
import { useNavigate } from 'react-router-dom';

function AllSpribeGames() {
    const navigate = useNavigate();

    const [allGamesListView, setAllGamesListView] = useState(null)
    const userId = localStorage.getItem("userId")
    useEffect(() => {
        fetchAllGamesSpribe(setAllGamesListView);
    }, []);
    return (
        <div>
            <div className="grid grid-cols-3 w-full">
                {allGamesListView ? (
                    allGamesListView?.data?.data?.map((item, i) => (
                        <div onClick={() => fetchGameURLSpribe(item?.id, userId,navigate)} key={i} className=" flex flex-col items-center text-black p-2 ">
                            <img src={item?.img} className="w-36 h-32 rounded-lg" alt="sd" />
                        </div>
                    ))
                ) : (
                    <div className="flex items-center justify-center text-black text-xl w-full col-span-3">No data</div>
                )}
            </div>
        </div>
    )
}

export default AllSpribeGames