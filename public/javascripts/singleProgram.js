let data = {
      idprogram : 1,
      programname: "jonny llb 2",
      idcategory: 1,
      idsubcategory: 2,
      description: "text 100",
      status: "text",
      casts: "text",
      poster: "hhh",
      releasedate: "varchar",
      programcol: "h"
    }

function loaded() {
    // get id
    const id = document.getElementById("programId").innerText;

    // make a fetch request to get the program details and store it in var data

    const url = `/program/${id}`;
    fetch(url)
        .then(response => response.json())

        .then(json => {
            // console.log(json);
            data = json.result[0];
            console.log(data);

    // display the data in the HTML

            // add a button to edit the program
            //add a button to delete the program
            const root = document.getElementById("root");
            root.innerHTML = `
                <button onclick="window.location.href='/program/view/edit/${data.idprogram}'">Edit Program</button>
                <button onclick="window.location.href='/program/delete/${data.idprogram}'">Delete Program</button>
                <button onclick="window.location.href='/program/view/new'">Add New Program</button>
                
            `;
            document.getElementById("root").innerHTML += `

                  <div id="heroContainer">
        <div class="left">
            <h1>${data.programname}</h1>
            <p>${data.description}</p>
        </div>
        <div class="right">
            <img src="/images/${data.poster}" alt="">
        </div>
    </div>
    <div class="details">
        <p class="status">${data.status}</p>
        <p class="casts">${data.casts}</p>
        <p class="releaseDate">${data.releasedate}</p>
        <p class="category">${data.idcategory}</p>
        <p class="subcategory">${data.idsubcategory}</p>
    </div>
            `
        })
        

    console.log("single products page loaded");
}

/*
   <div class="card">
                <a href="/program/view/${data.idprogram}">

                    <img src="/images/${data.poster}" alt="img ${data.programname}" width="200" height="300">
                    <h2>${data.programname}</h2>
                    <p>${data.description}</p>
                    <p>Status: ${data.status}</p>
                    <p>Casts: ${data.casts}</p>
                    <p>Release Date: ${data.releasedate}</p>
                    <p>Category ID: ${data.idcategory}</p>
                    <p>Subcategory ID: ${data.idsubcategory}</p>

                </a>
                </div>
*/