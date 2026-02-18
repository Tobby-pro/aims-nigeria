const MainLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-10 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          Website Temporarily Unavailable
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mb-6">
          This website is temporarily unavailable. Please check back later.
        </p>
        <p className="text-gray-500 text-sm">
          Thank you for your patience.
        </p>
      </div>
    </div>
  );
};

export default MainLayout;
