export const banner = {
  name: 'banner',
  title: 'Banner Slider',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Banner Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
    },
    {
      name: 'page',
      title: 'Target Page',
      type: 'string',
      options: {
        list: [
          { title: 'Landingpage', value: 'landingpage' },
          { title: 'Men Homepage', value: 'men' },
          { title: 'Women Homepage', value: 'women' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
  ],
};
