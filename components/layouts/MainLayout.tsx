import { ReactNode } from "react";
import Image from "next/image";

interface MainLayoutProps {
    children?: ReactNode
}


const MainLayout: React.FC<MainLayoutProps> = ({children}) =>{
    return(
        <div className="min-h-screen bg-gray-900 text-white">
            <header className="flex justify-center items-center bg-black h-52">
            <Image src="/todoLogo.svg" alt="ToDo Logo" width={200} height={100} />
            </header>
            {children}
        </div>
    );
}


export default MainLayout;