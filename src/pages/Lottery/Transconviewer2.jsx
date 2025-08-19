
import React from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";

const TronscanViewer2 = () => {

    const searchParams = new URLSearchParams(location.search);
    const blockId = searchParams.get("blockid");
    const url = `https://tronscan.org/#/block/${blockId}`
    console.log("urldfdf",url)
    return (
        <div className=" w-full xsm:w-[400px] h-full" style={{ border: "1px solid #ccc", borderRadius: "8px", overflow: "hidden", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)" }}>
            {/* App Bar */}
            <div className="bg-white flex items-center justify-between" style={{ color: "black", padding: "10px 16px", fontSize: "18px", fontWeight: "bold" }}>
                <Link to={-1} >
                    <MdKeyboardArrowLeft className="font-extrabold text-3xl text-black" />
                </Link>
                <div>TRX</div>
                <div></div>
            </div>

            <iframe className="h-full"
                src={url}
                width="100%"
                height="100%"
                style={{ border: "none", display: "block" }}
                title="Tronscan"
            ></iframe>
        </div>
    );
};

export default TronscanViewer2;