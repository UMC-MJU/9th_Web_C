export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
};

export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type MovieDetail = {
  id: number;                           // 영화 고유 ID
  title: string;                        // 제목
  poster_path?: string | null;          // 포스터 이미지
  vote_average: number;                 // 평균 평점
  release_date?: string;                // 개봉일
  backdrop_path?: string;

  overview?: string;                    // 줄거리
  runtime?: number;                     // 상영시간

  production_companies?: {              // 제작사 목록
    id: number;
    logo_path?: string | null;
    name: string;
    origin_country?: string;
  }[];        
}
export type Cast = {
  id: number;
  known_for_department: string; 
  name: string;
  original_name: string;
  profile_path: string | null;
  cast_id: number;
  character: string;
  job: string;
};

export type Crew = {
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  profile_path: string | null;
  credit_id: string;
  job: string; 
};


export type Credits = {
  id: number;
  cast: Cast[];
  crew: Crew[];
};