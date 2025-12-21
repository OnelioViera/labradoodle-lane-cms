import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'authorName',
    defaultColumns: ['authorName', 'location', 'approved'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'authorName',
      type: 'text',
      required: true,
      label: 'Customer Name',
    },
    {
      name: 'location',
      type: 'text',
      label: 'Location',
      admin: {
        placeholder: 'e.g., Denver, CO',
      },
    },
    {
      name: 'testimonial',
      type: 'textarea',
      required: true,
      label: 'Testimonial',
      admin: {
        placeholder: 'What they said about their experience...',
      },
    },
    {
      name: 'puppyName',
      type: 'text',
      label: 'Puppy Name',
      admin: {
        description: 'Name of the puppy they purchased (optional)',
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Photo',
      admin: {
        description: 'Photo of the customer or their puppy (optional)',
      },
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      label: 'Rating (1-5 stars)',
      admin: {
        description: 'Star rating out of 5',
      },
    },
    {
      name: 'date',
      type: 'date',
      label: 'Date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'approved',
      type: 'checkbox',
      defaultValue: true,
      label: 'Approved for Display',
      admin: {
        description: 'Only approved testimonials will show on website',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Featured Testimonial',
      admin: {
        description: 'Show prominently on homepage',
      },
    },
  ],
}

