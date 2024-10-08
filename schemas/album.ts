import { CaseIcon } from '@sanity/icons'
import { format, parseISO } from 'date-fns'
import { defineField, defineType } from 'sanity'

/**
 * This file is the schema definition for a album.
 */

export default defineType({
  name: 'album',
  title: 'Album',
  icon: CaseIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Image caption',
              description: 'Caption displayed below the image.',
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility.',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'date',
      initialValue: () => format(new Date(), 'yyyy-MM-dd'),
    }),
    defineField({
      title: 'Songs',
      name: 'songs',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'song' }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      publishDate: 'publishDate',
      media: 'coverImage',
    },
    prepare({ title, media, publishDate }) {
      const subtitles = [
        publishDate && `on ${format(parseISO(publishDate), 'LLL d, yyyy')}`,
      ].filter(Boolean)

      return { title, media, subtitle: subtitles.join(' ') }
    },
  },
})
