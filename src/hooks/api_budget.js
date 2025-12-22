const base_url = "https://xpayapi.texva.id";

export async function api_budget_list(token) {
    const url = base_url + '/api/budget';
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


export async function api_budget_show(token, id_tipe) {
    const url = 'https://xpayapi.texva.id/api/budget/' + id_tipe;
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


export async function api_budget_insert(token, data) {
    // Add Budget
    const url = 'https://xpayapi.texva.id/api/budget';
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


export async function api_budget_delete(token, id_tipe) {
    const url = `https://xpayapi.texva.id/api/budget/${id_tipe}`;
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


export async function api_budget_update(token, id_tipe, data) {
    // Edit Expanse
    const url = `https://xpayapi.texva.id/api/budget/${id_tipe}`;
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