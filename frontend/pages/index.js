import { usePaginatePosts } from "../lib/useRequest";
import useOnScreen from "../lib/useOnScreen";
import Post from "../components/Post";
import React from "react";

export default function IndexPage() {
	const {
		posts,
		error,
		isLoadingMore,
		size,
		setSize,
		isReachingEnd,
	} = usePaginatePosts("/posts");

	if (error) return <h1>Something went wrong!</h1>;
	if (!posts) return <h1>Loading...</h1>;

	const $loadMoreButton = React.useRef(null);
	const isOnScreen = useOnScreen($loadMoreButton, "200px");

	React.useEffect(() => {
		if (isOnScreen) setSize(size + 1);
	}, [isOnScreen]);

	return (
		<div className="container">
			<h1>My Posts</h1>
			{posts.map((post) => (
				<Post post={post} key={post.id} />
			))}
			<button
				disabled={isLoadingMore || isReachingEnd}
				onClick={() => setSize(size + 1)}
			>
				{isLoadingMore
					? "Loading..."
					: isReachingEnd
					? "No more posts"
					: "Load more"}
			</button>
			<button
				ref={$loadMoreButton}
				className="bg-red-600 border-solid border-2 hover:bg-white border-red-600 text-white hover:text-red-600 font-bold py-2 px-4 rounded-full w-full"
				disabled={isLoadingMore || isReachingEnd}
				onClick={() => setSize(size + 1)}
			></button>
			<style jsx global>
				{`
					@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap");
					* {
						margin: 0;
						padding: 0;
						box-sizing: border-box;
					}
					body {
						font-family: "Nunito", sans-serif;
						background: #222;
						color: #fff;
						font-size: 1rem;
					}
					a {
						color: #fff;
						text-align: center;
					}
					.container {
						max-width: 728px;
						margin: auto;
						padding: 1rem;
					}
					.container > h1 {
						text-align: center;
						text-transform: uppercase;
						margin-bottom: 1rem;
						font-size: 1.4rem;
					}
					h1 {
						text-transform: capitalize;
						font-size: 1.1rem;
					}
					button {
						display: block;
						margin: auto;
						padding: 0.5rem 1rem;
						font-size: 1rem;
						font-weight: 700;
						background: #0dbbac;
						color: #fff;
						border-radius: 20px;
						border: none;
						cursor: pointer;
					}
					.Card {
						background: #333;
						padding: 1rem;
						margin-bottom: 1rem;
					}
					.Card--body {
						color: #999;
					}
				`}
			</style>
		</div>
	);
}
