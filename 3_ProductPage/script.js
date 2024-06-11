const imgs = document.querySelectorAll('.imgSelect a');
const imgBtns = [ ... imgs];
let imgId = 0;

imgBtns.forEach((imgItem) => {
    imgItem.addEventListener('click', (event) => {
        event.preventDefault();
        imgId = imgItem.dataset.id;
        slideImage();
    });
});

function slideImage() {
    const displayWidth = document.querySelector('.imgShowcase img:first-child').clientWidth;

    document.querySelector('.imgShowcase').style.transform = `translateX(${- (imgId) * displayWidth}px)`;
}

window.addEventListener('resize', slideImage);