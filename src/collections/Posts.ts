import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'publishedDate'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Post Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
      admin: {
        description: 'Used in the URL - e.g., "new-litter-announcement"',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Content',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Excerpt',
      admin: {
        description: 'Short summary shown in post listings',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Image',
    },
    {
      name: 'gallery',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      label: 'Photo Gallery',
      admin: {
        description: 'Additional photos for the post',
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        {
          label: 'Litter Announcement',
          value: 'litter',
        },
        {
          label: 'Puppy Update',
          value: 'puppy',
        },
        {
          label: 'News',
          value: 'news',
        },
        {
          label: 'Health & Care',
          value: 'health',
        },
        {
          label: 'Events',
          value: 'events',
        },
        {
          label: 'General',
          value: 'general',
        },
      ],
      label: 'Category',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
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
      name: 'publishedDate',
      type: 'date',
      label: 'Published Date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'author',
      type: 'text',
      label: 'Author Name',
      admin: {
        placeholder: 'e.g., Golden Valley Kennels',
      },
    },
  ],
}

