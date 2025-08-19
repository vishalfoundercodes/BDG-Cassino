import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom'
import apis from '../../utils/apis';
import { toast } from 'react-toastify';
import Loader from '../../reusable_component/Loader/Loader';

function ActivityDetails() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [bannerData, setBannerData] = useState([])
    const bannerDataHandler = async () => {
        setLoading(true)
        try {
            const res = await axios.get(apis.slider)
            if (res?.data?.success === 200) {
                setLoading(false)
                // console.log(res)
                const maindata = res?.data?.data?.filter(item => item?.id == id)
                setBannerData(maindata)
            } else {
                setLoading(false)
                toast.error(res?.data?.message)
            }
        } catch (err) {
            setLoading(false)
            // console.log(err)
            toast.error(err.message || "Something went wrong");
        }
    }
    useEffect(() => {
        bannerDataHandler()
    }, [])
    // console.log("bannerData filrer", bannerData)
    // console.log("id", id)
    return (
        <div>
            {loading && <Loader setLoading={setLoading} loading={loading} />}
            <div className='bg-gradient-to-r from-red to-redLight h-[3.22rem] flex items-center justify-between'>
                <Link to="/activity" >
                    <MdKeyboardArrowLeft className="font-extrabold text-4xl text-white" />
                </Link>
                <p className='text-sm'>Activity Details</p>
                <div></div>
            </div>
            <div className='w-full'>
                <img className='w-full h-[11rem]' src={bannerData[0]?.image} alt="df" />

                <div className='w-full text-black mt-5 flex flex-col items-center  gap-2 px-3'>
                    <h1>{bannerData[0]?.title}</h1>
                    <img src={bannerData[0]?.link} alt="fd" />
                </div>
            </div>
        </div>
    )
}

export default ActivityDetails