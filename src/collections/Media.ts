import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alt Text',
      admin: {
        description: 'Alternative text for accessibility and SEO',
      },
    },
  ],
  upload: {
    staticDir: 'media',
    disableLocalStorage: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        const supabaseURL = process.env.SUPABASE_URL || 'https://vpxusoradahmqsskbtuj.supabase.co'
        
        // Fix main URL
        if (data.filename) {
          data.url = `${supabaseURL}/storage/v1/object/public/media/${data.filename}`
        }
        
        // Fix thumbnail URL
        if (data.sizes?.thumbnail?.filename) {
          data.thumbnailURL = `${supabaseURL}/storage/v1/object/public/media/${data.sizes.thumbnail.filename}`
          data.sizes.thumbnail.url = `${supabaseURL}/storage/v1/object/public/media/${data.sizes.thumbnail.filename}`
        }
        
        // Fix card URL
        if (data.sizes?.card?.filename) {
          data.sizes.card.url = `${supabaseURL}/storage/v1/object/public/media/${data.sizes.card.filename}`
        }
        
        // Fix tablet URL
        if (data.sizes?.tablet?.filename) {
          data.sizes.tablet.url = `${supabaseURL}/storage/v1/object/public/media/${data.sizes.tablet.filename}`
        }
        
        return data
      },
    ],
  },
}
