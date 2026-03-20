// src/components/dashboard/MyCourses.tsx
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import API from "../../api/auth"; // reuse axios instance

interface Course {
  program_id: string;
  enrolled_at: string;
}

const MyCourses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!user) return;

      try {
        const { data } = await API.get("/courses/my-courses");
        setCourses(data.data);
      } catch (err) {
        console.error("Failed to load courses", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user]);

  if (loading) return <p>Loading your courses...</p>;
  if (courses.length === 0) return <p>No courses enrolled yet.</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Courses</h2>

      {courses.map((course, i) => (
        <div key={i} className="bg-white p-6 rounded-xl shadow mb-4">
          <h3 className="font-semibold">{course.program_id}</h3>
          <p className="text-sm text-gray-500 mt-1">
            Enrolled: {new Date(course.enrolled_at).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MyCourses;