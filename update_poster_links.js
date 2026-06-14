const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '4s5sjzi0',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false
});

const getSearchUrl = (url) => {
  if (!url) return '/search?q=fashion';
  const lowercaseUrl = url.toLowerCase();
  if (lowercaseUrl.includes('jeans') || lowercaseUrl.includes('denim')) return '/search?q=jeans';
  if (lowercaseUrl.includes('shoes') || lowercaseUrl.includes('sneaker') || lowercaseUrl.includes('crocs') || lowercaseUrl.includes('heels') || lowercaseUrl.includes('puma') || lowercaseUrl.includes('nike')) return '/search?q=shoes';
  if (lowercaseUrl.includes('kurta') || lowercaseUrl.includes('anouk')) return '/search?q=kurta';
  if (lowercaseUrl.includes('shirt') || lowercaseUrl.includes('tee') || lowercaseUrl.includes('top')) return '/search?q=shirt';
  if (lowercaseUrl.includes('dress')) return '/search?q=dress';
  if (lowercaseUrl.includes('saree')) return '/search?q=saree';
  if (lowercaseUrl.includes('trouser')) return '/search?q=trouser';
  if (lowercaseUrl.includes('beauty') || lowercaseUrl.includes('bath') || lowercaseUrl.includes('cosmetics')) return '/beautypage';
  if (lowercaseUrl.includes('kids')) return '/kidspage';
  if (lowercaseUrl.includes('men')) return '/menspage';
  if (lowercaseUrl.includes('women')) return '/womenspage';
  return '/search?q=fashion';
};

async function run() {
  console.log('Fetching banners and grids from Sanity...');
  const docs = await client.fetch(`*[_type in ["banner", "dealGrid"]] {
    _id,
    _type,
    "imageUrl": image.asset->url
  }`);

  let count = 0;
  for (const doc of docs) {
    if (doc.imageUrl) {
      const link = getSearchUrl(doc.imageUrl);
      try {
        await client.patch(doc._id).set({ link }).commit();
        console.log(`✓ Updated ${doc._type} ${doc._id} -> ${link}`);
        count++;
      } catch (err) {
        console.error(`✕ Failed to update ${doc._id}:`, err.message);
      }
    }
  }
  console.log(`--- COMPLETE: Updated ${count} documents ---`);
}

run();
