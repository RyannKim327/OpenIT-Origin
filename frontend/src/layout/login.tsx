import Input from "../widget/input";

export default function Login(){
    return (
        <div className="flex flex-col justify-center items-center w-full h-full p-4 sm:p-8 bg-[#f9f9f9]">
            <div className="flex flex-col bg-white rounded-[15px] shadow-xl px-6 py-8 sm:px-8 sm:py-12 w-full max-w-sm sm:max-w-md lg:max-w-lg xl:w-1/3 gap-4 transform hover:scale-105 transition-transform duration-300">
                <h1 className="text-center poppins text-2xl sm:text-3xl lg:text-4xl font-bold">Quake<span className="text-[#CE2503]">Watch</span></h1>
                <h3 className="text-center text-sm sm:text-sm mb-5 text-[#52525c]">Monitor seismic activity, track earthquake events, and generate reports.</h3>
                <Input label="USERNAME" />
                <Input label="PASSWORD" type="password" />
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center -mt-2 gap-2 sm:gap-0">
                    <label className="flex items-center gap-2 text-xs sm:text-sm">
                        <input type="checkbox" className="rounded ml-2" />
                        Remember me?
                    </label>
                    <a href="#" className="text-xs sm:text-sm text-blue-600 hover:text-blue-800">Forgot password?</a>
                </div>
                <button className="bg-[#CE2503] text-white p-3 sm:p-2 rounded-[10px] font-bold mt-4 w-full" >Log In</button>
                <p className="text-center text-xs sm:text-sm text-gray-600">
                    Don't have an account? <a href="/signup" className="text-blue-600 hover:text-blue-800 font-medium">Register</a>
                </p>
            </div>
        </div>
    )
}