import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { TbSquareRoundedPlus2 } from "react-icons/tb";
import { FaRegStar } from "react-icons/fa";


const firstData = [
  {
    title: 'Chats',
    link: '/home',
    icon: <IoChatboxEllipsesOutline /> // Wrap in JSX
},
{
    title: 'Contact',
    link: '/contact',
    icon: <HiOutlineMail />
},
{
    title: 'Status',
    link: '/status',
    icon: <TbSquareRoundedPlus2 />
},
{
    title: 'Starred',
    link: '/starred',
    icon: <FaRegStar />
}
];


export default firstData ;


