import ProfileLeftSetting from './ProfileLeftSetting'

export default function ProfileLayout({ children }) {
  
    return (
        <div className="flex justify-between">
            <ProfileLeftSetting />
            <div className="">{children}</div>
            <div>lfj</div>
        </div>
    );
}
