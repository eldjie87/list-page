document.addEventListener('DOMContentLoaded', function () {
    const itemList = document.getElementById('item-list');
    const totalPrice = document.getElementById('total-price');

    async function updateItemList() {
        try {
            const res = await fetch('https://www.eldjie.uk/api/products');
            const data = await res.json();
            const items = Array.isArray(data.product) ? data.product : [];

            itemList.innerHTML = '';
            let total = 0;

            if (items.length === 0) {
                itemList.innerHTML = '<li>No products found</li>';
                totalPrice.textContent = 'Total: NT$0';
                return;
            }

            items.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span style="flex:1;">${item.name}</span>
                    <span style="flex:1; text-align:center; color:gray;">${formatDate(item.date)}</span>
                    <span style="flex:1; text-align:right; color:red; font-weight:bold;">NT$${item.price}</span>
                `;
                li.style.display = "flex";
                li.style.alignItems = "center";
                itemList.appendChild(li);
                total += Number(item.price) || 0;
            });

            totalPrice.textContent = `Total: NT$${total.toLocaleString()}`;
        } catch (error) {
            console.error('Error updating item list:', error);
            itemList.innerHTML = '<li>Error fetching products</li>';
            totalPrice.textContent = 'Total: NT$0';
        }
    }

    setInterval(updateItemList, 3000);

    function formatDate(date) {
        if (!date) return '-';
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }

    updateItemList(); // panggil pertama kali saat load
});
