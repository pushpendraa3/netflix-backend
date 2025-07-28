function loaded() {
    fetch('/program/categories')
        .then(response => response.json())
        .then(json => {
            const categories = json.result;
            const categorySelect = document.getElementById("idcategory");
            categorySelect.innerHTML = categories.map(category => `
                <option value="${category.idcategory}">${category.categoryname}</option>
            `).join('');
        })
        .catch(error => {
            console.error('Error fetching categories:', error);
        });
}

function getSubcategory() {
    const categorySelect = document.getElementById("idcategory");
    const selectedCategoryId = categorySelect.value;
    fetch(`/program/subcategories?categoryId=${selectedCategoryId}`)
        .then(response => response.json())
        .then(json => {
            const subcategories = json.result;
            const subcategorySelect = document.getElementById("idsubcategory");
            subcategorySelect.innerHTML = subcategories.map(subcategory => `
                <option value="${subcategory.idsubcategory}">${subcategory.subcategoryname}</option>
            `).join('');
        })
        .catch(error => {
            console.error('Error fetching subcategories:', error);
        });
}
