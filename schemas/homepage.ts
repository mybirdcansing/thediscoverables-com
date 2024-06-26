import { HomeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

/**
 * This file is the schema definition for the homepage.
 */

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  icon: HomeIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      title: 'Songs Title',
      name: 'songsTitle',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
    defineField({
      title: 'Albums Title',
      name: 'albumsTitle',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return { title: `Homepage: ${title}` }
    },
  },
})
