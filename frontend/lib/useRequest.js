import useSWR, { useSWRInfinite } from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const baseUrl = "https://ptx.transportdata.tw/MOTC/v2/Tourism"

var cnt = 0;

export const usePaginatePosts = (path) => {
	if (!path) {
		throw new Error("Path is required");
	}

	const url = baseUrl + path;
	const PAGE_LIMIT = 30;

	const getData = (pageIndex, previousPageData) => {
		if (pageIndex === 0) return `${url}?$top=${PAGE_LIMIT}`;
		if (previousPageData) {
			let [first, , , , last] = previousPageData;
			return `${url}?$skip=${PAGE_LIMIT * cnt++}&$top=${PAGE_LIMIT}`;
		}
	};

	const { data, error, size, setSize } = useSWRInfinite(getData, fetcher);

	const posts = data ? [].concat(...data) : [];
	const isLoadingInitialData = !data && !error;
	const isLoadingMore =
		isLoadingInitialData ||
		(size > 0 && data && typeof data[size - 1] === "undefined");
	const isEmpty = data?.[0]?.length === 0;
	const isReachingEnd =
		isEmpty || (data && data[data.length - 1]?.length < PAGE_LIMIT);

	return { posts, error, isLoadingMore, size, setSize, isReachingEnd };
};
