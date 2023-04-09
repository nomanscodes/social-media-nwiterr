import From from "@/components/From";
import Header from "@/components/Header";
import PostFeed from "@/components/posts/PostFeed";

export default function Home() {
  return (
    <>
      <Header label="Home" />
      <From placeholder="What's happening?" />
      <PostFeed />
    </>
  );
}
