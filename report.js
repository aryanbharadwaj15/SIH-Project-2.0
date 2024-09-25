document.getElementById('reportForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Show loading spinner
    document.getElementById('loading').style.display = 'block';

    // Simulate report generation time
    setTimeout(() => {
        // Hide loading spinner
        document.getElementById('loading').style.display = 'none';

        // Show report output
        document.querySelector('.report-output').style.display = 'block';

        // Get form values
        const reportTitle = document.getElementById('reportTitle').value;
        const reportDate = document.getElementById('reportDate').value;
        const preparedBy = document.getElementById('preparedBy').value;
        const reportDescription = document.getElementById('reportDescription').value;
        const additionalNotes = document.getElementById('additionalNotes').value;

        // Set report output fields
        document.getElementById('reportTitleOutput').innerText = reportTitle;
        document.getElementById('reportDateOutput').innerText = reportDate;
        document.getElementById('preparedByOutput').innerText = preparedBy;
        document.getElementById('reportDescriptionOutput').innerText = reportDescription;
        document.getElementById('additionalNotesOutput').innerText = additionalNotes;

        // Sample data for the report
        const totalItems = 150;
        const expiringSoon = 10;
        const lowStock = 25;

        // Set sample metrics in report
        document.getElementById('totalItemsOutput').innerText = totalItems;
        document.getElementById('expiringSoonOutput').innerText = expiringSoon;
        document.getElementById('lowStockOutput').innerText = lowStock;

        // Generate chart data dynamically
        const ctx = document.getElementById('reportChart').getContext('2d');
        const reportChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Total Items', 'Expiring Soon', 'Low Stock'],
                datasets: [{
                    label: 'Inventory Summary',
                    data: [totalItems, expiringSoon, lowStock],
                    backgroundColor: ['#007bff', '#ff6384', '#ffce56'],
                    borderColor: ['#007bff', '#ff6384', '#ffce56'],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }, 2000);
});

// Print Report functionality
document.getElementById('printReport').addEventListener('click', function () {
    window.print();
});

// Download as PDF functionality
document.getElementById('downloadReport').addEventListener('click', function () {
    const reportContent = document.querySelector('.report-output').innerHTML;
    const opt = {
        margin: 1,
        filename: 'report.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(reportContent).set(opt).save();
});
