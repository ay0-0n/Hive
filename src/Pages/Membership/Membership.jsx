import { Helmet } from 'react-helmet-async';
import { FaCheck, FaDollarSign, FaTimes } from 'react-icons/fa';

const Membership = () => {
    return (
        <>
            <Helmet>
                <title>Hive - Become a Member</title>
            </Helmet>
            <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center py-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
                
                <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row justify-center items-stretch space-y-6 md:space-y-0 md:space-x-6">
                    <div className="bg-white rounded-lg shadow-md w-[70%] md:w-[30%] lg:w-[40%] mx-auto md:mx-0 flex flex-col justify-start transform transition duration-500 hover:scale-105 hover:shadow-xl">
                        <div className='bg-customBlue rounded-t-lg p-6 text-center'>
                            <h3 className='text-2xl font-semibold text-gray-300'>Starter</h3>
                            <h2 className="text-4xl font-bold text-white">Free</h2>
                            <p className="text-4xl font-bold text-white mt-2 flex justify-center items-center"><FaDollarSign className='text-3xl' />0</p>
                        </div>
                        <ul className="space-y-6 md:space-y-9 px-6  py-16 text-lg md:text-xl text-gray-600">
                            <li className="flex items-center">
                                <FaCheck className="text-green-500 mr-2" />
                                Browse posts
                            </li>
                            <li className="flex items-center">
                                <FaCheck className="text-green-500 mr-2" />
                                Post comments
                            </li>
                            <li className="flex items-center">
                                <FaCheck className="text-green-500 mr-2" />
                                Vote on posts
                            </li>
                            <li className="flex items-center">
                                <FaTimes className="text-red-500 mr-2" />
                                Post more than 5
                            </li>
                            <li className="flex items-center">
                                <FaTimes className="text-red-500 mr-2" />
                                Bronze Badge
                            </li>
                        </ul>
                    </div>
                    <div className="bg-white rounded-lg shadow-md w-[70%] md:w-[30%] lg:w-[40%] mx-auto md:mx-0 flex flex-col justify-between transform transition duration-500 hover:scale-105 hover:shadow-xl">
                        <div className='bg-customBlue rounded-t-lg p-6 text-center'>
                            <h3 className='text-2xl font-semibold text-gray-300'>Member</h3>
                            <h2 className="text-4xl font-bold text-white">Premium</h2>
                            <p className="text-4xl font-bold text-white mt-2 flex justify-center items-center"><FaDollarSign className='text-3xl' />4.99</p>
                        </div>
                        <ul className="space-y-6 md:space-y-9 px-6  py-16 text-lg md:text-xl text-gray-600">
                            <li className="flex items-center">
                                <FaCheck className="text-green-500 mr-2" />
                                Browse posts
                            </li>
                            <li className="flex items-center">
                                <FaCheck className="text-green-500 mr-2" />
                                Post comments
                            </li>
                            <li className="flex items-center">
                                <FaCheck className="text-green-500 mr-2" />
                                Vote on posts
                            </li>
                            <li className="flex items-center">
                                <FaCheck className="text-green-500 mr-2" />
                                Unlimited posts
                            </li>
                            <li className="flex items-center">
                                <FaCheck className="text-green-500 mr-2" />
                                Gold Badge
                            </li>
                        </ul>
                        <button className="md:mt-6 hover:before:bg-redborder-red-500 relative h-[56px] text-xl rounded-b-lg overflow-hidden border border-customBlue bg-white px-3 text-customBlue shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-customBlue before:transition-all before:duration-500 hover:text-white hover:before:left-0 hover:before:w-full border-l-0 border-r-0 border-b-0 border-t-[1.8px]">
                        <span className="relative z-10">Become a Member</span>
                    </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Membership;
