import type { ReactNode } from "react";

interface ContainerProps {
  children?: ReactNode;
  className?: string; // ✅ add this line
}

const Container = ({ children, className = "" }: ContainerProps) => {
  return (
    <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
