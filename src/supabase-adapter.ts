import { createClient } from '@supabase/supabase-js'
import type { Adapter } from '@payloadcms/plugin-cloud-storage/types'

export const supabaseAdapter = (): Adapter => {
  return ({ collection, prefix }: any) => {
    const supabase = createClient(
      process.env.SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    )

    const getSupabaseURL = (filename: string) => {
      return `${process.env.SUPABASE_URL}/storage/v1/object/public/media/${filename}`
    }

    return {
      name: 'supabase',
      
      generateURL: ({ filename, prefix }: { filename: string; prefix?: string }) => {
        return getSupabaseURL(filename)
      },

      handleUpload: async ({ data, file }: any) => {
        const filename = file.filename || `${Date.now()}-${file.name}`
        
        const { error } = await supabase.storage
          .from('media')
          .upload(filename, data, {
            contentType: file.mimeType,
            upsert: true,
          })

        if (error) {
          console.error('Supabase upload error:', error)
          throw error
        }

        return file
      },

      handleDelete: async ({ filename, prefix }: { filename: string; prefix?: string }) => {
        const { error } = await supabase.storage
          .from('media')
          .remove([filename])

        if (error) {
          console.error('Supabase delete error:', error)
        }
      },

      staticHandler: async (req: any, { params }: any) => {
        try {
          const filename = params?.filename
          if (!filename) {
            return new Response('Filename required', { status: 400 })
          }

          // Get the file from Supabase
          const { data, error } = await supabase.storage
            .from('media')
            .download(filename)

          if (error || !data) {
            return new Response('Not found', { status: 404 })
          }

          // Convert blob to array buffer
          const buffer = await data.arrayBuffer()

          return new Response(buffer, {
            status: 200,
            headers: {
              'Content-Type': data.type || 'application/octet-stream',
              'Cache-Control': 'public, max-age=31536000',
            },
          })
        } catch (error) {
          console.error('Static handler error:', error)
          return new Response('Error serving file', { status: 500 })
        }
      },
    }
  }
}
