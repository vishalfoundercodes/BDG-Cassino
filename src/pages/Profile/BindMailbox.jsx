import React from 'react'
import mailveryfy from "../../assets/icons/mailveryfy.png"
import email_tab from "../../assets/icons/email_tab.png"
function BindMailbox() {
    return (
        <div>
            <div className="w-full bg-bg2 shadow-lg rounded-lg p-6">
                {/* mail */}
                <div className="mb-4">
                    <label className="text-gray-600 text-sm font-medium flex items-center">
                        <img src={email_tab} alt="sfd" className="w-5 h-5 mr-2" />
                        Mail
                    </label>
                    <input
                        type="email"
                        placeholder="Please enter your email"
                        className="w-full text-xs text-gray font-bold mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
                    />
                </div>

                <div className="mb-4 ">
                    <label className="text-gray-600 text-sm font-medium flex items-center">
                        <img src={mailveryfy} alt="sfd" className="w-5 h-5 mr-2" />
                        Verification code
                    </label>
                    <div className='flex items-center gap-2'>
                        <input
                            type="text"
                            placeholder="Please enter confirmation code"
                            className="w-full text-xs text-gray font-bold mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
                        />
                        <button className='bg-bg3 py-1 mt-2 px-3 rounded-lg'>Save</button>
                    </div>
                </div>

                {/* Save button */}
                <button className="w-full mt-10 tracking-wider bg-blue-500 text-white text-sm font-semibold py-3 rounded-full shadow-md hover:bg-blue-600">
                    Bind
                </button>
            </div>

        </div>
    )
}

export default BindMailbox