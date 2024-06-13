import Logo from "./Logo";
export default function Header() {
    return (
        <div className="h-14 bg-dark sticky text-white flex justify-between">
            <div className="ml-1 my-auto">
                <Logo />
            </div>
            <div className="md:hidden mr-2 flex items-center font-normal font-[Lexend] text-sm tracking-wider">
                <i className="cursor-pointer fa-solid fa-bell mr-5 scale-125"></i>
                <i className="cursor-pointer fa-solid fa-gear scale-125"></i>
            </div>
        </div>
    );
}
