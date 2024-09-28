import { ChangeEvent, useState } from "react"
import Quote from "../components/Quote"
import { Link, useNavigate } from "react-router-dom"
import { SignupInput } from "@saha_belam/medium-common"
import axios from "axios"
import { REACT_APP_BACKEND_URL } from "@/config"

const Signup = () => {
    const [postInput, setPostInput] = useState<SignupInput>({
        name:'',
        username:'',
        password:''
    })  
    const navigate = useNavigate()

    const handleSignup = async()=> {
        try{
            const response = await axios.post<{ token: string }>(`${REACT_APP_BACKEND_URL}/api/v1/user/signup`,postInput)
            const token = response.data.token
            localStorage.setItem("token",token)
            navigate('/blog')
        }catch(e){
            console.error(e)
        }

    }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div >
                    <div className="px-10">
                        <div className="mb-2 text-3xl font-bold">
                            Create an account
                        </div>
                        <div className="text-md text-slate-500">
                            Already have an account? <Link className="ml-2 underline" to={"/signin"} >Login</Link> 
                        </div>
                    </div>
                    <div className="mt-7">
                        <LabelInput label="Name" type="text" placeholder="Type your name" onChange={(e)=>{
                            setPostInput({
                                ...postInput,
                                name: e.target.value
                            })
                        }}/>
                        <LabelInput label="Email" type="text" placeholder="Type your Email" onChange={(e)=>{
                            setPostInput({
                                ...postInput,
                                username: e.target.value
                            })
                        }}/>
                        <LabelInput label="Password" type="password" placeholder="Type your name" onChange={(e)=>{
                            setPostInput({
                                ...postInput,
                                password: e.target.value
                            })
                        }}/>
                        <button onClick={handleSignup} type="button" className="mt-4 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Submit</button>

                    </div>
                </div>
            </div>
        </div>
        <div className="hidden lg:block">
            <Quote /> 
        </div>
    </div>
  )
}

interface LabelInput{
    label: string,
    placeholder: string,
    type?: string,
    onChange: (e: ChangeEvent<HTMLInputElement>)=>void
}

function LabelInput({label, placeholder, onChange, type}:LabelInput){
    return <div>
        <div className="mt-2">
        <label className="block mb-2 text-sm font-bold text-gray-90" >{label}</label>
            <input onChange={onChange} type={type} className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
    </div>
}

export default Signup
