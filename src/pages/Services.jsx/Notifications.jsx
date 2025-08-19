import { RiDeleteBinLine } from "react-icons/ri";
import pro_notification from "../../assets/icons/pro_notification.png";
import axios from "axios";
import apis from "../../utils/apis";
import React, { useState, useEffect } from "react";
import Loader from "../../reusable_component/Loader/Loader";

function Notifications() {
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
const userId = localStorage.getItem("userId")

  const handler = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apis.notification}${userId}`);
      if (res?.data?.status === 200) {
        setNotifications(res.data.data); // ✅ store response data
        console.log(res.data.data); // Log the fetched notifications
      }
    } catch (err) {
      console.error("Notification fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (notificationId) => {
    try{
      const res = await axios.get(`${apis.notification}${userId}/${notificationId}`);
      console.log("Delete response:", res.data);
      if (res?.data?.status === 200) {
        setNotifications((prev) =>
          prev.filter((item) => item.id !== notificationId)
        );
      }
    }catch (err) {
      console.error("Error deleting notification:", err);
    }
  }

  useEffect(() => {
    handler();
  }, []);

  return (
    <div className="px-2 pb-10">
      {loading && <Loader setLoading={setLoading} loading={loading} />}

      {notifications.length > 0 ? (
        notifications.map((item, index) => (
          <div
            key={index}
            className="bg-[#333332] shadow-lg rounded-md mt-3 p-2"
          >
            <div className="grid grid-cols-12">
              <div className="col-span-1">
                <img
                  src={pro_notification}
                  alt="notification"
                  className="w-6 h-6"
                />
              </div>
              <div className="col-span-8 flex items-center font-semibold text-white">
                {item.name}
              </div>
              <div className="col-span-3 flex items-center justify-end">
                <RiDeleteBinLine
                  className="text-[#CAA14C]"
                  size={25}
                  onClick={() => {
                    setSelectedNotification(item);
                    setShowModal(true);
                  }}
                />
              </div>
            </div>
            <p className="text-xs text-[#666462]">{item.created_at}</p>
            <div className="mt-2">
              {/* <p className="text-xs text-[#9DA597]">{item.name}</p> */}
              <p className="text-xs text-[#9DA597]">{item.disc}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-400 mt-6 text-sm">
          No notifications
        </p>
      )}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#2C2C2C] rounded-lg w-[90%] max-w-sm p-4 text-center shadow-xl">
            <h2 className="text-white text-lg font-bold mb-3">Warning</h2>
            <p className="text-sm text-white mb-5">
              Are you sure you want to delete this message?
            </p>
            <div className="flex">
              <button
                className="w-1/2 py-2 text-white font-semibold rounded-bl-lg bg-[#65666C]"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="w-1/2 py-2 font-semibold rounded-br-lg bg-gradient-to-r from-[#EDD188] to-[#C79744] text-[#8F5206]"
                onClick={() => {
                  // Handle deletion logic
                  console.log("Deleted notification:", selectedNotification);
                  handleDelete(selectedNotification.id);
                  setShowModal(false);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notifications;
