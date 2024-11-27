import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div className="bg-white flex justify-center items-center min-h-screen">
            <section className="w-full h-full">
                <div className="py-8 px-4 lg:py-16 lg:px-6">
                    <div className="mx-auto text-center">
                        <h1
                            className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl dark:text-primary-500"
                            style={{ color: 'rgb(98, 54, 255)' }} // Applying the RGB color here
                        >
                            404
                        </h1>
                        <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                            Something's missing.
                        </p>
                        <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                            Sorry, we can't find that page. You'll find lots to explore on the home page.
                        </p>
                        <Link
                            to={"/"}
                            className="inline-flex text-white bg-gray-800 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
                        >
                            Back to Homepage
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PageNotFound;
