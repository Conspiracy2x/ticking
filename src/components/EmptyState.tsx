import { Globe } from "lucide-react";

interface EmptyStateProps {
  onAddCity: () => void;
}

export function EmptyState({ onAddCity }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 md:py-40 px-6">
      <Globe className="w-16 h-16 text-muted-foreground/40 mb-6" strokeWidth={1} />
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Ticking</h2>
      <p className="text-muted-foreground text-sm mb-8 text-center max-w-sm">
        Add your first city to see the time around the world
      </p>
      <button
        onClick={onAddCity}
        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
      >
        Add a City
      </button>
    </div>
  );
}
