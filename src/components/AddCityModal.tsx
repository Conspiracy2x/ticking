import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { searchCities, CityData } from "@/lib/timezones";
import { MapPin } from "lucide-react";

interface AddCityModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (city: CityData) => void;
  existingIds: string[];
  isFull: boolean;
}

export function AddCityModal({ open, onClose, onAdd, existingIds, isFull }: AddCityModalProps) {
  const [query, setQuery] = useState("");
  const results = searchCities(query).filter((c) => !existingIds.includes(c.id));

  const handleSelect = (city: CityData) => {
    onAdd(city);
    setQuery("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Add City</DialogTitle>
        </DialogHeader>

        {isFull ? (
          <p className="text-sm text-muted-foreground py-4">Maximum of 5 cities reached. Remove a city to add another.</p>
        ) : (
          <>
            <Input
              placeholder="Search city, country..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              className="mb-2"
            />
            <div className="max-h-[300px] overflow-y-auto space-y-0.5">
              {results.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">No cities found</p>
              ) : (
                results.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => handleSelect(city)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent transition-colors text-left"
                  >
                    <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <div>
                      <span className="text-sm font-medium text-foreground">{city.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">{city.country}</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
