import { FC, useContext } from 'react';
import useSWR from 'swr';
import UserDetails from '../../components/userDetails';
import type { LeaderboardData } from '../../types';
import AppContext from '../../components/AppContext';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Leaderboard: FC = () => {
  const { data, error, isLoading } = useSWR<LeaderboardData>(
    '../api/leaderboard',
    fetcher,
    { refreshInterval: 20000 }
  );

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;
  const leaderboardData = data.leaderboard ? data.leaderboard : null;

  const sortedData = leaderboardData.sort((a, b) => b.score - a.score);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-10">
      <h1 className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Leaderboard
      </h1>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 my-10">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              User Name
            </th>
            <th scope="col" className="px-6 py-3">
              Score
            </th>
            <th scope="col" className="px-6 py-3">
              Likes
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((user) => (
            <UserDetails key={user.username} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
