import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function usePagination(refetch = () => {}, setSearchParameters = () => {}) {
	const [pageNum, setPageNum] = useState(1);
	const handlePageChange = (event, val) => {
		event.preventDefault();
		setPageNum(val);
	};
	useEffect(() => {
		setSearchParameters((params) => {
			params.set("page", pageNum);
			return params;
		});
		refetch();
		return () => {};
	}, [pageNum]);
	return { pageNum: pageNum, handlePageChange: handlePageChange };
}
export default usePagination;
