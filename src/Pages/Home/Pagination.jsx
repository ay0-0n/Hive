const Pagination = ({ page, setPage }) => {
    return (
        <div className="flex justify-center mt-4">
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
            <span className="mx-2">{page}</span>
            <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
    );
};

export default Pagination;
