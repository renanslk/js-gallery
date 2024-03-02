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
    display: block;
    float: left;
    text-decoration: none;
    padding: 4px;
    margin: 2px;
    background: #ededed;
    color: #808080;
    border-bottom: 1px solid #777777;
    cursor: pointer;`;

    const cssSet = `
    display: block;
    float: left;
    text-decoration: none;
    padding: 4px;
    margin: 2px;
    background: #204cf5;
    color: #ffffff;
    border-top: 1px solid #0025bd;
    cursor: pointer;`;

//=========================================================================================================
//  Search action filter
//=========================================================================================================
function applyFilter(shuffle) {
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

    if (shuffle === true) {
        result.sort(() => Math.random() - 0.5);
    }

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
    let x = document.createElement(type);
    x.setAttribute("src", source[i]);
    x.setAttribute("style", "max-height: 150px; margin: 2px;");
    x.setAttribute("alt", source[i]);
    x.setAttribute("name", "galleryImg");

    let a = document.createElement('a');
    a.setAttribute("href", source[i]);
    a.setAttribute("name", "galleryImgLink");
    a.setAttribute("data-lightbox", "result");
    a.setAttribute("data-title", source[i]);
    a.appendChild(x);

    document.getElementById(elemId).appendChild(a);

    return;
}

function destroyAllImages() {
    let images = document.getElementsByName("galleryImgLink"); 
    let l = images.length;
    for (let i = 0; i < l; i++) { 
        images[0].parentNode.removeChild(images[0]); }
    return;
}

function makeButton(text, elemId, attribute) {
    let x = document.createElement("button");
    x.textContent = text;
    x.addEventListener('click', () => {
        applyFilter(attribute);
    });
    x.setAttribute("style", "margin-left: 10px;");
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
    makeButton("Search", "headerTitle", false);
    makeButton("Shuffle", "headerTitle", true);
}

makeSelectors();