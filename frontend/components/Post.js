export default function Post({ post }) {
	console.log(post);
	const { Name, DescriptionDetail, Description, Phone } = post;
	return (
		<div className="Card">
			<h1 className="Card--title">
				{Name}. {DescriptionDetail}
			</h1>
			<p className="Card--body">{Description} Phone: {Phone}</p>
		</div>
	);
}
