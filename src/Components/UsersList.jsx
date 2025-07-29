import { IoAdd } from 'react-icons/io5';
import { useFetch } from '../custom-hooks/useFetch.js';
import toast from 'react-hot-toast';
import { ClipLoader, PulseLoader } from "react-spinners";
import { useEffect } from 'react';
import { useState } from 'react';
import AddUserDialog from './AddUserDialog.jsx';
import axios from 'axios';

const UsersList = () => {

    const { data, loading, error } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/api/users`);
    const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
    const [claimloading, setClaimLoading] = useState(false);
    const [userClaiming, setUserClaiming] = useState("");

    const [usersList, setUsersList] = useState([]);
    useEffect(() => {
        if (data && !loading) setUsersList(data?.users);

    }, [data, loading])

    if (!loading && error) toast.error(error);
    if (loading) return <div className='w-full flex justify-center items-center pt-24 text-gray-400'><ClipLoader size={"20px"} color='#27C3D6' className='mr-2' />Loading Users...</div>

    async function handleAddUser(){
        setAddUserDialogOpen(true);
    }

    async function handlePointsClaim(userId, username) {
        try {
            setClaimLoading(true);
            setUserClaiming(userId);
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/claim`,{userId});
            const pointsEarned = response.data.points;
            if(response.data.points > 6){
                toast.success(`Congrats ${username}! You Earned ${pointsEarned} points.🎉🎉🎉`, {position:"top-center"})
            }
            else if (response.data.points > 1){
                toast.success(`${`Great ${username}! You Earned ${pointsEarned} points.`}`, {position:"top-center"})
            }else{
                toast.success(`${`Better Luck Next Time ${username}! You Earned ${pointsEarned} points.`}`, {position:"top-center"})
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "something went wrong!");
        } finally{
            setClaimLoading(false);
            setUserClaiming("");
        }
    }

    return (
        <div>

            <div className='flex justify-between items-center mb-3'>
                <h2 className='text-lg font-semibold'>All Users</h2>
                <button
                    onClick={handleAddUser}
                    className='text-sm flex items-center text-cyan-500 bg-cyan-100 cursor-pointer hover:bg-cyan-200 py-1 px-3 rounded'>
                    <IoAdd size={"18px"} color='#27C3D6' />
                    Add User
                </button>
            </div>

            <div className="list">
                {!loading && usersList.length>0
                    ? usersList.map(user => <div key={user._id} className='flex items-center justify-between px-2 py-2 border-b border-gray-200 hover:bg-gray-100'>

                        <div className='flex items-center gap-1'>
                            <div 
                            className="avatar h-8 w-8 font-bold bg-cyan-100/50 text-cyan-300 rounded-full flex items-center justify-center overflow-hidden">
                                {user?.imageUrl 
                                ? <img src={user?.imageUrl} alt={user.username} className='object-cover w-full h-full'/> 
                                : user.username.slice(0, 1).toUpperCase()}
                            </div>
                            <span className="name">{user.username}</span>
                        </div>

                        <button 
                        disabled={claimloading}
                        onClick={() => handlePointsClaim(user._id, user.username)}
                        className='text-sm bg-cyan-500 text-white py-1 px-2 rounded cursor-pointer hover:bg-cyan-400'>{claimloading && userClaiming===user._id ? <PulseLoader size={"6px"} color='white'/> : "Claim"}</button>
                    </div>)
                    : <p className='text-gray-400 font-semibold mt-8'>No Users Found!</p>
                }
            </div>

            {addUserDialogOpen && <AddUserDialog setAddUserDialogOpen={setAddUserDialogOpen} setUsers={setUsersList}/> }

        </div>
    )
}

export default UsersList