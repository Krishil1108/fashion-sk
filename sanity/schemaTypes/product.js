export const product = {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title / Description',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'brand',
      title: 'Brand Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Price (Rs.)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: 'strikedPrice',
      title: 'Striked Off Price (Rs.)',
      type: 'number',
    },
    {
      name: 'offer',
      title: 'Offer Tag (e.g. 60% OFF)',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Men', value: 'men' },
          { title: 'Women', value: 'women' },
          { title: 'Home Living', value: 'home_living' },
          { title: 'Kids', value: 'kids' },
          { title: 'Beauty', value: 'beauty' },
          { title: 'Studio', value: 'studio' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
  ],
};
