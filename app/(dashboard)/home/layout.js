import ChatList from "@/components/dashboard/chat/ChatList";


export default function ChatLayout ({ children }){
    return (
        <div className="flex flex-row h-screen" >
            <div className="w-[450px] h-[100vh] bg-[var(--component)]">
                <ChatList />
            </div>
            <div className="w-full">{children}</div>
        </div>
    )
}