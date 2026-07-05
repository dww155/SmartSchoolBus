// src/contexts/StudentContext.jsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { addStudent, getStudents } from "../services/StudentService"; // <-- Bạn cần tạo hàm này để gọi API
import { setToken, getToken } from "../services/LocalStorageService";
import { useAuth } from "./AuthContext";

// 1️⃣ Tạo context
const StudentContext = createContext();

// 2️⃣ Hook tiện dụng để dùng context
export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudent must be used within a StudentProvider");
  }
  return context;
};

// 3️⃣ Provider
export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const { isAuthenticated, isAdmin } = useAuth();

  // 🧠 Hàm fetch dữ liệu học sinh
  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getStudents(); // API trả danh sách học sinh
      if (data) setStudents(data.data || data); // tuỳ theo format API
      else throw new Error("Không thể tải danh sách học sinh");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createStudent = useCallback(
    async (studentData) => {
      try {
        setLoading(true);
        const res = await addStudent(studentData);

        // Thêm vào list mà không cần reload toàn bộ
        setStudents((prev) => [...prev, res.data]);

        return res;
      } catch (err) {
        throw err; // cho UI xử lý error
      } finally {
        setLoading(false);
      }
    }, []
  )

  // ⏱️ Chạy khi component mount
  useEffect(() => {
    if (!isAuthenticated || !isAdmin)
      return;

    fetchStudents();
  }, [isAuthenticated]);

  // 🧩 Dữ liệu cung cấp cho toàn bộ app
  const value = {
    students,
    loading,
    error,
    selectedStudent,
    setSelectedStudent,
    refresh: fetchStudents,
    setStudents,
    createStudent,
  };

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
};
