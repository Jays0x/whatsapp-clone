import StarredList from "@/components/dashboard/starred/StarredList"
export default function StarredLayout ({ children }) {
    return (
        <div className="flex flex-row h-screen">
            <div className="w-[450px] h-[100vh] bg-[var(--component)] border-r border-[var(--border)]">
                <StarredList />
            </div>
            <div className="w-full">{children}</div>
        </div>
    )
}