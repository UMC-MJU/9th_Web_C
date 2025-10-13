// 영화 상세 정보 타입 정의
export type Genre = { 
  id: number; 
  name: string; 
};

export type ProductionCompany = { 
  id: number; 
  logo_path: string | null; 
  name: string; 
};

export type MovieDetail = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string; 
  release_date: string;
  vote_average: number;
  runtime: number;
  tagline: string;
  genres: Genre[];
  production_companies: ProductionCompany[];
};

// 출연진 및 제작진 타입 정의
export type Cast = {
  id: number;
  name: string;
  profile_path: string | null;
  character: string;
  known_for_department: string;
};

export type Crew = {
  id: number;
  name: string;
  profile_path: string | null;
  job: string;
  department: string;
};

export type Credits = {
  cast: Cast[];
  crew: Crew[];
};

// 영화 상세 정보와 크레딧을 합친 타입
export type MovieDetailWithCredits = {
  movie: MovieDetail;
  credits: Credits;
};



