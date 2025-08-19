// import feedbackImg from '../../assets/images/feedbackImg.png'
// import apis from "../../utils/apis";
// import axios from "axios";
// import { useState } from "react";
// function Feedback() {
//   const userId=localStorage.getItem("userId");
//   const [formData, setFormData] = useState({
//     userId:userId,
//     content: "",
//   })
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log("Submitting feedback...", formData);
//       // const response = await axios.post(apis.feedback, formData);
//       // console.log("FormData submitted:", response);
//       // console.log("Feedback submitted successfully:", response.data);
//       // Handle success (e.g., show a success message)
//     } catch (error) {
//       console.error("Error submitting feedback:", error);
//       // Handle error (e.g., show an error message)
//     }
//   }
//   return (
//     <div className="text-xs px-3 text-[#666462]">
//       <div className="shadow-lg bg-[#333332] rounded-lg p-2 mt-5 pb-20">
        // Welcome to feedback,please give feedback-please describe the problem in
        // detail when providing feedback, perfectly attach the screenshot of your
        // problem you encountered,we will immediately process your feedback!
//       </div>
//       <h1 className="text-center font-bold mt-5  text-[#EEF3F0]">
//         Send helpful feedback
//       </h1>
//       <h1 className="text-center font-bold mt-3 text-[#EEF3F0]">
//         Change to win Mystery Rewards
//       </h1>
//       <div className="mt-5">
//         <img src={feedbackImg} alt="ds" />
//       </div>
//       <div>
//         <button className="w-full mt-10 tracking-wider bg-gradient-to-r from-[#EDD188] to-[#C79744]  text-[#985206] text-sm font-semibold py-3 rounded-full shadow-md "
//         onClick={handleSubmit}
//         >
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Feedback


import { useNavigate } from 'react-router-dom';
import feedbackImg from '../../assets/images/feedbackImg.png'
import apis from "../../utils/apis";
import axios from "axios";
import { useState } from "react";
function Feedback() {
  const userId=localStorage.getItem("userId");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userid: userId,
    description: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting feedback...", formData);
      const response = await axios.post(apis.feedback, formData);
      console.log("FormData submitted:", response);
      console.log("Feedback submitted successfully:", response.data);
      navigate("/profile");
      // Handle success (e.g., show a success message)
    } catch (error) {
      console.error("Error submitting feedback:", error);
      // Handle error (e.g., show an error message)
    }
  }
  return (
    <div className="text-xs px-3 text-[#666462]">
      <div className="shadow-lg bg-[#333332] rounded-lg p-2 mt-5 pb-20">
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="Welcome to feedback,please give feedback-please describe the problem in detail when providing feedback, perfectly attach the screenshot of your problem you encountered,we will immediately process your feedback!"
          className="w-full h-40 bg-[#333332] text-[#666462] placeholder-gray-400 resize-none border-none outline-none p-2 text-sm"
        ></textarea>
      </div>

      <h1 className="text-center font-bold mt-5  text-[#EEF3F0]">
        Send helpful feedback
      </h1>
      <h1 className="text-center font-bold mt-3 text-[#EEF3F0]">
        Change to win Mystery Rewards
      </h1>
      <div className="mt-5">
        <img src={feedbackImg} alt="ds" />
      </div>
      <div>
        <button
          className="w-full mt-10 tracking-wider bg-gradient-to-r from-[#EDD188] to-[#C79744]  text-[#985206] text-sm font-semibold py-3 rounded-full shadow-md "
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Feedback