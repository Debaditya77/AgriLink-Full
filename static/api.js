const API_BASE_URL = '/api';

async function fetchInventory() {
    try {
        const response = await fetch(`${API_BASE_URL}/inventory/`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching inventory:', error);
        return [];
    }
}

async function fetchMarketplace() {
    try {
        const response = await fetch(`${API_BASE_URL}/marketplace/`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching marketplace:', error);
        return [];
    }
}

async function scanImage(imageUrl) {
    try {
        const response = await fetch(`${API_BASE_URL}/scanner/analyze`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image_url: imageUrl })
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error scanning image:', error);
        return null;
    }
}
