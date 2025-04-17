"use client";
import Map from "./map";

const Transactionworldwide = () => {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {/* Left Column - Transactions Table */}
        <div className="bg-white rounded-lg shadow">
          {/* Table Header */}
          <div className="grid grid-cols-7 gap-1 border-b border-gray-200">
            <div className="col-span-1 p-3 text-sm font-medium text-center">
              No
            </div>
            <div className="col-span-2 p-3 text-sm font-medium text-center">
              Transaction
            </div>
            <div className="col-span-2 p-3 text-sm font-medium text-center">
              Date
            </div>
            <div className="col-span-2 p-3 text-sm font-medium text-center">
              Amount
            </div>
          </div>

          {/* Transaction Rows */}
          {[
            { id: 1, name: "Security doors", date: "16 Jun 2014", amount: "$483.00" },
            { id: 2, name: "Wardrobes", date: "10 Jun 2014", amount: "$327.00" },
            { id: 3, name: "Set of tools", date: "16 Jun 2014", amount: "$125.00" },
            { id: 4, name: "Phones", date: "24 Jun 2013", amount: "$235.00" },
            { id: 5, name: "Panoramic pictures", date: "22 Jun 2013", amount: "$344.00" },
            { id: 6, name: "Monitors", date: "26 Jun 2013", amount: "$100.00" },
          ].map((item) => (
            <div key={item.id} className="grid grid-cols-7 gap-1 border-b border-gray-100 hover:bg-gray-50">
              <div className="col-span-1 p-3 text-sm text-center my-auto">
                {item.id}
              </div>
              <div className="col-span-2 p-3 text-sm flex items-center">
                {item.name}
              </div>
              <div className="col-span-2 p-3 text-sm flex items-center">
                {item.date}
              </div>
              <div className="col-span-2 p-2 text-sm flex justify-center">
                <span className="bg-emerald-100 text-emerald-800 px-3 py-1 text-xs font-medium flex items-center">
                  {item.amount}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column - Map */}
        <div className="bg-white rounded-lg shadow">
          <Map />
        </div>
      </div>
    </div>
  );
};

export default Transactionworldwide;