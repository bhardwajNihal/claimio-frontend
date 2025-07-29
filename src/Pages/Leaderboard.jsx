import React from 'react'
import { useFetch } from '../custom-hooks/useFetch'
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';
import { TbCoinFilled } from "react-icons/tb";
import { FaTrophy } from "react-icons/fa6";


const Leaderboard = () => {

  const { data, loading, error } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/api/leaderboard`)
  console.log(data);

  if (!loading && error) toast.error(error);
  if (loading) return <div className='w-full flex justify-center items-center pt-24 text-gray-400'><ClipLoader size={"20px"} color='#27C3D6' className='mr-2' />Loading Leaderboard stats...</div>

  return (
    <div className='p-4'>
      <h2 className='text-xl font-semibold text-gray-500'>Leaderboard</h2>

    {/* displying top-3 */}
        {!loading && data?.leaderboard &&
          <div className="top-scorers flex justify-center items-end gap-1 mt-4 mb-8">

            {[1, 0, 2].map((rank, idx) => {            // looping through the custom array, to display ranks in that order
              const user = data.leaderboard[rank];
              if (!user) return null;

              const rankColors = ["bg-gray-400", "bg-yellow-400", "bg-orange-400"];
              const styles = [ "shadow-md shadow-gray-200", "shadow-lg shadow-yellow-300 -translate-y-5 -mx-2 bg-white", "shadow-md shadow-orange-600/30"]

              return (
                <div key={user.rank} className={`flex flex-col ${styles[idx]} items-center text-center w-1/3 p-2 py-4 rounded-lg `}>

                  
                  <div className={`avatar relative w-18 h-18 rounded-xl overflow-hidden border-4 border-white shadow-lg`}>
                    {user.rank===1 && <div className='absolute '><FaTrophy size={"25px"} color='#F7BE32'/></div>}
                    {user.profile
                      ? <img src={user.profile} alt={user.username} className='object-cover w-full h-full' />
                      : <div className="flex justify-center items-center h-full text-xl font-bold text-cyan-700 bg-cyan-100">{user.username[0].toUpperCase()}</div>
                    }
                  </div>
                  <div className="mt-1 text-sm font-semibold text-gray-700 truncate max-w-[90%]">{user.username}</div>
                  <div className="flex items-center text-sm text-gray-600">
                    <TbCoinFilled size="16px" color="#F7BE32" className="mr-1" />
                    {user.totalPoints}
                  </div>
                  <div className={`text-xs mt-1 px-2 py-0.5 rounded-full text-white ${rankColors[idx]}`}>
                    #{user.rank}
                  </div>
                </div>
              );
            })}
          </div>}
     
    {/* rest in the list */}
      <div className="rest-list">
        {!loading && data?.leaderboard
          ? data.leaderboard.slice(3).map((item) =>
            <div key={item.rank} className='flex items-center justify-between px-2 py-1 border-b border-gray-200 hover:bg-gray-100'>

              <div className='flex items-center gap-2 overflow-hidden w-full'>
                <span className='font-semibold text-cyan-700 w-6 my-1'>{item.rank}</span>
                <div
                  className="avatar h-8 w-8 font-bold bg-cyan-100/50 text-cyan-300 rounded-full flex items-center justify-center overflow-hidden">
                  {item?.profile
                    ? <img src={item?.profile} alt={item.username.slice(0, 1).toUpperCase()} className='object-cover w-full h-full' />
                    : item.username.slice(0, 1).toUpperCase()}
                </div>
                <p className="name text-sm truncate max-w-[60%]">{item.username}</p>
              </div>
              <div className='points flex gap-1 items-center text-gray-700'><TbCoinFilled size={"22px"} color='#F7BE32' />{item.totalPoints}</div>

            </div>)
          : <div className='text-gray-400 font-semibold mt-24 text-center'>No Users found!</div>
        }
      </div>
    </div>
  )
}

export default Leaderboard