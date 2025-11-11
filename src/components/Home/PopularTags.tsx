import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTopSearchKeywords } from "../../services/search";

const PopularTags: React.FC = () => {
  const navigate = useNavigate();
  const [popular, setPopular] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTagClick = (tag: string) => {
    navigate(`/search?q=${encodeURIComponent(tag)}&page=0`);
  };

  useEffect(() => {
    let isMounted = true;
    const fetchPopular = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = (await getTopSearchKeywords(5)) as Array<unknown>;
        const normalized = data
          .map((item) => {
            if (typeof item === "string") return item;
            const obj = item as Record<string, unknown>;
            return (
              (typeof obj.keyword === "string" && obj.keyword) ||
              (typeof obj.name === "string" && obj.name) ||
              (typeof obj.search === "string" && obj.search) ||
              (typeof obj.value === "string" && obj.value) ||
              (typeof obj.text === "string" && obj.text) ||
              JSON.stringify(obj)
            );
          })
          .filter(Boolean) as string[];
        if (isMounted) setPopular(normalized);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        if (isMounted) setError(message || "Error fetching popular searches");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPopular();

    return () => {
      isMounted = false;
    };
  }, []);

  const itemsToShow = popular;

  return (
    <div className="mt-8" data-testid="popular-tags">
      <h3 className="text-sm font-medium mb-3">Búsquedas populares</h3>

      {loading && itemsToShow.length === 0 ? (
        <div className="text-sm text-gray-400">Cargando...</div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {itemsToShow.map((tag, index) => (
            <button
              key={index}
              onClick={() => handleTagClick(tag)}
              className="bg-gray-200 text-gray-500 font-medium text-xs font-inter px-6 py-2 rounded-none hover:bg-gray-300 transition-colors duration-200"
            >
              {tag}
            </button>
          ))}
          {!loading && itemsToShow.length === 0 && (
            <div className="text-sm text-gray-400">No hay búsquedas populares para mostrar</div>
          )}
        </div>
      )}

      {error && (
        <div className="mt-2 text-xs text-red-500">No se pudieron cargar las búsquedas populares.</div>
      )}
    </div>
  );
};

export default PopularTags;
