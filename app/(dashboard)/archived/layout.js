import ArchivedList from "@/components/dashboard/archived/ArchivedList"

export default function StarredLayout ({ children }) {
    return (
        <div className="flex flex-row h-screen">
            <div className="w-[450px] h-[100vh] bg-[var(--component)] border-r border-[var(--border)]">
                <ArchivedList />
            </div>
            <div className="w-full">{children}</div>
        </div>
    )
}