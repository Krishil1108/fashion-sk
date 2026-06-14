export const dealGrid = {
  name: 'dealGrid',
  title: 'Deal Grid Block',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title / Alt Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Grid Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'section',
      title: 'Target Section',
      type: 'string',
      options: {
        list: [
          { title: 'Deals of the Day', value: 'deals' },
          { title: 'Best of Myntra', value: 'best' },
          { title: 'Top Picks', value: 'top' },
          { title: 'Categories to Bag', value: 'categories' },
          { title: 'Deals on Top Brands', value: 'dealsTop' },
          { title: 'Unmissable This Season', value: 'unmissable' },
          { title: 'Colours of the Season', value: 'colours' },
          { title: 'Top Influencer Style', value: 'topInfluencers' },
          { title: 'Budget Picks', value: 'budget' },
          { title: 'Trending Outfit', value: 'trending' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
  ],
};
