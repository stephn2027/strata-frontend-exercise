import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import useSWR from 'swr';

import type { ProfileData } from '../../types';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

const User: FC = () => {
  //manage the state of our like button
  const [liked, setLiked] = useState(false);

  //get the data from api/profile
  const { query } = useRouter();
  const { data, error, isLoading } = useSWR<ProfileData>(
    () => (query.username ? `/api/profile/${query.username}` : null),
    fetcher
  );

  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;
  // switch state of like button
  const handleLike = () => {
    setLiked(!liked);
  };
  //display profile data as a card
  return (
    <div className="container flex justify-center items-center ">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6">
        <div className="flex flex-col items-center pb-10 text-center">
          <Image
            className=" rounded-full shadow-lg"
            src={`/users/${data.username}.png`}
            alt=""
            width={240}
            height={240}
          />

          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white p-2">
            {data.username}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400 py-2 ">
            {data.bio}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 ">
            <span className="text-white">Birthday:</span> {data.birthday}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 ">
            <span className="text-white">Age: </span> {data.age}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            <span className="text-white">Twitter: </span> {data.twitter}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            <span className="text-white">Email: </span> {data.age} {data.email}
          </span>
          <div className="flex mt-4 space-x-3 md:mt-6">
            <Link
              href="/leaderboard"
              className="relative inline-flex items-center justify-center p-2 px-4 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-indigo-500 rounded-full shadow-md group"
            >
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-indigo-500 group-hover:translate-x-0 ease">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-arrow-back-up"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {' '}
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />{' '}
                  <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1" />{' '}
                </svg>
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-indigo-500 transition-all duration-300 transform group-hover:translate-x-full ease">
                <Link href="/leaderboard/">Back to Leaderbaord</Link>
              </span>
              <span className="relative invisible">Back to Leaderboard</span>
            </Link>
            <button
              type="button"
              className={
                liked
                  ? 'inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800'
                  : 'inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              }
              onClick={() => handleLike()}
            >
              {/* TO DO: Pass button state to leaderboard using router query or context provider */}
              {liked ? 'Liked' : 'Like'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
