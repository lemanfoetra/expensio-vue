/**
 * Load Expense to server
 * @param {String} token 
 * @returns 
 */
export async function loadExpense(token) {
    const url = 'http://expense.ardynsulaeman.cloud/api/expense?limit=50';
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    if (!response.ok) {
        throw new Error("Gagal memuat data.");
    }
    return await response.json();
}


/**
 * Insert expense to server
 * @param {String} token 
 * @param {Object} data 
 * @returns 
 */
export async function insertExpense(token, data) {
    // Add Expanse
    const url = 'http://expense.ardynsulaeman.cloud/api/expense';
    const dataPost = {
        date: data.date,
        nominal: data.nominal,
        deskripsi: data.deskripsi,
    };
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dataPost)
    });
    if (!response.ok) {
        throw new Error("Tambah data gagal.");
    }
    return await response.json();
}

/**
 * Update Expense by Id
 * @param {*} token 
 * @param {*} idExpense 
 * @param {*} data 
 * @returns 
 */
export async function updateExpense(token, idExpense, data) {
    // Edit Expanse
    const url = `http://expense.ardynsulaeman.cloud/api/expense/${idExpense}`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error("Edit data gagal.");
    }
    return await response.json();
}

/**
 * Delete Expense by Id
 * @param {string} token 
 * @param {number} idExpense 
 * @returns 
 */
export async function deleteExpense(token, idExpense) {
    const url = `http://expense.ardynsulaeman.cloud/api/expense/${idExpense}`;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error("Hapus data gagal.");
    }
    return await response.json();
}

/**
 * Show Expense by Id
 * @param {string} token 
 * @param {number} idExpense 
 * @returns 
 */
export async function showExpense(token, idExpense) {
    const url = 'http://expense.ardynsulaeman.cloud/api/expense/' + idExpense;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    if (!response.ok) {
        throw new Error("Gagal memuat data.");
    }
    return await response.json();
}