export interface SearchResult {
  id: string;
  name: string;
  description: string;
  itemType: "PROGRAM" | "COURSE";
  programType:
    | "ESPECIALIZACION"
    | "CERTIFICACION"
    | "DOCTORADO"
    | "MAESTRIA"
    | null;
  credits: number;
  tags: string;
  modality: "PRESENCIAL" | "VIRTUAL" | "HIBRIDO";
  degreeTitle: string | null;
  imageUrl: string;
  price: number;
  duration: number;
  durationUnit: "SEMESTERS" | "HOURS";
}

export interface PaginationInfo {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface SearchResponse {
  results: SearchResult[];
  totalResults: number;
  pagination: PaginationInfo;
}

export interface SearchState {
  currentSearch: string;
  results: SearchResult[];
  allResults: SearchResult[]; 
  pagination: PaginationInfo;
  isLoading: boolean;
  error: string | null;
  recentSearches: string[];
}

export interface SearchBarProps {
  search: string;
  by: string;
  handleClick: (searchTerm: string) => void;
  initialValue?: string;
}

export interface SearchResultsHeroProps {
  searchTerm: string;
  totalResults: number;
  onSearch: (searchTerm: string) => void;
}

export interface ProgramCardProps {
  result: SearchResult;
  onLearnMore?: (id: string, itemType: string, name: string) => void;
}

export interface SearchResultsGridProps {
  results: SearchResult[];
  isLoading: boolean;
  onLearnMore?: (id: string, itemType: string, name: string) => void;
}

export interface PaginationControlsProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
}

export interface UseSearchReturn {
  results: SearchResult[];
  isLoading: boolean;
  error: string | null;
  pagination: PaginationInfo;
  searchTerm: string;
  search: (term: string, page?: number, filters?: FilterState) => Promise<void>;
  clearError: () => void;
}
export interface FilterState {
  contentType: string[];
  academicLevel: string[];
  modality: string[];
  priceRange: [number, number];
  durationRange: [number, number];
  durationHoursRange: [number, number];
}