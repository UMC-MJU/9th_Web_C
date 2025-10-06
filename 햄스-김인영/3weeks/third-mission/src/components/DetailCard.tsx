import type { Credits } from "../types/movies"
import image from '../assets/no-image.png'

type DetailCardProps = {
  credit?: Credits;
}

export const DetailCard = ({credit}: DetailCardProps) => {
  if (!credit) return null;

  const directors = credit.crew.filter((p) => p.job === "Director");
  const mainCast = credit.cast.slice(0, 10);

  const people = [...directors, ...mainCast];
  return (
    <div className="flex flex-wrap gap-13 p-12">
      {people.map((person, idx) => (
      <div key={`${person.id}-${idx}`}
      className="flex flex-col items-center">
        <img src={person.profile_path ? `https://image.tmdb.org/t/p/w200${person.profile_path}` : `${image}`} 
        alt={person.name}
        className="w-24 h-24 object-cover rounded-full"/>
        <p className="pt-3">{person.original_name}</p>
        <p className="text-sm text-gray-500">{person.job || person.known_for_department}</p>
      </div>
    ))}
    </div>
  )
}
