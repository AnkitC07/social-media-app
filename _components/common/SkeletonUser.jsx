

const SkeletonUser = ({ i, button=false }) => {
    return (
        <div key={i} className="flex flex-row items-center   h-full space-x-5 animate-pulse">
            <div className="w-12 h-12 bg-gray-700 rounded-full "></div>
            <div className="flex flex-col space-y-3">
                <div className="h-4 bg-gray-700 rounded-md w-20 "></div>
                <div className="w-16 h-4 bg-gray-700 rounded-md "></div>
            </div>
            {button && (
                <div>
                    <div className="w-10 h-6 bg-gray-700 rounded-md "></div>
                </div>
            )}
        </div>
    );
};

export default SkeletonUser;
