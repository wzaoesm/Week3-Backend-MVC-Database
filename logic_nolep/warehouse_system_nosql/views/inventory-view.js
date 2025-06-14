class InventoryView {
    static displayAggregatedProductInventory(items) {
        console.log(items);
    }

    static displayTotalInventoryValue(data) {

        const formattedData = data.map(item => {
            const totalValueFormatted = typeof item.totalValue === 'number'
                ? item.totalValue.toFixed(2) // Format menjadi string dengan 2 desimal
                : item.totalValue; // Biarkan apa adanya jika bukan angka

            return {
                ...item, // Salin properti lain dari objek item
                totalValue: totalValueFormatted
            };
        });

        console.log(formattedData);
    }
}

export default InventoryView;