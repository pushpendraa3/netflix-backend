function loaded() {
    fetch('/program')
        .then(response => response.json())
        .then(json => {
            const programs = json.result;
            const root = document.getElementById("root");
            root.innerHTML = `
                <button onclick="window.location.href='/program/view/new'">Add New Program</button>
                <h1>All Programs</h1>
            `;
            root.innerHTML += programs.map(program => `  
                <div class="card">
                    <a href="/program/view/${program.idprogram}">
                        <img src="/images/${program.poster}" alt="img ${program.programname}" width="200" height="300">
                        <h2>${program.programname}</h2>
                        <p>${program.description}</p>
                        <p>Status: ${program.status}</p>
                        <p>Casts: ${program.casts}</p>
                        <p>Release Date: ${program.releasedate}</p>
                        <p>Category ID: ${program.idcategory}</p>
                        <p>Subcategory ID: ${program.idsubcategory}</p>
                    </a>
                </div>
            `).join('');
        })
        .catch(error => {
            console.error('Error fetching programs:', error);
        });
}