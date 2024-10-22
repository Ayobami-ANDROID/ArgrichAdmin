import React from 'react';

const ViewOrderedItem = ({ data }) => {
 

  if (!Array.isArray(data)) {
  
    return <div>Error: Invalid data format</div>;
  }

  return (
    <div className="bg-[#fff] rounded-[10px] shadow-lg overflow-hidden p-8">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 overflow-x-scroll">
        <thead lassName="bg-gray-50 text-[rgba(7,45,86,1)] font-[600] ">
          <tr >
            <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">#</th>
            <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">Product Name</th>
            <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">Quantity</th>
            <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">Price</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
          {data.map((product, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap text-[#667085]">{idx + 1}</td>
              <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap text-[#667085]">{product.product}</td>
              <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap text-[#667085]">{product.quantity}</td>
              <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap text-[#667085]">{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewOrderedItem;