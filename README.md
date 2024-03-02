# js-gallery
Javascript gallery to organize images by predeterminated key tags

## :open_file_folder: Folder structure
```
js-gallery
└── gallery
    ├── dependencies        --> Project dependencies
    ├── images              --> Source images
    │   ├── 001.png
    │   ├── ...
    │   └── 009.png
    ├── collector.js        --> Main JS file
    ├── data.js             --> Array database with the sources
    ├── index.html          --> Main HTML page
    └── tags.js             --> Available tags and authors to search
```

## :page_facing_up: Features:
### Tag search: 
- Find all images that fit with your selected tags;
- If no tags are selected, will return all images;
- Result images must have all your selected parameters, that means if you chose "Red" and "Blue", you should expect to receive images with both tags, not only one of them.
### Author search:
- Works together with tag search;
- If no author is selected, will return all images;
- If selected an author with no images, no images will be displayed;
- If you selected more than one author, the results will be all images from them.
### Shuffle search:
- The usual search button will retrieve all filtered images in a predeterminated order, but you can use the shuffle search to receive images in a randomized way.

## :construction: Next steps:
1. Expand images: Attach links to result images and implement expanding/zoom or open image;
2. Sort authors/tags ascending: Sort tags for better search experience;
3. Identify author: Show a small label to know to which author the image belongs.