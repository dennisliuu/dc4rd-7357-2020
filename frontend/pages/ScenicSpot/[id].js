import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { usePaginatePosts } from "../../lib/useRequest";
import Post from "../../components/Post";
import { useRouter } from "next/router";
import NavBar from "../../components/NavBar"

export default function IndexPage() {
	const router = useRouter();
	const {
		posts,
		error,
		isLoadingMore,
		size,
		setSize,
		isReachingEnd,
	} = usePaginatePosts(`/ScenicSpot/${router.query.id}`);
	if (!posts) return "loading";
	if (error) return "error";
	return (
		<div>
			<h1>這是你的導遊＿＿＿ 帶你環遊 {router.query.id} 到處飛</h1>
			<hr />
			< NavBar />
			<h1>View Spots</h1>
			<InfiniteScroll
				dataLength={posts.length}
				next={() => setSize(size + 1)}
				hasMore={!isReachingEnd}
				loader={<h4>Loading...</h4>}
			>
				{posts.map((post) => (
					<Post post={post} key={post.id} />
				))}
			</InfiniteScroll>
			<div onClick={() => setSize(size + 1)}>Load More</div>
		</div>
	);
}
