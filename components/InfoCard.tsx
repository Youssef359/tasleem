interface InfoCardProps {
  label: string;
  value: string;
  isBadge?: boolean;
  isBalance?: boolean;
}

export function InfoCard({ label, value, isBadge = false, isBalance = false }: InfoCardProps) {
  return (
    <div className="bg-[#111111] border border-[#1a1a1a] rounded-xl p-6 transition-colors duration-200 hover:border-[#2a2a2a]">
      <div className="text-[#888] text-sm uppercase tracking-wide mb-3">
        {label}
      </div>
      {isBadge ? (
        <span className="inline-flex bg-[#1a1a1a] border border-[#333] px-4 py-1.5 rounded-full text-[#fafafa] text-sm">
          {value}
        </span>
      ) : (
        <div className={`text-[#fafafa] ${isBalance ? 'text-2xl text-white' : 'text-lg'}`}>
          {value}
        </div>
      )}
    </div>
  );
}
