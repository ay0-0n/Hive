import PropTypes from 'prop-types';
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevious = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    return (
        <div className="flex justify-center mt-4 bg-customBlue w-[50%] mx-auto mb-8 rounded-xl">
            <button 
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`px-4 py-2 mx-1 ${currentPage === 1 ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer text-white'}`}
            >
                Previous
            </button>
            <span className="px-4 py-2 mx-1 text-cyan-950">{currentPage} of {totalPages}</span>
            <button 
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 mx-1 ${currentPage === totalPages ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer text-white'}`}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};
