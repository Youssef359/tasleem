import { Navbar } from '@/components/Navbar';
import { TransactionsTable } from '@/components/TransactionsTable';

export default function App() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TransactionsTable />
      </main>
    </div>
  );
}