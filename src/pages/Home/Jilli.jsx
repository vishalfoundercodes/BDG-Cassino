import React from 'react'
import axios from 'axios'
import apis from "../../utils/apis";
import { useEffect } from 'react';

export default function Jilli() {
    const fetchJilli=async()=>{
        try {
            const res = await axios.get(apis.all_game_list);
            console.log("res of jilli:", res)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchJilli();
    },[])
  return (
    <div>
      Jiili
    </div>
  )
}
