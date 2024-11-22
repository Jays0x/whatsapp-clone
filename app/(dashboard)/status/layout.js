import StatusList from "@/components/dashboard/status/StatusList";



export default function ChatLayout ({ children }){
    return (
        <div className="flex flex-row h-screen" >
            <div className="w-[450px] h-[100vh] bg-[var(--component)] border-r border-[var(--border)]">
               <StatusList />
            </div>
            <div className="w-full">{children}</div>
        </div>
    )
}