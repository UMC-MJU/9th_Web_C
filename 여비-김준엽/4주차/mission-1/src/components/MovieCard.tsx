import { useState } from 'react';
import type { Movie } from '../types/movie';
import {useNavigate} from 'react-router-dom';

interface MovieCardProps{
    movie: Movie;
}

export default function Moviecard({movie} : MovieCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    
    return(
    <div
        onClick={():void | Promise<void> => navigate(`/movie/${movie.id}`)}
        className='relative rounded-xl shadow-lg overflow-hidden cursor-pointer
        w-48 transition-all duration-300 hover:scale-105 hover:shadow-2xl
        bg-white group' 
        onMouseEnter={() : void => setIsHovered(true)}
        onMouseLeave={() : void => setIsHovered(false)}
        >
        {/* 영화 포스터 */}
        <div className='relative'>
            <img 
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} 
                alt ={`${movie.title} 영화의 이미지`}
                className='w-full h-72 object-cover transition-transform duration-300
                group-hover:scale-110'
            />
            
            {/* 평점 오버레이 */}
            <div className='absolute top-3 right-3 bg-yellow-500 text-white
            px-2 py-1 rounded-full text-sm font-bold flex items-center space-x-1'>
                <span>⭐</span>
                <span>{movie.vote_average.toFixed(1)}</span>
            </div>
            
            {/* 호버 시 오버레이 */}
            {isHovered && (
                <div className='absolute inset-0 bg-gradient-to-t from-black/90
                via-black/50 to-transparent flex flex-col justify-end
                text-white p-4'>
                    <h2 className='text-lg font-bold leading-snug mb-2'>
                        {movie.title}
                    </h2>
                    <p className='text-sm text-gray-300 leading-relaxed
                    line-clamp-4 mb-3'>
                        {movie.overview}
                    </p>
                    <div className='flex items-center justify-between text-xs'>
                        <span className='bg-blue-500/80 px-2 py-1 rounded'>
                            {movie.release_date}
                        </span>
                        <span className='text-yellow-400'>
                            자세히 보기 →
                        </span>
                    </div>
                </div>
            )}
        </div>
        
        {/* 카드 하단 정보 */}
        <div className='p-4 bg-white'>
            <h3 className='font-bold text-gray-800 text-sm leading-tight mb-2
            line-clamp-2'>
                {movie.title}
            </h3>
            <div className='flex items-center justify-between text-xs text-gray-600'>
                <span>{movie.release_date}</span>
                <span className='flex items-center space-x-1'>
                    <span>⭐</span>
                    <span>{movie.vote_average.toFixed(1)}</span>
                </span>
            </div>
        </div>
    </div>
    );
}