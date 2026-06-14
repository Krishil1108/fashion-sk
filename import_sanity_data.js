const vm = require('vm');
const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');

// Initialize Sanity Client with Write Permission
const token = process.env.SANITY_API_TOKEN || 'your_sanity_api_token_here';
const projectId = '4s5sjzi0';
const dataset = 'production';

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2023-05-03',
  token,
  useCdn: false
});

// Mock browser DOM variables for legacy file evaluation
const elementMock = {
  addEventListener: () => {},
  append: () => {},
  setAttribute: () => {},
  style: {},
  value: 'all',
  classList: { add: () => {}, remove: () => {} }
};
global.window = { 
  addEventListener: () => {},
  location: {
    reload: () => {},
    assign: () => {},
    href: ''
  }
};
global.document = {
  getElementById: () => elementMock,
  querySelector: () => elementMock,
  querySelectorAll: () => [elementMock],
  createElement: () => elementMock
};
global.localStorage = { getItem: () => "[]", setItem: () => {} };

// Helper to load file variables
function loadFileVariables(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  vm.runInThisContext(code);
}

// Concurrency Queue to throttle downloads/uploads (limit 5 concurrent requests)
class PQueue {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  add(fn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ fn, resolve, reject });
      this.next();
    });
  }

  next() {
    if (this.running >= this.concurrency || this.queue.length === 0) return;
    this.running++;
    const { fn, resolve, reject } = this.queue.shift();
    fn()
      .then(resolve)
      .catch(reject)
      .finally(() => {
        this.running--;
        this.next();
      });
  }
}

const queue = new PQueue(5);

// Cache to prevent uploading duplicate images
const imageCache = {};

// Download and upload image to Sanity assets
async function getUploadedImageAssetId(urlOrPath) {
  if (imageCache[urlOrPath]) {
    return imageCache[urlOrPath];
  }

  return queue.add(async () => {
    try {
      let buffer;
      let filename = path.basename(urlOrPath).split('?')[0];

      if (urlOrPath.startsWith('http')) {
        const res = await fetch(urlOrPath);
        if (!res.ok) throw new Error(`Fetch failed: ${res.statusText}`);
        buffer = Buffer.from(await res.arrayBuffer());
      } else {
        // Local file path relative to NextJS public folder
        const localPath = path.join(__dirname, 'public', urlOrPath);
        if (!fs.existsSync(localPath)) {
          throw new Error(`Local file not found: ${localPath}`);
        }
        buffer = fs.readFileSync(localPath);
      }

      // Upload image to Sanity
      const asset = await client.assets.upload('image', buffer, { filename });
      console.log(`✓ Image uploaded: ${filename} -> ${asset._id}`);
      imageCache[urlOrPath] = asset._id;
      return asset._id;
    } catch (err) {
      console.error(`✕ Image upload failed for ${urlOrPath}:`, err.message);
      return null;
    }
  });
}

// Paths
const cloneDir = path.join(__dirname, '..', 'Myntra-Clone');

async function importBanners() {
  console.log('--- Importing Banners ---');
  // Hardcoded landing page banners
  const banners = [
    { img: "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/3/28/4ac3be4b-f02c-4106-8dc9-be1898a81def1648463267842-Desktop-Banner-----1920x504.jpg", title: "Desktop Banner 1", page: "landingpage" },
    { img: "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/3/17/8f1a79c7-3f11-4608-9f31-30a03a606cb41647537798522-SS22-DesktopBanners-Unisex.jpg", title: "Desktop Banner 2", page: "landingpage" },
    { img: "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/3/17/1439d458-3f9b-4a49-830c-a47a126bb9311647456798699-Roadster_Desk_Banner.jpg", title: "Desktop Banner 3", page: "landingpage" },
    { img: "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/3/17/52df3f93-8d0f-412d-b416-fc665706199d1647456798690-Casual-Shoes_Dk.jpg", title: "Desktop Banner 4", page: "landingpage" }
  ];

  for (const b of banners) {
    const assetId = await getUploadedImageAssetId(b.img);
    if (!assetId) continue;

    const doc = {
      _type: 'banner',
      title: b.title,
      page: b.page,
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: assetId
        }
      },
      alt: b.title
    };

    const result = await client.create(doc);
    console.log(`Document created: ${result._id}`);
  }
}

