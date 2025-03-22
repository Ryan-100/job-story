import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import {useEffect, useState} from "react";

const calculatePages = (num, totalPages) => {
    const pageObjects = [];
    const maxPagesToShow = Math.min(totalPages, 7);

    let startPage = Math.max(1, num - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
        pageObjects.push({page: i});
    }
    return pageObjects;
};

const JobPagination = ({currentPage, setCurrentPage, totalPages}) => {
    const [num, setNum] = useState(currentPage);
    const [pages, setPages] = useState([]);

    useEffect(() => {
        const pageObjects = calculatePages(num, totalPages);
        setPages(pageObjects);
    }, [num, totalPages]);

    function Next() {
        if (num === totalPages) return;
        setNum((prevNum) => prevNum + 1);
    }

    function back() {
        if (num === 1) return;
        num > 1 && setNum((prevNum) => prevNum - 1);
    }

    return (
        <div className="flex items-center justify-between border-t border-gray-200  px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <a className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Previous
                </a>
                <a className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Next
                </a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
                <div>
                    <nav
                        className="isolate inline-flex space-x-2 rounded-md shadow-sm"
                        aria-label="Pagination"
                    >
                        <button
                            className="relative inline-flex items-center border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 rounded-md"
                            onClick={back}
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true"/>
                        </button>
                        {pages.map((pg, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    setCurrentPage(pg.page);
                                }}
                                className={`relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-black hover:opacity-75 focus:z-20 rounded-md ${
                                    currentPage === pg.page && "text-white"
                                }`}
                                style={{
                                    ...(currentPage === pg.page && {
                                        backgroundColor: "#5C26D2",
                                    }),
                                }}
                            >
                                {pg.page}
                            </button>
                        ))}
                        <button
                            className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 rounded-md"
                            onClick={Next}
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true"/>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default JobPagination;
