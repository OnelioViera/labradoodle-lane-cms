import type { CollectionConfig } from 'payload'

export const Puppies: CollectionConfig = {
  slug: 'puppies',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'sex', 'status', 'birthDate', 'price'],
  },
  access: {
    read: () => true, // Public can view puppies
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Puppy Name',
    },
    {
      name: 'sex',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Male',
          value: 'male',
        },
        {
          label: 'Female',
          value: 'female',
        },
      ],
    },
    {
      name: 'birthDate',
      type: 'date',
      required: true,
      label: 'Birth Date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'color',
      type: 'text',
      label: 'Color/Coat',
      admin: {
        placeholder: 'e.g., Light Golden, Dark Golden, Cream',
      },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
      label: 'Price ($)',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'available',
      options: [
        {
          label: 'Available',
          value: 'available',
        },
        {
          label: 'Reserved',
          value: 'reserved',
        },
        {
          label: 'Sold',
          value: 'sold',
        },
      ],
    },
    {
      name: 'photos',
      type: 'upload',
      relationTo: 'media',
      required: false,
      hasMany: true,
      label: 'Photos',
      admin: {
        description: 'Upload multiple photos of this puppy',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        placeholder: 'Describe the puppy\'s personality, unique traits, etc.',
      },
    },
    {
      name: 'dam',
      type: 'relationship',
      relationTo: 'dogs',
      label: 'Mother (Dam)',
      admin: {
        description: 'Select the mother from your breeding dogs',
      },
    },
    {
      name: 'sire',
      type: 'relationship',
      relationTo: 'dogs',
      label: 'Father (Sire)',
      admin: {
        description: 'Select the father from your breeding dogs',
      },
    },
    {
      name: 'weight',
      type: 'number',
      label: 'Current Weight (lbs)',
      admin: {
        description: 'Optional - current weight of puppy',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Puppy',
      defaultValue: false,
      admin: {
        description: 'Show this puppy on homepage',
      },
    },
  ],
}

