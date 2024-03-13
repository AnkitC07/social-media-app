import Link from "next/link";
import { useContext } from "react";
import { PostContext } from "../../_context/Post";

const ProfileLink = ({ key = 0, href, className = '', onclick = () => { }, children }) => {
    const {setProfile} = useContext(PostContext)
    return (
        <Link
            key={key}
            href={href}
            className={className}
            onClick={() => {
                console.log('ProfileLink')
                // setProfile({
                //     tweets: []
                // });
                onclick();
            }}
        >
            {children}
        </Link>
    );
};

export default ProfileLink;
