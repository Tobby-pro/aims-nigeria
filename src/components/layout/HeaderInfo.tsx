// components/layout/HeaderInfo.tsx
import Container from "../Container";

const HeaderInfo = () => {
  return (
    <div className="w-full bg-gray-50 z-40 relative">
      <Container>
        <div className="flex justify-start items-center h-10">
          <span className="text-violet-600 text-xs sm:text-sm font-bold">
            ASSOCIATION FOR INFORMATION AND MANAGEMENT SCIENCE, NIGERIA
          </span>
        </div>
      </Container>
    </div>
  );
};

export default HeaderInfo;
