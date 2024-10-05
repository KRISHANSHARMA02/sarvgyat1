import React from 'react'

export default function Payout() {
  return (
    <div className='mt-4'>
      <div className="p-8">
  <h1 className="text-2xl font-semibold mb-4">Payout</h1>

  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
    <h2 className="text-lg font-semibold mb-4">Earnings Overview</h2>
    <p>Total Earnings: $XXXX</p>
    <p>Pending Payouts: $XXXX</p>
    {/* Add more relevant earnings information */}
  </div>

  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-lg font-semibold mb-4">Payout History</h2>
    {/* Payout history list */}
    <div className="flex items-center justify-between border-b py-2">
      <div>
        <p className="font-semibold">May 2024</p>
        <p>Payout Amount: $XXX</p>
      </div>
      <p className="text-sm">Status: Paid</p>
    </div>
    {/* Add more past payout entries */}
  </div>

  <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
    Set Payment Method
  </button>
</div>
    </div>
  )
}
