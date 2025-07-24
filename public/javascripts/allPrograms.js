function loaded() {
    console.log("All products page loaded");

    // Fetch all programs from the server
    fetch('/program')
        .then(response => response.json())
        .then(json => {
            console.log(json);
            const programs = json.result;
            console.log(programs);
            // Display the programs in the HTML
            const root = document.getElementById("root");
            // in root div, add a button to add new program
            root.innerHTML = `
                <button onclick="window.location.href='/program/view/new'">Add New Program</button>
                <h1>All Programs</h1>
            `;
            // generate using js

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