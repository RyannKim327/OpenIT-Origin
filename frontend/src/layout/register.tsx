import Input from "../widget/input";

export default function SignUp(){
    return (
        <div className="flex flex-col justify-center items-center w-full h-full p-4 sm:p-8 bg-[#f9f9f9]">
            <div className="flex flex-col bg-white rounded-[15px] shadow-xl px-6 py-8 sm:px-8 sm:py-12 w-full max-w-sm sm:max-w-md lg:max-w-lg xl:w-1/3 gap-4 transform hover:scale-105 transition-transform duration-300">
                <h1 className="text-center poppins text-2xl sm:text-3xl lg:text-4xl font-bold">Quake<span className="font-semibold text-[#CE2503]">Watch</span></h1>
                <h3 className="text-center text-sm sm:text-sm mb-5  text-[#52525c]">Monitor seismic activity, track earthquake events, and generate reports.</h3>
                <Input label="USERNAME" type="username" key="username"/>
                <Input label="EMAIL" type="email"  key="email"/>
                <Input label="PASSWORD" type="password"  key="password"/>
                <Input label="CONFIRM PASSWORD" type="password"  key="username"/>
                <button className="bg-[#CE2503] text-white p-3 sm:p-2 rounded-[10px] font-bold mt-4 w-full" >Sign Up</button>
                <p className="text-center text-xs sm:text-sm text-gray-600">
                    Already have an account? <a href="login" className="text-[#047BFB] hover: font-medium">Login</a>
                </p>
            </div>
        </div>
    )
}