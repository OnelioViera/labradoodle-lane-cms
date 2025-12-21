import type { CollectionConfig } from 'payload'

export const Dogs: CollectionConfig = {
  slug: 'dogs',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Dog Name',
    },
    {
      name: 'registeredName',
      type: 'text',
      label: 'AKC Registered Name',
      admin: {
        placeholder: 'Full registered name with titles',
      },
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Dam (Female)',
          value: 'dam',
        },
        {
          label: 'Sire (Male)',
          value: 'sire',
        },
        {
          label: 'Both',
          value: 'both',
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        {
          label: 'Active Breeding',
          value: 'active',
        },
        {
          label: 'Retired',
          value: 'retired',
        },
        {
          label: 'In Training',
          value: 'training',
        },
      ],
    },
    {
      name: 'photoUrl',
      type: 'text',
      label: 'Main Photo URL',
      admin: {
        description: 'Paste the full Supabase image URL here',
      },
    },
    {
      name: 'additionalPhotos',
      type: 'array',
      label: 'Additional Photos',
      fields: [
        {
          name: 'url',
          type: 'text',
          label: 'Photo URL',
          required: true,
        },
      ],
    },
    {
      name: 'birthDate',
      type: 'date',
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
    },
    {
      name: 'weight',
      type: 'number',
      label: 'Weight (lbs)',
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Biography',
      admin: {
        placeholder: 'Tell the story of this dog - personality, achievements, etc.',
      },
    },
    {
      name: 'healthClearances',
      type: 'group',
      label: 'Health Clearances',
      fields: [
        {
          name: 'hips',
          type: 'text',
          label: 'OFA Hips',
          admin: {
            placeholder: 'e.g., Excellent, Good, Fair',
          },
        },
        {
          name: 'elbows',
          type: 'text',
          label: 'OFA Elbows',
          admin: {
            placeholder: 'e.g., Normal',
          },
        },
        {
          name: 'heart',
          type: 'text',
          label: 'Heart Clearance',
          admin: {
            placeholder: 'e.g., Clear, Normal',
          },
        },
        {
          name: 'eyes',
          type: 'text',
          label: 'Eye Clearance (CERF/OFA)',
          admin: {
            placeholder: 'e.g., Clear, Normal',
          },
        },
        {
          name: 'dna',
          type: 'textarea',
          label: 'DNA/Genetic Testing',
          admin: {
            placeholder: 'List any genetic tests performed and results',
          },
        },
      ],
    },
    {
      name: 'titles',
      type: 'array',
      label: 'Titles & Achievements',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title or Achievement',
          admin: {
            placeholder: 'e.g., AKC Champion, CGC, Therapy Dog',
          },
        },
        {
          name: 'year',
          type: 'number',
          label: 'Year Earned',
        },
      ],
    },
    {
      name: 'pedigree',
      type: 'group',
      label: 'Pedigree Information',
      fields: [
        {
          name: 'sire',
          type: 'text',
          label: 'Sire (Father)',
        },
        {
          name: 'dam',
          type: 'text',
          label: 'Dam (Mother)',
        },
        {
          name: 'pedigreeLink',
          type: 'text',
          label: 'Pedigree Link',
          admin: {
            placeholder: 'https://...',
          },
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Dog',
      defaultValue: false,
      admin: {
        description: 'Show on main breeding dogs page',
      },
    },
  ],
}

