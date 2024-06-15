const productOptionElmnts = document.querySelectorAll('.product-options a');
const productElmnts = document.querySelectorAll('.product');
const productsSection = document.getElementById('products-section');

productOptionElmnts.forEach(link => {
    link.addEventListener('click', (event) => {
        productOptionElmnts.forEach(option => option.classList.remove('active'));
        link.classList.add('active');
        productsSection.scrollIntoView({ behavior: 'smooth' });

        const category = link.getAttribute('search-category');
        if (category === 'all') {
            enableAllProducts();
        }
        else if (category === 'new') {
            enableNewProducts();
        }
        else if (category === 'top') {
            enableTopProducts();
        }
    })
})

function enableAllProducts() {
    productElmnts.forEach(product => {
        if (product.classList.contains('show') === false)
            product.classList.add('show');
    });
}

function enableNewProducts() {
    productElmnts.forEach(product => {
        category = product.getAttribute('product-category');

        if (category === 'new') {
            if (product.classList.contains('show') === false)
                product.classList.add('show');
        } 
        else {
            if (product.classList.contains('show'))
                product.classList.remove('show');
        }
    });
}

function enableTopProducts() {
    productElmnts.forEach(product => {
        category = product.getAttribute('product-category');

        if (category === 'top') {
            if (product.classList.contains('show') === false)
                product.classList.add('show');
        } 
        else {
            if (product.classList.contains('show'))
                product.classList.remove('show');
        }
    });
}

document.querySelector('.product-options a.active').click();