import { Link, useLocation } from 'react-router-dom'
import { IoHome } from "react-icons/io5";
import { MdLeaderboard } from "react-icons/md";
import { FaHistory } from "react-icons/fa";


const Footer = () => {

    const location = useLocation();

    const tabs = [
        {
            route: "/",
            name: "Home",
            icon: <IoHome size={"20px"} color='#27C3D6' />
        },
        {
            route: "/leaderboard",
            name: "Leaderboard",
            icon: <MdLeaderboard size={"20px"} color='#27C3D6' />
        },
        {
            route: "/claim-history",
            name: "History",
            icon: <FaHistory size={"20px"} color='#27C3D6' />
        },
    ]

    return (
        <footer className='min-w-full h-12 border-t border-cyan-200 flex'>

            {tabs.map(tab =>{

                const activeTab = location.pathname === tab.route;

                return (<Link 
                key={tab.name} to={tab.route} 
                className={`w-1/3 flex flex-col items-center justify-center text-cyan-500 text-sm 
                            ${activeTab ? "border-t-2 border-cyan-200 rounded-lg -translate-y-1 bg-cyan-100 duration-300" : ""}`}>
                        
                        <span>{tab.icon}</span>
                        <span>{tab.name}</span>
                </Link>)})}

        </footer>
    )
}

export default Footer