import { Progress } from "@/components/ui/progress";

interface TodoStatsProps {
  completed: number;
  total: number;
}

export default function TodoStats({ completed, total }: TodoStatsProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">
          {completed}/{total} completed
        </span>
        <span className="text-sm font-medium">{percentage}%</span>
      </div>
      <Progress value={percentage} className="h-2 w-24" />
    </div>
  );
}
