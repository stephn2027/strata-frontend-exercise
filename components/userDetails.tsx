import Image from 'next/image';
import Link from 'next/link';
import { Url } from 'url';

type UserProps = {
  user: {
    username: string;
    profileImage: string;
    score: number;
  };
};

function UserDetails({ user }: UserProps) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <Link href="/profile/[username]" as={`/profile/${user.username}`}>
          <Image
            src={user.profileImage}
            alt=""
            height={100}
            width={100}
          ></Image>
        </Link>
      </th>
      <td className="px-6 py-4 hover:text-blue-dark cursor-pointer ">
        <Link href="/profile/[username]" as={`/profile/${user.username}`}>
          {user.username}
        </Link>
      </td>
      <td className="px-6 py-4">{user.score}</td>
      <td className="px-6 py-4">TO DO:</td>
    </tr>
  );
}

export default UserDetails;
