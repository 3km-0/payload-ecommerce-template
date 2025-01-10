import type { CollectionConfig } from "payload";

import { authenticated } from "@/access/authenticated";

export const Administrators: CollectionConfig = {
  slug: "administrators",
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["name", "email"],
    useAsTitle: "name",
  },
  auth: true,
  fields: [
    {
      name: "name",
      type: "text",
    },
  ],
  timestamps: true,
};
