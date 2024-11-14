document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('yearRange');
    const selectedYear = document.getElementById('selectedYear');

    slider.addEventListener('input', function() {
        selectedYear.textContent = 'Selected Year: ' + slider.value;
    });
});