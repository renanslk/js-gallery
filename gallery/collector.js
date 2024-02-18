//=========================================================================================================
//  Global data
//=========================================================================================================
const image = {
    PATHNAME: 0,
    TAGS: 1,
    AUTHOR: 2
}

const selectedTags = [];
const selectedAuthors = [];

//=========================================================================================================
//  CSS styles
//=========================================================================================================
const cssUnset = `
    margin: 5px;
    text-decoration: none;
    padding: 4px;
    background: cyan`;

    const cssSet = `
    margin: 5px;
    text-decoration: none;
    padding: 4px;
    background: red`;

//=========================================================================================================
//  Search action filter
//=========================================================================================================
function applyFilter() {
    let result = data.reduce((res, element, i) => {
        if (selectedTags.every(v => element[image.TAGS].includes(v))) {
            if (selectedAuthors.length === 0) {
                res.push(data[i][image.PATHNAME]);
            } else {
                if (selectedAuthors.some(v => element[image.AUTHOR].includes(v))) {
                    res.push(data[i][image.PATHNAME]);
                }
            }
        }
        return res;
    }, []);

    destroyAllImages();
    for (let i = 0; i < result.length; i++) {
        makeImage("img", i, result, "content");
    }
}

//=========================================================================================================
//  Tags actions
//=========================================================================================================

function setUnsetTag(tag, i) {
    if (selectedTags.includes(tag)) {
        selectedTags.splice(selectedTags.indexOf(tag), 1);
        console.log("Tag removed: " + tag);
        const elem = document.getElementById("tag" + i);
        elem.setAttribute("style", cssUnset);
        
    } else {
        selectedTags.push(tag);
        console.log("Tag set: " + tag);
        const elem = document.getElementById("tag" + i);
        elem.setAttribute("style", cssSet);
    }
    console.log(selectedTags);
    return; 
}

function setUnsetAuthor(name, i) {
    if (selectedAuthors.includes(name)) {
        selectedAuthors.splice(selectedAuthors.indexOf(name), 1);
        console.log("Author removed: " + name);
        const elemento = document.getElementById("author" + i);
        elemento.setAttribute("style", cssUnset);
    } else {
        selectedAuthors.push(name);
        console.log("Author set: " + name);
        const elemento = document.getElementById("author" + i);
        elemento.setAttribute("style", cssSet);
    }
    console.log(selectedAuthors);
    return; 
}

//=========================================================================================================
//  Generators
//=========================================================================================================
function makeTagLink(i, source, elemId) {
    let x = document.createElement("a");
    text = document.createTextNode(source[i]);
    x.appendChild(text);
    x.setAttribute("onclick", "setUnsetTag(" + "text" + "," + i + ")");
    x.setAttribute("id", "tag" + i);
    x.setAttribute("href", "#");
    x.setAttribute("style", cssUnset)
    document.getElementById(elemId).appendChild(x);
    return;
}

function makeAuthorLink(i, source, elemId) {
    let x = document.createElement("a");
    text = document.createTextNode(source[i]);
    x.appendChild(text);
    x.setAttribute("onclick", "setUnsetAuthor(" + "text" + "," + i + ")");
    x.setAttribute("id", "author" + i);
    x.setAttribute("href", "#");
    x.setAttribute("style", cssUnset)
    document.getElementById(elemId).appendChild(x);
    return;
}

function makeImage(type, i, source, elemId) {
    var x = document.createElement(type);
    x.setAttribute("src", source[i]);
    x.setAttribute("style", "max-height: 150px; margin: 2px;");
    x.setAttribute("alt", source[i]);
    x.setAttribute("name", "galleryImg");
    document.getElementById(elemId).appendChild(x);
    return;
}

function destroyAllImages() {
    var images = document.getElementsByName("galleryImg"); 
    var l = images.length;
    for (var i = 0; i < l; i++) { 
        images[0].parentNode.removeChild(images[0]); }
    return;
}

function makeButton(text, elemId) {
    var x = document.createElement("button");
    x.textContent = text;
    x.addEventListener('click', () => {
        applyFilter();
    });
    document.getElementById(elemId).appendChild(x);
    return;
}

function makeSelectors() {
    for (let i = 0; i < tags.length; i++) {
        makeTagLink(i, tags, "tags");
    }
    for (let i = 0; i < authors.length; i++) {
        makeAuthorLink(i, authors, "authors")
    }
    makeButton("Search", "tags");
}

makeSelectors();