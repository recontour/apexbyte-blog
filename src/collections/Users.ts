import { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'name', // Use the name in the list view instead of email
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true, // Every author needs a name
    },
    {
      name: 'bio',
      type: 'textarea', // A short text box for "About the Author"
    },
    // Email is added automatically by auth: true
  ],
}
