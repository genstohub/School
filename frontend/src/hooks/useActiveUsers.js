import { useState, useEffect, useMemo } from "react";
import { useSocket } from "./useSocket";

const useFilterByRole = (role) => {
    const { socket, isConnected } = useSocket();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (!isConnected) return;

        socket.on("getActiveUsers", setUsers);

        return () => {
            socket.off("getActiveUsers", setUsers);
        };
    }, [isConnected, socket]);

    return useMemo(() => {
        return users.filter(u => u.role === role);
    }, [users, role]);
};

export const useActiveStudents = () => useFilterByRole("student");
export const useActiveInstructors = () => useFilterByRole("instructor");
export const useActiveWorkers = () => useFilterByRole("worker");