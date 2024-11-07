import React from 'react';

const HomePage = () => {
    return (
        <main className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-5xl mx-auto">
                {/* Header Section */}
                <header className="text-center py-10">
                    <h1 className="text-5xl font-serif font-bold text-gray-900">
                        Welcome to Queora
                    </h1>
                    <p className="mt-4 text-lg text-gray-600">
                        A place to share knowledge and learn from the community.
                    </p>
                </header>

                {/* Search Section */}
                <section className="my-8 flex justify-center">
                    <input
                        type="text"
                        placeholder="Search for questions..."
                        className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="ml-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Search
                    </button>
                </section>

                {/* Popular Questions Section */}
                <section className="mt-12">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Popular Questions
                    </h2>
                    <div className="mt-6 grid gap-6 md:grid-cols-2">
                        <div className="p-6 bg-white shadow rounded-lg">
                            <h3 className="text-xl font-bold text-gray-900">
                                How does artificial intelligence impact our daily lives?
                            </h3>
                            <p className="mt-2 text-gray-700">
                                Explore the various ways AI is transforming the world around
                                us...
                            </p>
                            <a
                                href="#"
                                className="mt-4 inline-block text-blue-600 hover:underline"
                            >
                                Read more
                            </a>
                        </div>
                        <div className="p-6 bg-white shadow rounded-lg">
                            <h3 className="text-xl font-bold text-gray-900">
                                What are the most effective study techniques?
                            </h3>
                            <p className="mt-2 text-gray-700">
                                Learn about proven methods to maximize learning and retention...
                            </p>
                            <a
                                href="#"
                                className="mt-4 inline-block text-blue-600 hover:underline"
                            >
                                Read more
                            </a>
                        </div>
                    </div>
                </section>

                {/* Footer Section */}
                <footer className="mt-16 text-center text-gray-600">
                    <p>&copy; {new Date().getFullYear()} Queora. All rights reserved.</p>
                </footer>
            </div>
        </main>
    );
};

export default HomePage;