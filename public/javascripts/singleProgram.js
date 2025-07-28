function loaded() {
    const id = document.getElementById("programId").innerText;
    const url = `/program/${id}`;
    fetch(url)
        .then(response => response.json())
        .then(json => {
            const data = json.result;
            const root = document.getElementById("root");
            root.innerHTML = `
                <button onclick="window.location.href='/program/view/edit/${data.idprogram}'">Edit Program</button>
                <button onclick="window.location.href='/program/delete/${data.idprogram}'">Delete Program</button>
                <button onclick="window.location.href='/program/view/new'">Add New Program</button>
            `;
            root.innerHTML += `
                <div id="heroContainer">
                    <div class="left">
                        <h1>${data.programname}</h1>
                        <p>${data.description}</p>
                    </div>
                    <div class="right">
                        <img src="/images/${data.poster}" alt="">
                        ${data.video ? `<video width="300" controls style="margin-top:10px;"><source src="/videos/${data.video}" type="video/mp4">Your browser does not support the video tag.</video>` : ''}
                    </div>
                </div>
                <div class="details">
                    <p class="status">${data.status}</p>
                    <p class="casts">${data.casts}</p>
                    <p class="releaseDate">${data.releasedate}</p>
                    <p class="category">${data.idcategory}</p>
                    <p class="subcategory">${data.idsubcategory}</p>
                </div>
            `;
        })
        .catch(error => {
            console.error('Error fetching program:', error);
        });
}