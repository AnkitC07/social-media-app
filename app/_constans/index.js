import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Profile from "../_components/common/Profile";
import Modal from "../_components/common/Modal";
import Logout from "../profile/Logout"
import Link from 'next/link'



export const menu = [
    {
        path: "/",
        icon: <HomeOutlinedIcon />,
        lable: "Home",
    },
    {
        path: "/explore",
        icon: <VisibilityOutlinedIcon sx={{ fontSize: "20px" }} />,
        lable: "Explore",
    },
    {
        path: "/messages",
        icon: <TextsmsOutlinedIcon sx={{ fontSize: "20px" }} />,
        lable: "Messages",
    },
    {
        path: "/notifications",
        icon: <NotificationsNoneOutlinedIcon sx={{ fontSize: "20px" }} />,
        lable: "Notifications",
    },
    {
        path: "#",
        icon: <PersonOutlinedIcon sx={{ fontSize: "20px" }} />,
        lable: "Profile",
        comp:<Modal width={"w-[100px] bottom-[-65px] right-[-25px] !py-2 "}>
                <p className="flex flex-col text-[16px]">
                    <span className="border-b-[1px] pb-1 border-gray-800 text-white hover:text-tweet-blue">Setting</span>
                    <span className="border-b-[1px] pb-1 border-gray-800 text-white hover:text-tweet-blue"><Link href='/profile'>Profile</Link></span>
                    <span className="text-white hover:text-tweet-blue"><Logout/></span>
                </p>
            </Modal>
    },
    // {
    //     path: "/more",
    //     icon: <MoreHorizOutlinedIcon sx={{ fontSize: "20px" }} />,
    //     lable: "More",
    // },
];
export const bottomMenu = [
    {
        path: "/",
        icon: <HomeOutlinedIcon sx={{ fontSize: "30px" }} />,
    },
    {
        path: "/explore",
        icon: <VisibilityOutlinedIcon sx={{ fontSize: "30px" }} />,
    },
    {
        path: "/notifications",
        icon: <NotificationsNoneOutlinedIcon sx={{ fontSize: "30px" }} />,
    },
    {
        path: "/profile",
        icon: <Profile src={"/assets/User.jpeg"} w={25} h={25} />,
    },
];
