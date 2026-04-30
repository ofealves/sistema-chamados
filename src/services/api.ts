const API_URL = "https://sistema-chamados-backend-production.up.railway.app";
export const login = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    console.log("LOGIN RESPONSE:", data);

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    return data;

}

export const registers = async (email: string, password: string, name: string) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, name })
    });
    const data = await response.json();
    return data;

}


export const getTickets = async () => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_URL}/tickets`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}

export const createTicket = async (title: string, description: string, priority: string) => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_URL}/tickets`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description, priority })
    });
    const data = await response.json();
    return data;

}