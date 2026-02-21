// components/layout/MainLayout.tsx

const MainLayout = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4 text-center">
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
        Website Temporarily Unavailable
      </h1>
      <p className="text-gray-600 max-w-md text-lg">
        This website is currently undergoing scheduled administrative review. 
        Please contact the site administrator for further information.
      </p>
    </div>
  );
};

export default MainLayout;