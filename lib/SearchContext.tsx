'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface SearchFilters {
  travelType: string;
  date: string;
  travelers: string;
}

interface SearchContextType {
  filters: SearchFilters;
  setFilters: (f: SearchFilters) => void;
  hasSearch: boolean;
}

const SearchContext = createContext<SearchContextType>({
  filters: { travelType: '', date: '', travelers: '' },
  setFilters: () => {},
  hasSearch: false,
});

export function SearchProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<SearchFilters>({ travelType: '', date: '', travelers: '' });
  const hasSearch = !!(filters.travelType || filters.date || filters.travelers);
  return (
    <SearchContext.Provider value={{ filters, setFilters, hasSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);
