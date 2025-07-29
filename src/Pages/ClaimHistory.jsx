import { useEffect, useState } from 'react'
import { format } from "date-fns"
import toast from 'react-hot-toast';
import { TbCoinFilled } from 'react-icons/tb';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

// defining limit globally
const LIMIT = 10;

const ClaimHistory = () => {

  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  async function fetchClaims() {

    try {
      setLoading(true)
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/claim/history?skip=${skip}&limit=${LIMIT}`)
      const { pastClaims, totalClaims } = response.data;

      if (pastClaims) {
        setClaims(prev => [...prev, ...pastClaims]);
        setSkip(prev => prev + LIMIT);
        // if all claims fetched
        if (claims.length + pastClaims.length >= totalClaims) {
          setHasMore(false);
        }
      }

    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchClaims();
  }, [])


  return (
    <div className='p-4'>
      <h2 className='text-xl font-semibold text-gray-500'>Past Claims</h2>

      <div className="claim-list">
        {claims.length > 0

          && claims.map((item) =>
            <div key={item.rank} className='flex items-center justify-between px-2 py-1 border-b border-gray-200 hover:bg-gray-100'>

              <div className='flex items-center gap-2'>
                <div
                  className="avatar h-8 w-8 font-bold bg-cyan-100/50 text-cyan-300 rounded-full flex items-center justify-center overflow-hidden">
                  {item?.userId?.imageUrl
                    ? <img src={item?.userId?.imageUrl} alt={item?.userId?.username} className='object-cover w-full h-full' />
                    : item?.userId?.username.slice(0, 1).toUpperCase()}
                </div>
                <span className="name text-sm truncate max-w-[80%]">{item?.userId.username}</span>
              </div>
              <div className='date text-black text-[9px]'>
                <div className='flex items-center gap-1 justify-end'><TbCoinFilled size={"18px"} color='#F7BE32' /> <span className='text-yellow-600 text-[14px]'>{item?.pointsClaimed}</span></div>
                {format(new Date(item.claimedAt), "HH:mm")} <span className='text-gray-500'>{format(new Date(item.claimedAt), "dd/MM/yy")}</span></div>

            </div>)
        }

        {/* loadmore button */}
        <div className='flex justify-center mt-4'>
          <button
            disabled={!hasMore}
            onClick={fetchClaims}
            className='border border-gray-300 text-sm text-gray-800 disabled:opacity-50 px-3 py-1 rounded cursor-pointer hover:bg-gray-100'
          >{loading ? <span className='flex gap-1 items-center'><ClipLoader size={"15px"} color='gray'/><span>loading...</span></span> : "Load More"}</button>
        </div>
      </div>

    </div>
  )
}

export default ClaimHistory