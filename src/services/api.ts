const API_URL = "https://sistema-chamados-backend-production.up.railway.app";
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
};
export const login = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.error || "Erro ao fazer login");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    return data;
};

export const registers = async (
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

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.error || "Erro ao registrar");
    }

    return data;
};

export const getTickets = async () => {
    const response = await fetch(`${API_URL}/tickets`, {
        method: "GET",
        headers: getAuthHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error("Erro ao buscar tickets");
    }

    return data;
};

export const getTicketById = async (id: string) => {
    console.log("URL chamada:", `${API_URL}/tickets/${id}`);
    const response = await fetch(`${API_URL}/tickets/${id}`, {
        method: "GET",
        headers: getAuthHeaders(),
    });

    

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.error || "Erro ao buscar ticket");
    }

    return data;
};

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

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.error || "Erro ao criar ticket");
    }

    return data;
};

export const updateTicket = async (id: string, status: string) => {
    const response = await fetch(`${API_URL}/tickets/${id}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({ status }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.error || "Erro ao atualizar ticket");
    }

    return data;

    
};

export const deleteTicket = async (id: string) => {
    const response = await fetch(`${API_URL}/tickets/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.error || "Erro ao deletar ticket");
    }

    return data;
};

export const getLogs = async () => {
    const response = await fetch(`${API_URL}/logs`, {
        method: "GET",
        headers: getAuthHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error("Erro ao buscar logs");
    }

    return data;
};