import axios from 'axios'
import { useEffect, useState } from 'react'
import apis from '../../utils/apis'
import Loader from '../../reusable_component/Loader/Loader'

function AboutUsChild() {
  const [data, setData] = useState("")
  const [loading, setLoading] = useState(false);
  const type = localStorage.getItem("abousType")
  const handler = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${apis.about_us}${type}`)
      if (res?.data?.status === 200) {
        setLoading(false)
        setData(res?.data?.data)
      }
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }
  useEffect(() => {
    handler()
  }, [])
  return (
    <div className='text-white opacity-55 p-2 pb-20 text-xs'>
      {loading && <Loader setLoading={setLoading} loading={loading} />}
      <h1 className='font-extrabold text-white text-sm text-center py-10'>{data[0]?.name}</h1>
      <div dangerouslySetInnerHTML={{ __html: data[0]?.description }} /></div>
  )
}

export default AboutUsChild