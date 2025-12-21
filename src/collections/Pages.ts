import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Page Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
      admin: {
        description: 'Used in the URL - e.g., "about-us", "our-guarantee"',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Page Content',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Image',
      admin: {
        description: 'Main image for the page (optional)',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'published',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
      ],
    },
    {
      name: 'showInMenu',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show in Navigation Menu',
    },
    {
      name: 'menuOrder',
      type: 'number',
      label: 'Menu Order',
      admin: {
        description: 'Order in navigation menu (lower numbers appear first)',
      },
    },
  ],
}

