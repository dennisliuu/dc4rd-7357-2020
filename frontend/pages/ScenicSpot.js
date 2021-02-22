import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { usePaginatePosts } from "../lib/useRequest";
import Post from "../components/Post";
import NavBar from "../components/NavBar";

export default function IndexPage() {
	const {
		posts,
		error,
		isLoadingMore,
		size,
		setSize,
		isReachingEnd,
	} = usePaginatePosts("/ScenicSpot");

	if (error) return <h1>Something went wrong!</h1>;
	if (!posts) return <h1>Loading...</h1>;

	return (
		<div>
			<h1>這是你的導遊＿＿＿ 帶你環遊世界到處飛</h1>
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
