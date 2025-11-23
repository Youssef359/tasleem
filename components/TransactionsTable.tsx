'use client'
import { MoreVertical, Plus } from 'lucide-react';
import { StatusBadge } from '@/components/StatusBadge';
import { useState } from 'react';

type Status = 'Created' | 'Payment Verifying' | 'In Progress' | 'In Review' | 'Completed';

interface Transaction {
  id: number;
  project: string;
  description: string;
  role: 'Developer' | 'Client';
  amount: string;
  deadline: string;
  status: Status;
}

export function TransactionsTable() {
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const transactions: Transaction[] = [
    {
      id: 1,
      project: 'E-commerce Website Development',
      description: 'Complete store with payment system and product management',
      role: 'Developer',
      amount: '$800.00',
      deadline: 'Nov 25, 2025',
      status: 'In Progress'
    },
    {
      id: 2,
      project: 'Mobile App Design',
      description: 'iOS & Android task management application',
      role: 'Client',
      amount: '$1,200.00',
      deadline: 'Dec 10, 2025',
      status: 'Payment Verifying'
    },
    {
      id: 3,
      project: 'Admin Dashboard Development',
      description: 'Comprehensive dashboard with analytics panels',
      role: 'Developer',
      amount: '$650.00',
      deadline: 'Dec 5, 2025',
      status: 'In Review'
    },
    {
      id: 4,
      project: 'Complete API Build',
      description: 'RESTful API for the application',
      role: 'Developer',
      amount: '$500.00',
      deadline: 'Oct 15, 2025',
      status: 'Completed'
    },
    {
      id: 5,
      project: 'Corporate Website Development',
      description: 'Multi-page company website',
      role: 'Client',
      amount: '$400.00',
      deadline: 'Nov 30, 2025',
      status: 'Created'
    }
  ];

  const handleMenuToggle = (id: number) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  return (
    <div>
      <div className="bg-black border border-gray-800 rounded-xl">
        <div className="px-6 py-5 border-b border-gray-800">
          <h2 className="text-white">Recent Transactions</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black border-b border-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-fafafa">Project</th>
                <th className="px-6 py-3 text-left text-fafafa">Role</th>
                <th className="px-6 py-3 text-left text-fafafa">Amount</th>
                <th className="px-6 py-3 text-left text-fafafa">Deadline</th>
                <th className="px-6 py-3 text-left text-fafafa">Status</th>
                <th className="px-6 py-3 text-left text-fafafa">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-900 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-white">{transaction.project}</span>
                      <span className="text-gray-400">{transaction.description}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-gray-800 text-gray-300">
                      {transaction.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white">{transaction.amount}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-400">{transaction.deadline}</span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={transaction.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative">
                      <button
                        onClick={() => handleMenuToggle(transaction.id)}
                        className="p-1 hover:bg-gray-800 rounded-md transition-colors"
                      >
                        <MoreVertical className="w-5 h-5 text-gray-400" />
                      </button>
                      
                      {openMenu === transaction.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setOpenMenu(null)}
                          />
                          <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg border border-gray-800 py-1 z-20">
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-800 text-gray-300 transition-colors">
                              View Details
                            </button>
                            <hr className="my-1 border-gray-800" />
                            <button className="w-full text-left px-4 py-2 hover:bg-red-950 text-red-400 transition-colors">
                              Cancel Transaction
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button className="bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors border border-gray-700">
          <Plus className="w-5 h-5" />
          <span>Create New Transaction</span>
        </button>
      </div>
    </div>
  );
}