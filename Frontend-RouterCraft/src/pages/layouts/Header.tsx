import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Switch} from "@/components/ui/switch.tsx";
import {ApiInstance} from "@/Services/Api.ts";
import {Link} from "react-router-dom";
import {IoIosLogOut, IoMdCog, IoMdContact, IoMdNotificationsOutline} from "react-icons/io";

interface HeaderProps {
    selectedOption: string;
}


const Header = ({selectedOption}: HeaderProps) => {
    const handleLogout = () => {
        const response = ApiInstance.post('/logout');
        console.log(response);
        localStorage.removeItem('token');
        alert('Sesión cerrada');
    };

    return (
        <header className="h-full bg-gray-700 text-white p-2 flex justify-between items-center relative">
            <h1 className="p-1 text-2xl font-sans font-semibold absolute left-1/2 transform -translate-x-1/2">{selectedOption}</h1>
            <div className="flex justify-end ml-auto">
                <div className={"mr-5 my-auto p-1 border rounded-full"}>
                    <IoMdNotificationsOutline className={"w-6 h-6"} />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger className="pr-2">
                        <Avatar>
                            <AvatarImage
                                src="https://lh3.googleusercontent.com/a/ACg8ocLx-3WB24PHBKweQeUcuigjE8BAcyQDTlIspkZP5sUXC1eqM6D_=s360-c-no"
                                alt="Avatar"/>
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-4 w-40">
                        <DropdownMenuLabel className="flex items-center"><IoMdContact className="w-6"/> My
                            account</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuLabel className="flex items-center justify-between">DarkMode <Switch/>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuLabel className="flex items-center justify-start">
                            <IoMdCog className="w-6"/> Settings
                        </DropdownMenuLabel>
                        <DropdownMenuLabel><Link to="/" className="cursor-pointer flex items-center"
                                                 onClick={handleLogout}>
                            <IoIosLogOut className="w-6"/> Logout
                        </Link></DropdownMenuLabel>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};

export default Header;
