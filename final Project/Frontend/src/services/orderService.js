// HELPER FUNCTIONS FOR EXECUTING API CALLS

const API_URL = 'http://localhost:8000/orders';

export const orderService = {
    async createOrder (orderData) {
        // SENDS LOGIN CREDENTIALS TO BACKEND 1️⃣
        const response = await fetch(`${API_URL}/create-order`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderData)
        });

        // CONVERTS DATA RECEIVED (FROM THE BACKEND) INTO JSON 2️⃣
        const data = await response.json(); // Success or Fail

        // IF THERE IS AN ERROR 2️⃣
        if (!response.ok) {
            throw new Error(data.message || 'Login Failed');
        }

        // SAVE USER DATA TO LOCALSTORAGE FOR PERSISTENCE 3️⃣
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));

        // SENDS DATA TO CLIENT 3️⃣
        return data
    },
}