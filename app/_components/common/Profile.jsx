import React from "react";
import Image from "next/image";

const Profile = ({ src, w, h }) => {
    return <div className="w-12"> <Image src={src} alt="Profle Photo" width={w} height={h} className="rounded-full" /></div>;
};

export default Profile;
