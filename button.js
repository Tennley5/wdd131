let button = document.getElementById("nbutn");
let input = document.getElementById("ninpt");
button.addEventListener("click", function() {
    if (Number(input.value)> 10) {
        console.log("Number is big!");
    } else {
        console.log("Number is small!");
    }
}
)
;