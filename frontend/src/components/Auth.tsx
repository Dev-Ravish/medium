import { SignupInput } from "@ravish61/medium-zod"
import axios from "axios"
import { ChangeEvent, useState } from "react"
import { Link,  useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"

export const Auth = ({type}:{type: "signup" | "signin"}) => { 

    const [authSignup, setAuthSignup] = useState<SignupInput>({
        email: "",
        password: "",
        name: ""
    })
    const navigate = useNavigate();
    async function handleSignup(){
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"? "signup" : "signin"}`, authSignup);
            const res =  response.data;
            console.log(res)
            localStorage.setItem("jwt", res.jwt);
            localStorage.setItem("name", res.name);
            navigate("/blogs")
        }catch(e){
            //alert user about the error
            alert(`Error: ${e}`);
        }

    }
    return <div className=" h-screen flex flex-col justify-center px-4">
                <div className=" flex justify-center">
                    <div className="max-w-lg">
                        <div className="text-3xl font-bold text-center px-12">
                            { type === "signup" ? "Create an account" : "Login to account!"}
                        </div>
                        <div className="text-md font-normal text-slate-500 text-center">
                            {type === "signup" ? "Already have an account?" : "Don't have an account?"} <Link to={type === "signup"? "/signin":"/signup"} className="underline">{type === "signup" ?"Login" : "Sign Up"}</Link>
                        </div>
                        { type === "signup" && <div className="pt-4">
                            <AuthInput label="Username" placeholder="Ravish Kumar" onChange={(e) => {
                                setAuthSignup({
                                    ...authSignup,
                                    name: e.target.value
                                })
                            }}/>
                        </div>}
                        <div className="pt-4">
                            <AuthInput label="Email Id" placeholder="ravishkr.talk@gmail.com" onChange={(e) => {
                                setAuthSignup({
                                    ...authSignup,
                                    email: e.target.value
                                })
                            }}/>
                        </div>
                        <div className="pt-4">
                            <AuthInput label="Password" placeholder="1234512345" type="password" onChange={(e) => {
                                setAuthSignup({
                                    ...authSignup,
                                    password: e.target.value
                                })
                            }}/>
                        </div>
                        <div className="pt-4">
                            <button onClick={handleSignup} type="button"  className="text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-full">{type === "signup" ? "Sign Up" : "Sign In"}</button>

                        </div>
                    </div>
                    
                </div>
    </div>
}

interface AuthInputProps {
    label: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void, 
    type?: string
}


function AuthInput({label, placeholder, onChange, type}:AuthInputProps){
    return <div>
            <label className="block mb-2 text-sm  text-black font-semibold">{label}</label>
            <input onChange={onChange} type={type? type : "text"}  id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
    </div>
}