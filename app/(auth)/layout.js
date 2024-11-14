
import Navbar from "@/components/auth/Navbar";

export default function AuthLayout({ children }) {
    return (
        <div className="flex flex-col items-center">
            <Navbar />
            <div>{children}</div>
        </div>
    );
}