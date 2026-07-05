import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { addParent, getParents, registerStudentSchedule } from "../services/ParentService"; // bạn phải có file service tương ứng
import { getToken, setToken } from "../services/LocalStorageService";
import { useAuth } from "./AuthContext";
import { getMyInfo } from "../services/ParentService";

// --- 1️⃣ Tạo Context ---
const ParentContext = createContext();

// --- 2️⃣ Custom Hook để dùng dễ hơn ---
export const useParent = () => {
  const context = useContext(ParentContext);
  if (!context) {
    throw new Error("useParent must be used within a ParentProvider");
  }
  return context;
};

// --- 3️⃣ Provider bọc quanh các component cần dữ liệu ---
export const ParentProvider = ({ children }) => {
  const [parents, setParents] = useState([]);            // danh sách phụ huynh
  const [loading, setLoading] = useState(false);         // trạng thái tải
  const [error, setError] = useState(null);              // lỗi
  const [selectedParent, setSelectedParent] = useState(null); // phụ huynh đang chọn
  const { isAuthenticated, isAdmin, role } = useAuth();
  const [currentParent, setCurrentParent] = useState(null);

  // Hàm tải danh sách phụ huynh
  const fetchParents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getParents();
      if (data && data.data) setParents(data.data);
      else throw new Error("Không thể tải dữ liệu phụ huynh");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const getCurrentParent = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMyInfo(); if (data) {
        setCurrentParent(data);
      }
      else throw new Error("Không thể tải dữ liệu phụ huynh");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Gọi tự động khi component mount
  useEffect(() => {
    if (!isAuthenticated)
      return;
    if (isAdmin)
      fetchParents();
    else if (role === 'parent')
      getCurrentParent();

  }, [isAuthenticated]);

  const createParent = useCallback(
    async (parentData) => {
      setLoading(true);
      setError(null);
      try {
        const newParent = await addParent(parentData);
        if (newParent) {
          // Cập nhật danh sách phụ huynh ngay lập tức
          setParents((prev) => [...prev, newParent.data]);
          return newParent;
        } else {
          throw new Error("Không thể tạo phụ huynh mới");
        }
      } catch (err) {
        setError(err.message);
        return null;
      } finally {
        setLoading(false);
      }
    }, []
  )

  const registerSchedule = useCallback(
    async (studentId, scheduleId) => {
      setLoading(true);
      setError(null);

      try {
        const updatedStudent = await registerStudentSchedule(studentId, scheduleId);

        if (!updatedStudent) {
          throw new Error("Không thể đăng ký lịch trình");
        }

        setParents((prev) =>
          prev.map((p) => ({
            ...p,
            students: p.students.map((s) =>
              s.id === studentId ? updatedStudent.data : s
            ),
          }))
        );

        return updatedStudent;

      } catch (err) {
        setError(err.message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Cập nhật context value
  const value = {
    parents,
    loading,
    error,
    selectedParent,
    setSelectedParent,
    refresh: fetchParents,
    setParents,
    createParent,
    registerSchedule,
    currentParent,
    setCurrentParent,
  };

  return (
    <ParentContext.Provider value={value}>
      {children}
    </ParentContext.Provider>
  );
};
