import { useEffect, useState } from "react";
import CamperCard from "@/components/CamperCard";

interface Camper {
  id: number;
  name: string;
  username: string;
  emoji: string;
}

const Index = () => {
  const [campers, setCampers] = useState<Camper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCampers = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/users");
        if (!res.ok) {
          throw new Error("Failed to load campers from backend");
        }
        const data = (await res.json()) as Camper[];
        setCampers(data);
      } catch (err) {
        console.error(err);
        setError("Could not load campers. Check that the backend and database are running.");
      } finally {
        setLoading(false);
      }
    };

    loadCampers();
  }, []);

  const updateUsername = async (id: number, newUsername: string) => {
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: newUsername }),
      });

      if (!res.ok) {
        throw new Error('Failed to save username');
      }

      const updatedCamper = (await res.json()) as Camper;
      
      // Update local state with the saved data
      setCampers((prev) =>
        prev.map((c) => (c.id === id ? updatedCamper : c))
      );
    } catch (err) {
      console.error('Error updating username:', err);
      setError('Failed to save username. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="py-10 text-center">
        <p className="text-4xl mb-2">🦕</p>
        <h1 className="font-display text-4xl font-bold text-foreground">
          Dino Discovery Camp
        </h1>
        <p className="mt-2 text-muted-foreground text-lg">
          Summer 2026 · Enrolled Campers
        </p>
      </header>

      <main className="mx-auto max-w-xl px-4 pb-16 space-y-4">
        {loading && (
          <p className="text-muted-foreground text-sm">Loading campers…</p>
        )}

        {!loading && error && (
          <p className="text-destructive text-sm">{error}</p>
        )}

        {!loading &&
          !error &&
          campers.map((c) => (
            <CamperCard
              key={c.id}
              name={c.name}
              username={c.username}
              emoji={c.emoji}
              onSave={(newUsername) => updateUsername(c.id, newUsername)}
            />
          ))}
      </main>
    </div>
  );
};

export default Index;
