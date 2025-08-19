import React, { useState, useEffect } from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import noData from '../../assets/images/no_data_available.png';
import apis from '../../utils/apis';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';
import Loader from '../../reusable_component/Loader/Loader';

function CollectionRecord() {
    const [selected, setSelected] = useState(12); // Default to Daily
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    // Fetch history data based on `userId` and `selected` type
    const fetchHistory = async () => {
        setLoading(true)
        if (!userId) {
            toast.error('User not logged in');
            navigate('/login');
            return;
        }
        try {
            const response = await axios.get(`${apis.activityRewardsHistory}${userId}&type_id=${selected}`);
            if (response?.data?.status === 200) {
                setLoading(false)
                setData(response?.data?.data);
            } else {
                setLoading(false)
                setData([]); // Clear the data if the response is not successful
                // toast.error(response?.data?.message || 'Failed to fetch data');
            }
        } catch (err) {
            setLoading(false)
            setData([]); // Clear the data in case of error
            // toast.error(err?.response?.data?.message || 'Something went wrong');
        }
    };

    // Trigger `fetchHistory` when `selected` or `userId` changes
    useEffect(() => {
        if (userId) {
            fetchHistory();
        }
    }, [userId, selected]);

    return (
        <div className=" font-roboto">
            {loading && <Loader setLoading={setLoading} loading={loading} />}
            <header className="py-2 bg-customdarkBlue flex justify-between items-center">
                <Link to={-1}>
                    <MdKeyboardArrowLeft className="text-3xl text-white" />
                </Link>
                <div className="text-white text-lg">Receive History</div>
                <div></div>
            </header>
            <div className="py-2 px-2 text-lg flex">
                <button
                    onClick={() => setSelected(12)}
                    className={`w-full px-4 py-2 rounded-md ${
                        selected === 12
                            ? 'bg-gradient-to-r  from-customlightbtn to-customdarkBluebtn text-white'
                            : 'bg-customdarkBlue text-gray'
                    }`}
                >
                    Daily
                </button>
                <button
                    onClick={() => setSelected(13)}
                    className={`w-full px-4 py-2 rounded-md ${
                        selected === 13
                            ? 'bg-gradient-to-r from-customlightbtn to-customdarkBluebtn text-white'
                            : 'bg-customdarkBlue text-gray'
                    }`}
                >
                    Weekly
                </button>
            </div>
            <div className="px-2">
                <table className="w-full mt-10">
                    <thead>
                        <tr className="text-white font-bold">
                            <th className="text-center">Name</th>
                            <th className="text-center">Amount</th>
                            <th className="text-center">Duration</th>
                            <th className="text-center">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.length > 0 ? (
                            data.map((item, i) => (
                                <tr key={i} className="text-white text-xsm bg-customdarkBlue">
                                    <td className="text-center py-2">{item?.name}</td>
                                    <td className="text-center">{item?.amount}</td>
                                    <td className="text-center">
                                        {item?.type_id === 12 ? 'Daily' : 'Weekly'}
                                    </td>
                                    <td className="text-center">
                                        {moment(item?.created_at).format('DD-MM-YYYY')}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-4">
                                    <img
                                        src={noData}
                                        alt="No data available"
                                        className="mx-auto"
                                        style={{ width: '150px' }}
                                    />
                                    <p className="mt-2 text-gray">No data available</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CollectionRecord;
