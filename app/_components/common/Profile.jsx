import React from "react";
import Image from "next/image";

const Profile = ({ src, w, h }) => {
    return <Image src={src} alt="Profle Photo" width={w} height={h} className="rounded-full" />;
};

export default Profile;
