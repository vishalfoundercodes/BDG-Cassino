import { FaBullhorn } from "react-icons/fa";
import { useState, useEffect } from "react";
import Loader from "../../reusable_component/Loader/Loader";
import { Link } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import apis from "../../utils/apis";
import axios from "axios";

const AnnouncementPage = () => {
  const [loading, setLoading] = useState(false);
  const [announcements, setAnnouncements] = useState([]); // ✅ add state

  const handler = async () => {
    setLoading(true);
    try {
      const res = await axios.get(apis.announcement);
      if (res?.data?.status === 200) {
        setAnnouncements(res.data.data); // ✅ store response data
      }
    } catch (err) {
      console.error("Announcement fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handler();
  }, []);

  return (
    <div className="bg-black min-h-screen text-white font-sans">
      {loading && <Loader setLoading={setLoading} loading={loading} />}

      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b border-gray-700">
        <Link to={-1}>
          <MdKeyboardArrowLeft className="font-extrabold text-4xl text-white" />
        </Link>
        <h1 className="text-lg font-semibold">Announcement</h1>
      </div>

      {/* Announcement List */}
      <div className="p-4 space-y-4">
        {announcements.length > 0 ? (
          announcements.map((item, index) => (
            <div
              key={index}
              className="bg-[#2c2c2c] rounded-lg p-4 shadow-md space-y-2"
            >
              <div className="flex items-center gap-2 text-[#FFD700] text-sm font-semibold">
                <FaBullhorn className="text-yellow-400 text-base" />
                <span className="text-white">{item.title}</span>
              </div>
              <p className="text-sm text-[#A8A5A1] leading-relaxed">
                {item.description}
              </p>
              <p className="text-xs text-[#606462]">{item.created_at}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-sm text-gray-400 mt-6">
            No announcements
          </p>
        )}
      </div>
    </div>
  );
};

export default AnnouncementPage;
