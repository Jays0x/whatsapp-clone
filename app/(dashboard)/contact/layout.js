import ContactList from "@/components/dashboard/contact/ContactList";
import contactData from "@/components/dashboard/contact/data";


export default function ContactLayout({ children }) {
    return (
        <div className="flex items-center">

            <div className="bg-[var(--component)] w-[550px] border-r border-[var(--border)] h-[100vh]">
               <ContactList />
            </div>
            
            <div className="flex w-full justify-center items-center">{children}</div>
        </div>
    );
}