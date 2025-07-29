import React, { useEffect } from 'react'
import { useFetch } from '../custom-hooks/useFetch'
import {format} from "date-fns"
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';
import { TbCoinFilled } from 'react-icons/tb';

const ClaimHistory = () => {

  const { data, loading, error } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/api/claim/history`);

  useEffect(() => {
    if (!loading && data) console.log(data.pastClaims);

  }, [data, loading])

  if (!loading && error) toast.error(error);
  if (loading) return <div className='w-full flex justify-center items-center pt-24 text-gray-400'><ClipLoader size={"20px"} color='#27C3D6' className='mr-2' />Loading Leaderboard stats...</div>
  

  return (
    <div className='p-4'>
      <h2 className='text-xl font-semibold text-gray-500'>Past Claims</h2>

      <div className="claim-list">
        {!loading && data?.pastClaims

          ? data.pastClaims.map((item) =>
            <div key={item.rank} className='flex items-center justify-between px-2 py-1 border-b border-gray-200 hover:bg-gray-100'>

              <div className='flex items-center gap-2'>
                <div
                  className="avatar h-8 w-8 font-bold bg-cyan-100/50 text-cyan-300 rounded-full flex items-center justify-center overflow-hidden">
                  {item?.userId?.imageUrl
                    ? <img src={item?.userId?.imageUrl} alt={item?.userId?.username.slice(0, 1).toUpperCase()} className='object-cover w-full h-full' />
                    : item?.userId?.username.slice(0, 1).toUpperCase()}
                </div>
                <span className="name text-sm truncate max-w-[80%]">{item?.userId.username}</span>
              </div>
              <div className='date text-black text-[9px]'>
                <div className='flex items-center gap-1 justify-end'><TbCoinFilled size={"18px"} color='#F7BE32' /> <span className='text-yellow-600 text-[14px]'>{item?.pointsClaimed}</span></div>
                {format(new Date(item.claimedAt), "HH:mm")} <span className='text-gray-500'>{format(new Date(item.claimedAt), "dd/MM/yy")}</span></div>

            </div>)

          : <div className='text-gray-400 font-semibold mt-24 text-center'>No Users found!</div>
        }
      </div>

    </div>
  )
}

export default ClaimHistory