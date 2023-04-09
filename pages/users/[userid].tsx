import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";
import useUser from "@/hooks/useUser";
import Header from "@/components/Header";
import UserHero from "@/components/users/UserHero";
import UserBio from "@/components/users/UserBio";
import PostFeed from "@/components/posts/PostFeed";

const UserView = () => {
  const router = useRouter();
  const { userid } = router.query;

  // console.log("userid", userid);

  const { data: fetchedUser, isLoading } = useUser(userid as string);

  // console.log("fetchedUser", fetchedUser);

  if (isLoading || !fetchedUser) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header showBackArrow label={fetchedUser?.name} />
      <UserHero userId={userid as string} />
      <UserBio userId={userid as string} />
      <PostFeed userId={userid as string} />
    </>
  );
};

export default UserView;
