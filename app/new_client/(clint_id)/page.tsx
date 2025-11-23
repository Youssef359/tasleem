
import { Navbar } from '@/components/Navbar';
import { TransactionForm } from '@/components/TransactionForm';

export default function App() {
  return (
    <div className="min-h-screen bg-[#000]">
      <Navbar />
      <main className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <TransactionForm />
        </div>
      </main>
    </div>
  );
}
