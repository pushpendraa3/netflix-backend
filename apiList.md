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

    get /categories - json
    get /subcategories - within a category, json


/user
    get / res.send('respond with a resource');

    get /login - view login
    post /login - send emailid password. check ifAuth
    get /dashboard - shows dashboard
    
    todo: create middleware to check isUserAuth 
            if isUserAuth == true => Admin dashboard
            if false then login page

    todo: /logout

    todo: feat: upload videos