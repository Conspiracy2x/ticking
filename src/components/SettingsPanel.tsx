import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Settings } from "lucide-react";

interface SettingsPanelProps {
  darkMode: boolean;
  use24h: boolean;
  onToggleDark: () => void;
  onToggleFormat: () => void;
}

export function SettingsPanel({ darkMode, use24h, onToggleDark, onToggleFormat }: SettingsPanelProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="p-2 rounded-lg hover:bg-accent transition-colors" aria-label="Settings">
          <Settings className="w-5 h-5 text-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-56" align="end">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Settings</h3>
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">Dark Mode</span>
            <Switch checked={darkMode} onCheckedChange={onToggleDark} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">24-Hour Format</span>
            <Switch checked={use24h} onCheckedChange={onToggleFormat} />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
