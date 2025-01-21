/**
 * Load Expense to server
 * @param {String} token 
 * @returns 
 */
export async function loadExpense(token, params = {}) {
    let firstDay = '';
    let lastDay = '';
   
    if (JSON.stringify(params) !== '{}') {
        firstDay = params.firstDay;
        lastDay = params.lastDay;
    }
    const url = `https://xpayapi.texva.id/api/expense?limit=100&firstday=${firstDay}&lastday=${lastDay}`;
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
    const url = 'https://xpayapi.texva.id/api/expense';
    const dataPost = {
        date: data.date,
        nominal: data.nominal,
        deskripsi: data.deskripsi,
        id_tipe_expense : data.id_tipe_expense,
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
    const url = `https://xpayapi.texva.id/api/expense/${idExpense}`;
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
    const url = `https://xpayapi.texva.id/api/expense/${idExpense}`;
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
    const url = 'https://xpayapi.texva.id/api/expense/' + idExpense;
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


export async function getTypeExpense(token) {
    const url = 'https://xpayapi.texva.id/api/tipe_expense';
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