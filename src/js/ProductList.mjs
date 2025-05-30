import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    // console.log(`Product: ${product.Name}, FinalPrice: ${product.FinalPrice}, SuggestedRetailPrice: ${product.SuggestedRetailPrice}`);

    const isDiscounted = product.SuggestedRetailPrice && product.FinalPrice < product.SuggestedRetailPrice;
    const discountTag = isDiscounted ? `<span class="discount-badge">Discount!</span>` : "";
    const originalPrice = isDiscounted ? `<p class="original-price">Was: $${product.SuggestedRetailPrice}</p>` : "";

    return `
        <li class="product-card">
            <a href="product_pages/?product=${product.Id}">
                <img src="${product.Image}" alt="${product.Name}">
                <h2>${product.Brand.Name}</h2>
                <h3>${product.Name}</h3>
                ${discountTag}
                <p class="product-card__price">$${product.FinalPrice}</p>
                ${originalPrice}
            </a>
        </li>
    `;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {  
        try {
            const list = await this.dataSource.getData();
            // console.log("Product List", list);
            this.renderList(list); 
        } catch (error) {
            console.error("Error fetching product list:", error);
        }
    }

    renderList(list) {
        if (!list || list.length === 0) {
            console.warn("No products found!");
            this.listElement.innerHTML = "<p>No products available.</p>";
            return;
        }

        renderListWithTemplate(productCardTemplate, this.listElement, list);
    } 
}

