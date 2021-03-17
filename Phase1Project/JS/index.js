
function resetData() {
    document.getElementById("title").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("image").value = "";
}

function insertNewBlog(data) {
    var el = document.createElement('div');
    console.log(data.image);
    el.className = 'col';
    // el.id = "col";
    el.innerHTML = '<img src=' + data.image + ' alt = " " style= "height : 200px;"><h2>' + data.title + '</h2><p class = "collapse" id = "collapseExample" aria-expanded = "false">' + data.desc + '</p> <a role = "button" class = "collapsed" data-toggle = "collapse" href= "#collapseExample" aria-expanded="false" aria-controls="collapseExample"></a > ';
    console.log(el);
    document.getElementById('rows').appendChild(el);
}


function reteriveFromSessionAndDisplay() {
    var retrievedObject = sessionStorage.getItem('project');
    console.log('retrievedObject: ', JSON.parse(retrievedObject));
    var result = JSON.parse(retrievedObject)
    console.log(result);
    if(result){
        for(i= 0; i< result.length; i++){
            insertNewBlog(result[i]);
        }
    }
}

function storeintoSession() {
    var newBlog = new Object();

    newBlog.title = document.getElementById('title').value;
    newBlog.desc = document.getElementById('desc').value;
    newBlog.image = document.getElementById('image').files[0].name;
    console.log(newBlog.title);
    console.log(newBlog.desc);
    console.log(newBlog.image);
    if (sessionStorage.project) {
        project = JSON.parse(sessionStorage.getItem('project'));
    } else {
        project = [];
    }
    project.push(newBlog)
    sessionStorage.setItem('project', JSON.stringify(project));
    resetData();
    insertNewBlog(newBlog);
}

