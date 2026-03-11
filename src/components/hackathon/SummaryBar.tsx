import { formatDate, formatPrize } from '@/lib/format';
import type { Hackathon } from '@/lib/types';
import StatusBadge from '@/components/ui/StatusBadge';

interface SummaryBarProps {
  hackathon: Hackathon;
}

export default function SummaryBar({ hackathon }: SummaryBarProps) {
  const stats = [
    { label: 'STATUS', value: <StatusBadge status={hackathon.status} /> },
    {
      label: 'PERIOD',
      value: `${formatDate(hackathon.eventStartAt)} ~ ${formatDate(hackathon.eventEndAt)}`,
    },
    { label: 'TEAMS', value: hackathon.teamCount ?? '미공개' },
    { label: 'VIEWS', value: hackathon.viewCount ?? '미공개' },
    {
      label: 'PRIZE',
      value: hackathon.prizeTotalKRW > 0 ? formatPrize(hackathon.prizeTotalKRW) : '미공개',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 rounded-sm border-2 border-dark-border bg-dark-border/50 p-4 sm:grid-cols-2 lg:grid-cols-5">
      {stats.map(stat => (
        <div key={stat.label} className="text-center">
          <p className="mb-1 font-pixel text-[8px] text-card-white/50">{stat.label}</p>
          <div className="break-words font-dunggeunmo text-sm leading-snug text-card-white">
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
}
