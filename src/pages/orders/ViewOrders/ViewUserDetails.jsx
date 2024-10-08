import React from 'react'

const ViewUserDetails = ({dat}) => {
    const data = dat
  return (
    <div className='bg-[#fff] rounded-[10px] shadow-lg overflow-hidden p-8 '>
            <h1 className='mb-8 font-[500] text-[25px]'>CUSTOMERS DETAILS</h1>
            <div className='grid grid-cols-3 gap-4'>
                <div className="mb-4 ">
                    <h4 className=" mb-6 dark:text-gray-400 font-[500] text-[16px]   text-gray-500">
                        Name
                    </h4>
                    <h4 className=" font-bold mb-6 text-lg text-gray-500 dark:text-gray-400">
                        {data?.name}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-6 dark:text-gray-400 font-[500] text-[16px]   text-gray-500 ">
                        Email
                    </h4>
                    <h4 className=" font-bold mb-6 text-lg text-gray-500 dark:text-gray-400">
                        {data?.email}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-6   dark:text-gray-700 font-[500] text-[16px]    text-gray-500 ">
                        Phone Number
                    </h4>
                    <h4 className=" font-bold mb-6 text-lg text-gray-500 dark:text-gray-400">
                        {data?.phone_number}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-6 dark:text-gray-700 font-[500] text-[16px]   text-gray-500 ">
                        City
                    </h4>
                    <h4 className=" font-bold mb-6 text-lg text-gray-500 dark:text-gray-400">
                        {data?.city}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-6 dark:text-gray-700 font-[500] text-[16px]   text-gray-500 ">
                        Address
                    </h4>
                    <h4 className=" font-bold mb-6 text-lg text-gray-500 dark:text-gray-400">
                        {data?.address}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-6 dark:text-gray-700 font-[500] text-[16px]   text-gray-500">
                        Zipcode
                    </h4>
                    <h4 className=" font-bold mb-6 text-lg text-gray-500 dark:text-gray-400">
                        {data?.zipcode}
                    </h4>
                </div>

            </div>
        </div>
  )
}

export default ViewUserDetails