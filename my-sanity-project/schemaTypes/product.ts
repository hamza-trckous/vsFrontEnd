// schemas/product.ts
const product = {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {name: 'title', title: 'Title', type: 'string'},
    {name: 'price', title: 'Price', type: 'number'},
    {name: 'image', title: 'Image', type: 'image', options: {hotspot: true}},

    // العلاقة هنا 👇
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
    },
  ],
}

export default product
