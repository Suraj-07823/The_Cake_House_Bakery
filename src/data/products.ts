export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: 'cakes' | 'cupcakes' | 'bread' | 'pastries';
}

export const products: Product[] = [
    {
        id: 1,
        name: 'Chocolate Delight Cake',
        description: 'Rich chocolate cake with creamy cocoa frosting',
        price: 450,
        image: '/brand/hero.png', // Temporary until more specific images
        category: 'cakes'
    },
    {
        id: 2,
        name: 'Strawberry Dream',
        description: 'Fresh strawberry cake with whipped cream layers',
        price: 500,
        image: '/brand/hero.png',
        category: 'cakes'
    },
    {
        id: 7,
        name: 'Gourmet Chocolate Cupcake',
        description: 'Soft chocolate cupcake with dark ganache topping',
        price: 60,
        image: '/brand/cupcakes.png',
        category: 'cupcakes'
    },
    {
        id: 8,
        name: 'Vanilla Bliss Cupcake',
        description: 'Classic vanilla cupcake with velvety buttercream',
        price: 55,
        image: '/brand/cupcakes.png',
        category: 'cupcakes'
    },
    {
        id: 101,
        name: 'Artisanal Sourdough',
        description: 'Hand-crafted sourdough with a perfect crust',
        price: 180,
        image: '/brand/bread.png',
        category: 'bread'
    },
    {
        id: 201,
        name: 'Golden Croissant',
        description: 'Buttery, flaky layers baked to golden perfection',
        price: 120,
        image: '/brand/pastries.png',
        category: 'pastries'
    }
];

export const categories = [
    { id: 'all', name: 'All' },
    { id: 'cakes', name: 'Cakes' },
    { id: 'cupcakes', name: 'Cupcakes' },
    { id: 'bread', name: 'Bread' },
    { id: 'pastries', name: 'Pastries' }
];
