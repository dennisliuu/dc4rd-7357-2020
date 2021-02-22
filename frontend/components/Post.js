export default function Post({ post }) {
	const { ID, Name, DescriptionDetail, Description, Phone } = post;
	return (
		<div className="Card" key={ID}>
			<h1 className="Card--title">
				{ID}. {Name}
			</h1>
			<p className="Card--body">{Description} Phone: {Phone}</p>
		</div>
	);
}
