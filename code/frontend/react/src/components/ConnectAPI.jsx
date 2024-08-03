export default function ConnectAPI() {
    return (
        <div className="shadow-md p-4 gap-3 flex flex-col w-full bg-white rounded-xl">
            <div className="text-gray-300 text-sm font-medium text-center">
                Skip sign-in by syncing your favourite account.
            </div>
            <button className="text-dark p-2 flex bg-gray-200 rounded-md">
                <div className="h-6 w-6 overflow-hidden flex items-center justify-center">
                    <img
                        className="h-7 block object-cover"
                        src="google.png"
                        alt=""
                    />
                </div>
                <div className="w-full items-center flex justify-center">
                    Connect with Google
                </div>
            </button>
            <button className="p-2 text-white flex bg-dark rounded-md">
                <div className=" h-6 w-6 overflow-hidden flex items-center justify-center">
                    <img
                        className="h-6 block object-cover"
                        src="apple-64.png"
                        alt=""
                    />
                </div>
                <div className="w-full items-center flex justify-center">
                    Connect with Apple
                </div>
            </button>
            <button className="p-2 text-white flex bg-[#1877F2] rounded-md">
                <div className="h-6 w-6 overflow-hidden flex items-center justify-center">
                    <img
                        className="h-6 block object-cover"
                        src="facebook.png"
                        alt=""
                    />
                </div>
                <div className="w-full items-center flex justify-center">
                    Connect with Facebook
                </div>
            </button>
        </div>
    );
}