async function importDealsGrids() {
  console.log('--- Importing Deal Grids ---');
  loadFileVariables(path.join(cloneDir, 'Landingpage', 'deals.js'));

  const gridMaps = [
    { array: global.dealsArr, section: 'deals' },
    { array: global.bestArr, section: 'best' },
    { array: global.topArr, section: 'top' },
    { array: global.categoriesArr, section: 'categories' },
    { array: global.dealsTopArr, section: 'dealsTop' },
    { array: global.unmissableArr, section: 'unmissable' },
    { array: global.coloursArr, section: 'colours' },
    { array: global.topInfluencersArr, section: 'topInfluencers' },
    { array: global.budgetArr, section: 'budget' },
    { array: global.trendingArr, section: 'trending' }
  ];

  for (const map of gridMaps) {
    if (!map.array) {
      console.warn(`Warning: Array for section ${map.section} was empty/undefined.`);
      continue;
    }
    console.log(`Section: ${map.section} (${map.array.length} items)`);
    for (let i = 0; i < map.array.length; i++) {
      const item = map.array[i];
      const assetId = await getUploadedImageAssetId(item.img);
      if (!assetId) continue;

      const doc = {
        _type: 'dealGrid',
        title: `${map.section} item ${i + 1}`,
        section: map.section,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: assetId
          }
        }
      };

      const result = await client.create(doc);
      console.log(`✓ Grid item created: ${result._id}`);
    }
  }
}

async function importCatalogProducts() {
  console.log('--- Importing Catalog Products ---');

  const categories = [
    { file: path.join(cloneDir, 'menspage', 'mens.js'), varName: 'productData', value: 'men' },
    { file: path.join(cloneDir, 'womensData', 'style&js', 'womens.js'), varName: 'womensData', value: 'women' },
    { file: path.join(cloneDir, 'Home Living Products', 'home_furnishing.js'), varName: 'funitureData', value: 'home_living' }
  ];

  for (const cat of categories) {
    console.log(`Category: ${cat.value} (${cat.file})`);
    loadFileVariables(cat.file);
    const list = global[cat.varName];

    if (!list) {
      console.error(`✕ Error: Could not find variable ${cat.varName} in ${cat.file}`);
      continue;
    }

    console.log(`Found ${list.length} products to import`);
    for (const prod of list) {
      const imgUrl = prod.image_url || prod.img;
      const title = prod.para || prod.title || 'Product';
      const brand = prod.brand || 'Store Brand';
      const priceStr = prod.price || '';
      
      // Parse numbers
      const priceVal = parseInt(priceStr.replace(/[^0-9]/g, ''), 10) || prod.rs || 0;
      const strikedVal = prod.strikedoffprice ? parseInt(prod.strikedoffprice.replace(/[^0-9]/g, ''), 10) : null;
      const offerStr = prod.offer ? prod.offer.replace(/[()]/g, '').trim() : '';

      const assetId = await getUploadedImageAssetId(imgUrl);
      if (!assetId) continue;

      const doc = {
        _type: 'product',
        title,
        brand,
        price: priceVal,
        category: cat.value,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: assetId
          }
        }
      };

      if (strikedVal) doc.strikedPrice = strikedVal;
      if (offerStr) doc.offer = offerStr;

      const result = await client.create(doc);
      console.log(`✓ Product created: ${brand} - ${result._id}`);
    }
  }
}

async function importSiteSettings() {
  console.log('--- Importing Site Settings (Logo) ---');
  const logoPath = '/Common Files/image/myntra-removebg-preview.png';
  const assetId = await getUploadedImageAssetId(logoPath);
  if (!assetId) return;

  const doc = {
    _type: 'siteSettings',
    title: 'Myntra Clone',
    logo: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: assetId
      }
    }
  };

  const result = await client.create(doc);
  console.log(`✓ Site settings created: ${result._id}`);
}

async function cleanExistingData() {
  console.log('--- Cleaning Existing Data ---');
  try {
    await client.delete({ query: '*[_type in ["product", "banner", "dealGrid", "siteSettings"]]' });
    console.log('✓ Clean completed');
  } catch (err) {
    console.error('Clean failed:', err.message);
  }
}

async function run() {
  try {
    console.log('Starting Sanity Migration...');
    await cleanExistingData();
    await importSiteSettings();
    await importBanners();
    await importDealsGrids();
    await importCatalogProducts();
    console.log('--- MIGRATION FULLY COMPLETED ---');
  } catch (err) {
    console.error('Migration failed:', err);
  }
}

run();
