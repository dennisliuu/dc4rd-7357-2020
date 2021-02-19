import Link from "next/link";
import NavBar from "../components/NavBar";

const PostLink = (props) => {
	return (
		<div>
			<Link href="/ScenicSpot/[id]" as={`/ScenicSpot/${props.id}`}>
				<a>{props.id}</a>
			</Link>
		</div>
	);
};

export default function Index() {
	return (
		<>
			<NavBar />
			<PostLink id="Learn-ReactJS" />
			<PostLink id="Learn-NextJS" />
			<PostLink id="Learn-Javascript" />
		</>
	);
}
