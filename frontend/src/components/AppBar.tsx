import { Link, useNavigate } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const Appbar = () => {
    const navigate = useNavigate();
    return(
        <div className="flex justify-between px-10 py-4 border-b">
            <Link to={'/blogs'} className="font-semibold flex justify-center flex-col">
                Medium
            </Link>
            
            <div className="flex">
                <button onClick={()=>{
                    navigate('/publish')
                }} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mr-8">
                    Publish
                </button>

                <Avatar name={
                    localStorage.getItem("name") || "A"
                } size="big"/>
            </div>
        </div>
    )
}