import React from "react";
import Image from "next/image";

const Profile = ({ src, w, h }) => {
    return (
        <div className="profile w-12">
            {src ? (
                <Image src={src} alt="Profle Photo" width={w} height={h} className="rounded-full" />
            ) : (
                <Image src={'https://res.cloudinary.com/deyq54d8b/image/upload/v1707136917/Social-Media-App/default-profile.jpg'} alt="Profle Photo" width={w} height={h} className="rounded-full" />
            )}
        </div>
    );
};

export default Profile;
