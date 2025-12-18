/**
 * Load Income to server
 * @param {String} token 
 * @returns 
 */
export async function loadIncome(token, params = {}) {
    let firstDay = '';
    let lastDay = '';
   
    if (JSON.stringify(params) !== '{}') {
        firstDay = params.firstDay;
        lastDay = params.lastDay;
    }
    const url = `http://expensio-backend.local/api/income?limit=100&firstday=${firstDay}&lastday=${lastDay}`;
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
 * Insert income to server
 * @param {String} token 
 * @param {Object} data 
 * @returns 
 */
export async function insertIncome(token, data) {
    // Add Expanse
    const url = 'http://expensio-backend.local/api/income';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error("Tambah data gagal.");
    }
    return await response.json();
}

/**
 * Update Income by Id
 * @param {*} token 
 * @param {*} id_income 
 * @param {*} data 
 * @returns 
 */
export async function updateIncome(token, id_income, data) {
    // Edit Expanse
    const url = `http://expensio-backend.local/api/income/${id_income}`;
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
 * Delete Income by Id
 * @param {string} token 
 * @param {number} id_income 
 * @returns 
 */
export async function deleteIncome(token, id_income) {
    const url = `http://expensio-backend.local/api/income/${id_income}`;
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
 * Show Income by Id
 * @param {string} token 
 * @param {number} id_income 
 * @returns 
 */
export async function showIncome(token, id_income) {
    const url = 'http://expensio-backend.local/api/income/' + id_income;
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