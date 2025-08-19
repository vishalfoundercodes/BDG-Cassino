/* eslint-disable react/prop-types */

function AvitatorLayout({component}) {
    return (
        <>
            <div className= 'h-full md:h-screen overflow-auto hide-scrollbar bg-blackAviator1'>{component}</div>
        </>
    )
}

export default AvitatorLayout
