
import payload from 'payload';
import path from 'path';
import fs from 'fs';
import type { Page, Product } from './payload-types';

// Import our custom seed data
import seedData from './seed-data.json';

// This is a build-time script to seed the database with custom content.
// It uses the Payload Local API to interact with the database.
export const seed = async (): Promise<void> => {
  payload.logger.info('Seeding database with custom content...');

  try {
    // Find the 'Settings' global and update the site name
    await payload.updateGlobal({
      slug: 'settings',
      data: {
        siteName: seedData.siteName,
      },
    });

    // Create sample products
    for (const product of seedData.products) {
      await payload.create({
        collection: 'products',
        data: {
          title: product.title,
          description: product.description,
          price: product.price,
          stock: 50,
          _status: 'published',
        },
      });
    }

    // Update the existing 'Home' page
    const { docs: [homePage] } = await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } } });
    if(homePage) {
        await payload.update({
            collection: 'pages',
            id: homePage.id,
            data: {
                layout: [{
                    blockType: 'hero',
                    ...seedData.pages.home.hero
                }]
            }
        });
    }

    // Create an 'About Us' page
    await payload.create({
        collection: 'pages',
        data: {
            title: seedData.pages.about.title,
            slug: 'about',
            layout: [{
                blockType: 'content',
                content: [{ type: 'p', children: [{ text: seedData.pages.about.content }] }]
            }],
            _status: 'published'
        }
    });

    payload.logger.info('✅ Custom seeding complete.');
  } catch (error) {
    payload.logger.error(`Error seeding database: ${error}`);
  }
};
