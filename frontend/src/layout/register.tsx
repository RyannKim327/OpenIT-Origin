import { useState } from "react";
import Input from "../widget/input";
import { upost } from "../utils/api";
import { useNavigate } from "react-router";

export default function SignUp(){
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPS, setConfirmPS] = useState('')
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [middle_name, setMiddleName] = useState('')
    const navigate = useNavigate();

    const handleRegister = async(e) => {
        e.preventDefault();
        console.log(password)
        console.log(confirmPS)
        if (password !== confirmPS){
            alert("Password doesnt match")
            return;
        }

        const response = await upost(`/api/user/register/`,{
            username,
            email,
            password,
            first_name,
            last_name,
            middle_name
        })

        if (response.data){
            alert(`${response.message}`)
            navigate("/")
        }
        else{
            alert(`Registration failed`)
            console.log(response)
        }

    }

    return (
        <div className="flex flex-col justify-center items-center w-full h-500 p-4 sm:p-8 bg-[#f9f9f9]">
                <div className="flex flex-col bg-white rounded-[15px] shadow-xl px-6 py-8 sm:px-8 sm:py-12 w-full max-w-sm sm:max-w-md lg:max-w-lg xl:w-1/3 gap-4 transform hover:scale-105 transition-transform duration-300">
                    <form onSubmit={handleRegister}>
                    <h1 className="text-center poppins text-2xl sm:text-3xl lg:text-4xl font-bold">Quake<span className="font-semibold text-[#CE2503]">Watch</span></h1>
                    <h3 className="text-center text-sm sm:text-sm mb-5  text-[#52525c]">Monitor seismic activity, track earthquake events, and generate reports.</h3>
                    <Input label="USERNAME" type="username" key="username" onChange={(e)=>{setUsername(e.target.value)}}/>
                    <Input label="EMAIL" type="email"  key="email" onChange={(e)=>setEmail(e.target.value)}/>
                    <Input label="PASSWORD" type="password"  key="password" onChange={(e)=>setPassword(e.target.value)}/>
                    <Input label="CONFIRM PASSWORD" type="password"  key="confirm" onChange={(e)=>setConfirmPS(e.target.value)}/>
                    
                    <Input label="FIRST NAME" type="text"  key="first name" onChange={(e)=>setFirstName(e.target.value)}/>
                    <Input label="LAST NAME" type="text"  key="last name" onChange={(e)=>setLastName(e.target.value)}/>
                    <Input label="MIDDLE NAME" type="text"  key="middle name" onChange={(e)=>setMiddleName(e.target.value)}/>

                    <button className="bg-[#CE2503] text-white p-3 sm:p-2 rounded-[10px] font-bold mt-4 w-full" >Sign Up</button>
                    <p className="text-center text-xs sm:text-sm text-gray-600">
                        Already have an account? <a href="login" className="text-[#047BFB] hover: font-medium">Login</a>
                    </p>
                    </form>
                </div>
        </div>
    )
}