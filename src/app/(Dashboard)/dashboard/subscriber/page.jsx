'use client'
import React, { useState } from 'react';
import { FiSearch, FiCalendar, FiFilter, FiChevronDown, FiTrash2 } from 'react-icons/fi';

// Sample data
const initialUsers = [
    {
      name: "Eleanor Pena",
      company: "Tesla, Inc.",
      date: "Jan 13, 2025",
      executedBy: {
        name: "Olivia Rhye",
        email: "olivia@untitledui.com",
        initials: "OR"
      }
    },
    {
      name: "Leslie Alexander",
      company: "Match Group, Inc.",
      date: "Jan 13, 2025",
      executedBy: {
        name: "Phoenix Baker",
        email: "phoenix@untitledui.com",
        initials: "PB"
      }
    },
    {
      name: "Ronald Richards",
      company: "Datadog Inc",
      date: "Jan 13, 2025",
      executedBy: {
        name: "Lana Steiner",
        email: "lana@untitledui.com",
        initials: "LS"
      }
    },
    {
      name: "Jenny Wilson",
      company: "ARK Genomic Revolution ETF",
      date: "Jan 13, 2025",
      executedBy: {
        name: "Demi Wilkinson",
        email: "demi@untitledui.com",
        initials: "DW"
      }
    },
    {
      name: "Albert Flores",
      company: "Square, Inc.",
      date: "Jan 12, 2025",
      executedBy: {
        name: "Candice Wu",
        email: "candice@untitledui.com",
        initials: "CW"
      }
    },
    {
      name: "Savannah Nguyen",
      company: "MicroStrategy Inc.",
      date: "Jan 12, 2025",
      executedBy: {
        name: "Natali Craig",
        email: "natali@untitledui.com",
        initials: "NC"
      }
    },
    {
      name: "John Smith",
      company: "Apple Inc.",
      date: "Jan 11, 2025",
      executedBy: {
        name: "Emma Johnson",
        email: "emma@untitledui.com",
        initials: "EJ"
      }
    },
    {
      name: "Sarah Williams",
      company: "Microsoft Corp.",
      date: "Jan 11, 2025",
      executedBy: {
        name: "Michael Brown",
        email: "michael@untitledui.com",
        initials: "MB"
      }
    },
    {
      name: "David Miller",
      company: "Amazon.com Inc.",
      date: "Jan 10, 2025",
      executedBy: {
        name: "Sophia Davis",
        email: "sophia@untitledui.com",
        initials: "SD"
      }
    },
    {
      name: "Emily Wilson",
      company: "Google LLC",
      date: "Jan 10, 2025",
      executedBy: {
        name: "James Wilson",
        email: "james@untitledui.com",
        initials: "JW"
      }
    },
    {
      name: "Robert Taylor",
      company: "Meta Platforms",
      date: "Jan 9, 2025",
      executedBy: {
        name: "Ava Martinez",
        email: "ava@untitledui.com",
        initials: "AM"
      }
    },
    {
      name: "Jennifer Brown",
      company: "Netflix Inc.",
      date: "Jan 9, 2025",
      executedBy: {
        name: "William Anderson",
        email: "william@untitledui.com",
        initials: "WA"
      }
    },
    {
      name: "Michael Davis",
      company: "NVIDIA Corp.",
      date: "Jan 8, 2025",
      executedBy: {
        name: "Isabella Thompson",
        email: "isabella@untitledui.com",
        initials: "IT"
      }
    },
    {
      name: "Jessica Garcia",
      company: "Adobe Inc.",
      date: "Jan 8, 2025",
      executedBy: {
        name: "Daniel White",
        email: "daniel@untitledui.com",
        initials: "DW"
      }
    },
    {
      name: "Thomas Rodriguez",
      company: "Salesforce Inc.",
      date: "Jan 7, 2025",
      executedBy: {
        name: "Mia Lee",
        email: "mia@untitledui.com",
        initials: "ML"
      }
    }
  ];

export default function SubscriberPage() {
  // Add state management for users and pagination
  const [users, setUsers] = useState(initialUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Calculate pagination values
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

  // Handle pagination
  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  // Handle delete function
  const handleDelete = (index) => {
    const newUsers = users.filter((_, i) => i !== startIndex + index);
    setUsers(newUsers);
    // Adjust current page if we delete the last item on the last page
    if (currentUsers.length === 1 && currentPage === totalPages && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div className="p-8 pb-12 bg-white">
      {/* Header Section */}
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">All Users</h1>
        
        {/* Search and Filters Row */}
        <div className="flex justify-between items-center gap-4">
          {/* Search Bar */}
          <div className="flex-1 max-w-[400px]">
            <div className="relative">
              <div className="flex items-center px-3 py-2 bg-white rounded-lg border border-gray-300 focus-within:border-blue-500">
                <FiSearch className="w-5 h-5 text-gray-400 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search for users"
                  className="flex-1 outline-none text-gray-700 text-sm"
                />
                <div className="px-1 py-px rounded border border-gray-200">
                  <span className="text-gray-500 text-xs">⌘K</span>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar and Filter Buttons */}
          <div className="flex items-center gap-3">
            <button className="px-3.5 py-2.5 bg-white rounded-lg border border-gray-300 inline-flex items-center gap-2">
              <FiCalendar className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700 text-sm font-semibold">Jan 10, 2025 – Jan 16, 2025</span>
            </button>
            <button className="px-3.5 py-2.5 bg-white rounded-lg border border-gray-300 inline-flex items-center gap-2">
              <FiFilter className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700 text-sm font-semibold">Filters</span>
            </button>
          </div>
        </div>
      </header>

      {/* Users Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-900">All Users</h2>
            <span className="px-2 py-1 bg-gray-100 rounded-md text-xs font-medium text-gray-600">
              {users?.length || 0} Users
            </span>
          </div>
        </div>

        {/* Table Structure */}
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5 rounded-md border-gray-300" />
                  <span className="text-sm font-medium text-gray-600">Users</span>
                </div>
              </th>
              <th className="px-6 py-3 text-left">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-gray-600">Subscribe date</span>
                  <FiChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-sm font-medium text-gray-600">Executed by</span>
              </th>
              <th className="w-10 px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentUsers.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" className="w-5 h-5 rounded-md border-gray-300" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.company}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-500">{user.date}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm text-gray-600">
                      {user.executedBy.initials}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.executedBy.name}</div>
                      <div className="text-sm text-gray-500">{user.executedBy.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button 
                    className="p-2 hover:bg-gray-100 rounded-md text-gray-400 hover:text-red-500"
                    onClick={() => handleDelete(index)}
                    aria-label={`Delete ${user.name}`}
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-3">
            <button 
              className={`px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold ${
                currentPage === 1 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button 
              className={`px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold ${
                currentPage === totalPages 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 