document.querySelector('form').addEventListener('submit', function (event) {
    const discountsAvailed = document.getElementById('discounts_availed').value;
    if (discountsAvailed < 0 || discountsAvailed > 5) {
        alert('Please enter a value between 0 and 5 for Discounts Availed.');
        event.preventDefault();
    }
});

// Close modal when clicking outside of it
window.onclick = function (event) {
    const modal = document.getElementById("myModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

document.getElementById('predictForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    try {
        const response = await fetch('/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();

        Swal.fire({
            title: result.prediction === 1 ? 'Purchase Likely' : 'No Purchase Likely',
            icon: result.prediction === 1 ? 'success' : 'info',
            confirmButtonText: 'OK',
        });
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            title: 'Error',
            text: `An error occurred: ${error.message}`,
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
});
