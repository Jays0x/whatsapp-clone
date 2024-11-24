

import firstData from "@/components/dashboard/sidebar/data";
import secondData from "@/components/dashboard/sidebar/SecondData";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";


export default function AuthLayout({ children }) {
    return (
        <div className="flex items-center w-full">
        
            <div className="flex">
                <div className="bg-[var(--background)] h-[100vh] w-[80px] px-2">
                     <Sidebar first={firstData} second={secondData}/>   
                </div>
            </div>

            <div className="w-full h-[100vh] bg-[var(--component)]">{children}</div>
        </div>
    );
}