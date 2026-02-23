// src/components/layout/MainLayout.tsx

const MainLayout = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 px-4">
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-10 max-w-lg w-full text-center border border-gray-200">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
          Website Temporarily Unavailable
        </h1>

        <p className="text-gray-600 text-lg leading-relaxed">
          This website is currently undergoing scheduled administrative review.
          Please contact the site administrator for further information.
        </p>

        <div className="mt-6 h-1 w-16 bg-gray-900 mx-auto rounded-full opacity-70"></div>
      </div>
    </div>
  );
};

export default MainLayout;