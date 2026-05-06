const API_URL = "https://sistema-chamados-backend-production.up.railway.app";

// 🔐 helper pra pegar token
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
};

// 🔥 helper de erro
const handleResponse = async (response: Response) => {
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.error || "Erro na requisição");
    }

    return data;
};

// ================= AUTH =================

export const login = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await handleResponse(response);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    return data;
};

export const register = async (
    email: string,
    password: string,
    name: string
) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
    });

    return handleResponse(response);
};

// ================= TICKETS =================

// GET
export const getTickets = async () => {
    const response = await fetch(`${API_URL}/tickets`, {
        method: "GET",
        headers: getAuthHeaders(),
    });

    return handleResponse(response);
};

// CREATE
export const createTicket = async (
    title: string,
    description: string,
    priority: string
) => {
    const response = await fetch(`${API_URL}/tickets`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ title, description, priority }),
    });

    return handleResponse(response);
};

// 🗑️ DELETE
export const deleteTicket = async (id: string) => {
    const response = await fetch(`${API_URL}/tickets/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });

    return handleResponse(response);
};

// 🔄 UPDATE (status)
export const updateTicket = async (id: string, status: string) => {
    const response = await fetch(`${API_URL}/tickets/${id}`, {
        method: "PUT", // ou PATCH se sua API usar
        headers: getAuthHeaders(),
        body: JSON.stringify({ status }),
    });

    return handleResponse(response);
};