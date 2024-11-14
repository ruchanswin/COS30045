let image = document.getElementsByClassName("image")[0]; // Get the first element with the class name "image"
let caption = document.getElementsByClassName("table-caption")[0]; // Get the first element with the class name "table-caption"

function display2019Image(){
    image.src = "2019.png";
    image.alt = "Statistics for Australian pet ownership for 2019";
    caption.innerHTML = "Most popular pet owned by Australians in 2019"
}

function display2021Image(){
    image.src = "2021.png";
    image.alt = "Statistics for Australian pet ownership for 2021";
    caption.innerHTML = "Most popular pet owned by Australians in 2021";
}

function display20192021Image(){
    image.src = "2019-2021.png";
    image.alt = "Statistics for Australian pet ownership from 2019 to 2021";
    caption.innerHTML = "Comparison of most popular pet owned by Australians from 2019 to 2021";
}