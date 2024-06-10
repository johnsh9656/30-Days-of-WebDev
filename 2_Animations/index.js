const toggledAnims = document.querySelectorAll(".toggleImage");

var animsOn = false;

function toggleAnims() {
    animsOn = !animsOn;

    toggledAnims.forEach((image, index) => {
        if (animsOn) {
            switch(index) {
                case 0:
                    image.classList.add("spinToggle");
                    break;
                case 1:
                    image.classList.add("breathToggle");
                    break;
                case 2:
                    image.classList.add("breathSizeToggle");
                    break;
                case 3:
                    image.classList.add("colourToggle");
                    break;
            }
        }
        else {
            switch(index) {
                case 0:
                    image.classList.remove("spinToggle");
                    break;
                case 1:
                    image.classList.remove("breathToggle");
                    break;
                case 2:
                    image.classList.remove("breathSizeToggle");
                    break;
                case 3:
                    image.classList.remove("colourToggle");
                    break;
            } 
        }
    })
}