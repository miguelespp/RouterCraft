import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar.tsx";

interface HeaderProps {
    selectedOption: string;
  }

const Header = ({ selectedOption }:HeaderProps) => {
    return (
      <header className="h-full bg-gray-700 text-white p-2 flex justify-center content-center">
        <h1 className={"flex-grow p-2"}>{selectedOption}</h1>
          <Avatar className={"p-0"}>
            <AvatarImage src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="Avatar" />
              <AvatarFallback>CN</AvatarFallback>

          </Avatar>
      </header>
    );
  };
  
  export default Header;
