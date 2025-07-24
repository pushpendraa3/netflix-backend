/
    get / - index

/program
    get /view/all - view allPrograms
    get /view/edit/:id - view programForm
    get /view/new - view programForm
    get /view/id - view singleProgram

    get / - all programs json
    get /:id - data of program with id
    post /update/:id - updates program details redirects /program/view/id
    get /delete/:id - deletes data redirects /program/view/all
    post /new - adds new program redirects /program/view/all

    todo: get all categories json
    todo: get all subcategories within a category json

    
/user
    / res.send('respond with a resource');