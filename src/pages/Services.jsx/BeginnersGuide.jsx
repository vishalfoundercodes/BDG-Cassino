// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import apis from '../../utils/apis'
// import Loader from '../../reusable_component/Loader/Loader'

// function BeginnersGuide() {
//   const [data, setData] = useState("")
//   const [loading, setLoading] = useState(false);
//   const handler = async () => {
//     setLoading(true)
//     try {
//       console.log(`Fetching data from ${apis.beginner_guide}`);
//       const res = await axios.get(`${apis.beginner_guide}`);
//       if (res?.data?.status === 200) {
//         setLoading(false)
//         setData(res?.data?.data)
//         console.log(res?.data?.data)
//       }
//     } catch (err) {
//       setLoading(false)
//       console.log(err)
//     }
//   }
//   useEffect(() => {
//     handler()
//   }, [])
//   return (
//     <div className='text-white opacity-65 p-2 pb-20 text-xs'>
//       {loading && <Loader setLoading={setLoading} loading={loading} />}
//       <h1 className='font-extrabold text-white text-sm text-center py-10'>{data[0]?.name}</h1>
//       <div dangerouslySetInnerHTML={{ __html: data[0]?.description }} /></div>
//   )
// }
// export default BeginnersGuide

import axios from "axios";
import React, { useEffect, useState } from "react";
import apis from "../../utils/apis";
import Loader from "../../reusable_component/Loader/Loader";

function BeginnersGuide() {
  const [data, setData] = useState([]); // ⬅️ use array, not string
  const [loading, setLoading] = useState(false);

  const handler = async () => {
    setLoading(true);
    try {
      console.log(`Fetching data from ${apis.beginner_guide}`);
      const res = await axios.get(`${apis.beginner_guide}`);
      if (res?.data?.status === 200) {
        setData(res?.data?.data);
        console.log(res?.data?.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handler();
  }, []);

  return (
    <div className="text-white opacity-90 p-4 pb-20 text-xs">
      {loading && <Loader setLoading={setLoading} loading={loading} />}
      {/* <h1 className="font-extrabold text-white text-sm text-center py-6">
        Beginner's Guide
      </h1> */}

      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className=" rounded-lg ">
            {/* <h2 className="text-base font-bold mb-2">{item.name}</h2> */}
            <div
              className="prose prose-sm prose-invert"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
            <img
              src={item.image}
              alt={item.name}
              className="w-full max-w-sm mx-auto rounded-md mb-3"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BeginnersGuide;
