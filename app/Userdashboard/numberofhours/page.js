import React from 'react'

export default function Numberofhours() {
    return (
        <div className="mt-7">
            <div className="bg-white shadow p-4 flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Number of Hours</h1>
                <nav>
                    {/* <ul className="flex space-x-4">
                        <li><a href="#profile" className="text-blue-500">Profile</a></li>
                        <li><a href="#students" className="text-blue-500">Number of Students</a></li>
                        <li><a href="#calendar" className="text-blue-500">Schedule Calendar</a></li>
                        <li><a href="#payout" className="text-blue-500">Payout</a></li>
                        <li><a href="#rating" className="text-blue-500">Rating</a></li>
                    </ul> */}
                </nav>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4">
                <div className="bg-green-100 p-4 rounded shadow">
                    <h2 className="text-xl font-semibold">Total Hours Taught</h2>
                    <p className="text-3xl">150 Hours</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded shadow">
                    <h2 className="text-xl font-semibold">Average Hours per Week</h2>
                    <p className="text-3xl">10 Hours</p>
                </div>
            </div>

            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex space-x-4">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded">Daily</button>
                        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Weekly</button>
                        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Monthly</button>
                    </div>
                    <div>
                        <input type="date" className="border p-2 rounded" />
                        <input type="date" className="border p-2 rounded ml-2" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-semibold mb-4">Hours Taught Over Time</h3>
                    <div className="h-64 bg-gray-100"></div> {/* Placeholder for chart */}
                </div>
                <div className="bg-white p-4 rounded shadow mt-4">
                    <h3 className="text-lg font-semibold mb-4">Detailed List</h3>
                    <table className="w-full text-left">
                        <thead>
                            <tr>
                                <th className="p-2 border-b">Date</th>
                                <th className="p-2 border-b">Subject</th>
                                <th className="p-2 border-b">Hours Taught</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-2 border-b">2024-06-01</td>
                                <td className="p-2 border-b">Math</td>
                                <td className="p-2 border-b">2 Hours</td>
                            </tr>
                            <tr>
                                <td className="p-2 border-b">2024-06-02</td>
                                <td className="p-2 border-b">Science</td>
                                <td className="p-2 border-b">1.5 Hours</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="p-4">
                <div className="flex space-x-4 mb-4">
                    <input type="date" className="border p-2 rounded" />
                    <input type="date" className="border p-2 rounded" />
                    <select className="border p-2 rounded">
                        <option>All Subjects</option>
                        <option>Math</option>
                        <option>Science</option>
                        <option>English</option>
                    </select>
                </div>
            </div>

            {/* <div className="p-4 flex justify-end">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Export as CSV</button>
                <button className="bg-green-500 text-white px-4 py-2 rounded ml-2">Download as PDF</button>
            </div> */}


        </div>
    )
}
