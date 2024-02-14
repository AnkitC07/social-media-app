import React from "react";
import Card from "../common/Card";
import Hashtags from "../common/Hashtags";

const RightSideTrend = ({ style }) => {
    const tags = [
        {
            tag: "Meloni",
            num: 205,
        },
        {
            tag: "BycottMaldives",
            num: 145,
        },
        {
            tag: "Oppenheimer",
            num: 45,
        },
    ];
    return (
        <Card style={style}>
            <div className={` flex flex-col gap-8 py-3 px-5`}>
            {/* <div className={`w-[300px] flex flex-col gap-8 py-3 px-5`}> */}
                <h2 className="font-bold text-lg">Trends for you</h2>
                <div className="flex flex-col gap-4 divide-y ">
                    <div className="flex flex-col gap-4">
                        <h3 className="font-medium text-[#6a6a6a]">TRENDING IN INDIA</h3>
                        <div>
                            <Hashtags tags={tags} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 pt-5">
                        <h3 className="font-medium text-[#6a6a6a]">NFT &#8226; TRENDING</h3>
                        <div>
                            <Hashtags tags={tags} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 pt-5">
                        <h3 className="font-medium text-[#6a6a6a]">FOOTBALL &#8226; TRENDING</h3>
                        <div>
                            <Hashtags tags={tags} />
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default RightSideTrend;
