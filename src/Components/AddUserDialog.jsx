import React, { useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-hot-toast"
import axios from "axios"

const AddUserDialog = ({ setAddUserDialogOpen, setUsers }) => {

  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("profile", profile);

    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/add`, formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        })
      setUsers((prev) => ([...prev, response.data.User]));      // updating local user state to render ui with latest entries  
      toast.success(response.data.message);
      setAddUserDialogOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message);
    } finally{
      setLoading(false);
    }
  }

  return (
    <div className='absolute top-0 left-0 min-h-screen w-full bg-black/20 z-10 flex items-center justify-center backdrop-blur-xs'>

      <form
        onSubmit={handleSubmit}
        className="add-user-form w-64 h-72 bg-white rounded shadow-lg shadow-gray-400 px-3 py-4 space-y-2">

        <div
          onClick={() => setAddUserDialogOpen(false)}
          className="w-fit -mb-2 hover:bg-gray-200 p-1 rounded cursor-pointer duration-200"><RxCross1 size={"15px"} color='gray' /></div>

        <h2 className='text-lg font-semibold text-cyan-500 text-center'>Add a User</h2>

        {/* Username Input */}
        <div className="space-y-1">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-600"
          >
            Username
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            type="text"
            placeholder="johndoe21..."
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        {/* Profile Pic Upload */}
        <div className="space-y-1">
          <label
            htmlFor="profile"
            className="block text-sm font-medium text-gray-600"
          >
            Profile Picture
          </label>
          <div className="relative w-full">
            <input
              id="profile"
              type="file"
              className="block w-full text-sm text-gray-500 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-cyan-100 file:text-cyan-700 hover:file:bg-cyan-200"
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className='flex justify-center'>
          <button
            disabled={loading}
            type="submit"
            className="w-2/3 mt-6 bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 rounded transition"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>

      </form>
    </div>
  )
}

export default AddUserDialog