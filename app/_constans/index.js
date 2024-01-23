import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Profile from "../_components/common/Profile";

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
        path: "/profile",
        icon: <PersonOutlinedIcon sx={{ fontSize: "20px" }} />,
        lable: "Profile",
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
