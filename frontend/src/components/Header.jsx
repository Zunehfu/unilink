import HeaderItem from "./HeaderItem";
import Logo from "./Logo";

export default function Header({ toggleProfile }) {
    return (
        <div className="flex fixed z-0 top-0 left-0 right-0 bg-white shadow-sm">
            <div className="w-fit mb-2">
                <Logo />
            </div>
            <div className="flex justify-evenly w-full mb-2">
                <HeaderItem toggleProfile={toggleProfile} item="Profile" />
                <HeaderItem toggleProfile={toggleProfile} item="Posts" />
                <HeaderItem toggleProfile={toggleProfile} item="Friends" />
                <HeaderItem toggleProfile={toggleProfile} item="Messages" />
            </div>
        </div>
    );
}
