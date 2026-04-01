import { useState } from "react";
import { useWorldClock } from "@/hooks/useWorldClock";
import { HeroClock } from "@/components/HeroClock";
import { CityStrip } from "@/components/CityStrip";
import { CityImage } from "@/components/CityImage";
import { AddCityModal } from "@/components/AddCityModal";
import { SettingsPanel } from "@/components/SettingsPanel";
import { EmptyState } from "@/components/EmptyState";
import { Plus } from "lucide-react";

const Index = () => {
  const {
    cities,
    primaryCity,
    secondaryCities,
    settings,
    tick,
    addCity,
    removeCity,
    setPrimary,
    toggleDarkMode,
    toggleTimeFormat,
  } = useWorldClock();

  const [addModalOpen, setAddModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background transition-colors duration-500">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-6 md:px-10 py-4">
        <h1 className="text-sm md:text-base font-bold tracking-[0.3em] uppercase text-foreground">
          World Time
        </h1>
        <div className="flex items-center gap-1">
          <SettingsPanel
            darkMode={settings.darkMode}
            use24h={settings.use24h}
            onToggleDark={toggleDarkMode}
            onToggleFormat={toggleTimeFormat}
          />
          <button
            onClick={() => setAddModalOpen(true)}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Add city"
          >
            <Plus className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      {!primaryCity ? (
        <EmptyState onAddCity={() => setAddModalOpen(true)} />
      ) : (
        <>
          <HeroClock city={primaryCity} use24h={settings.use24h} tick={tick} />
          <CityStrip
            cities={secondaryCities}
            use24h={settings.use24h}
            tick={tick}
            onSelect={setPrimary}
            onRemove={removeCity}
          />
          <CityImage city={primaryCity} use24h={settings.use24h} tick={tick} onRemove={removeCity} />
        </>
      )}

      {/* Add City Modal */}
      <AddCityModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={addCity}
        existingIds={cities.map((c) => c.id)}
        isFull={cities.length >= 5}
      />
    </div>
  );
};

export default Index;
