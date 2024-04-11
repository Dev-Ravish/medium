import { useState } from "react"
import { Appbar } from "./AppBar"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const PublishBlog = () =>{
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    return(
        <div>
            <Appbar/>
            <div className="flex flex-row justify-center m-8 ">
                <div className="w-full max-w-lg ">
                    <div>
                        <input type={ "text"}
                        onChange={(e)=>{
                            setTitle(e.target.value)
                        }}
                        id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l outline-none block w-full p-2.5 " placeholder={"Title"} required />
                    </div>

                    <div className="mt-4">
                        <textarea id="editor"
                        onChange={(e)=>{
                            setContent(e.target.value)
                        }} 
                        rows={8} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l outline-none block w-full p-2.5" placeholder="Write an article..." required ></textarea>

                        <PublishButton onClick = {  () => {
                            axios.post(`${BACKEND_URL}/api/v1/blog`, {
                                title,
                                content
                            },{
                                headers:{
                                    Authorization: `${localStorage.getItem("jwt")}`
                                }
                            }) 
                            .then(res => {
                                const id = res.data.id;

                                navigate('/blog/'+id);
                            })
                        }}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

function PublishButton( {onClick}: {onClick: ()=>void}){
    return(
        <button onClick={onClick}  className=" mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring focus:ring-blue-200  hover:bg-blue-800">
                Publish post
        </button>
    )
}