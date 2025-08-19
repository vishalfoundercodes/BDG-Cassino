/* eslint-disable react/prop-types */
const NotificationModal = ({ isOpen, message = "server problem" }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="py-3 px-10 bg-black opacity-70 rounded-lg shadow-lg flex flex-col items-center justify-center">
          <p className="text-center font-bold text-sm text-white">{message}</p>
        </div>
      </div>
    );
  };
  
  export default NotificationModal;