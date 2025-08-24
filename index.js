document.addEventListener('DOMContentLoaded', function () {
    const itemList = document.getElementById('item-list');
    const totalPrice = document.getElementById('total-price');

    async function updateItemList() {
        try {
            const res = await fetch('https://rose.eldjie.uk/api/shopping-list');
            const items = await res.json();
            itemList.innerHTML = '';
            let total = 0;
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
                total += Number(item.price);
            });
            totalPrice.textContent = `Total: NT$${total.toLocaleString()}`;
        } catch (error) {
            console.error('Error updating item list:', error);
        }
    }

    setInterval(updateItemList, 3000);

    function formatDate(date) {
        if (!date) return '-';
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }

});