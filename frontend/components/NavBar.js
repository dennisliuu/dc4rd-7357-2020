import Link from "next/link";

const StyleNavBar = {
	margin: 10,
	backgroundColor: "lightcoral",
	border: "2px, dotted, #DDD",
};

const StyleLink = {
	marginRight: 10,
};

const cities = [
	"Taipei",
	"NewTaipei",
	"Taoyuan",
	"Taichung",
	"Tainan",
	"Kaohsiung",
	"Keelung",
	"Hsinchu",
	"HsinchuCounty",
	"MiaoliCounty",
	"ChanghuaCounty",
	"NantouCounty",
	"YunlinCounty",
	"ChiayiCounty",
	"Chiayi",
	"PingtungCounty",
	"YilanCounty",
	"HualienCounty",
	"TaitungCounty",
	"KinmenCounty",
	"PenghuCounty",
	"LienchiangCounty",
];

const SpotLink = (props) => {
	return (
		<Link href="/ScenicSpot/[id]" as={`/ScenicSpot/${props.id}`}>
			<a style={StyleLink}>{props.id}</a>
		</Link>
	);
};

const items = []

for (const [index, value] of cities.entries()) {
    items.push(<SpotLink id={value}>{value}</SpotLink>)
}

const NavBar = () => {
	return (
		<div style={StyleNavBar}>
			<Link href="/">
				<a style={StyleLink}>Home</a>
			</Link>
			<Link href="/ScenicSpot">
				<a style={StyleLink}>ScenicSpot</a>
			</Link>
            {items}
		</div>
	);
};

export default NavBar;
