

export type TMediaFilterRequest = {
  searchTerm?: string | undefined;
  title?: string | undefined;
  year?: string | undefined;
  status?: string | undefined;
};

export type TMedia = {
    title: string
    description: string
    year: string;
    status: "MOVIE" | "SERIES",
  }