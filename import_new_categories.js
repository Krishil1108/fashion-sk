const { createClient } = require('@sanity/client');

// Initialize Sanity Client with Write Permission
const token = process.env.SANITY_API_TOKEN;
const projectId = '4s5sjzi0';
const dataset = 'production';

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2023-05-03',
  token,
  useCdn: false
});

// Cache to prevent uploading duplicate images
const imageCache = {};

// Download and upload image to Sanity assets
async function getUploadedImageAssetId(url) {
  if (imageCache[url]) {
    return imageCache[url];
  }

  try {
    console.log(`Downloading: ${url}`);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Fetch failed: ${res.statusText}`);
    const buffer = Buffer.from(await res.arrayBuffer());

    // Extract filename from URL or use a generic one
    let filename = url.split('/').pop().split('?')[0];
    if (!filename || !filename.includes('.')) {
        filename = 'image.jpg';
    }

    // Upload image to Sanity
    const asset = await client.assets.upload('image', buffer, { filename });
    console.log(`✓ Image uploaded: ${filename} -> ${asset._id}`);
    imageCache[url] = asset._id;
    return asset._id;
  } catch (err) {
    console.error(`✕ Image upload failed for ${url}:`, err.message);
    return null;
  }
}

const newProducts = [
  // KIDS
  {
    image_url: "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?auto=format&fit=crop&q=80&w=600",
    brand: "H&M Kids",
    para: "Boys Blue Printed T-Shirt",
    price: 499,
    strikedoffprice: 799,
    offer: "30% OFF",
    category: "kids"
  },
  {
    image_url: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&q=80&w=600",
    brand: "Mothercare",
    para: "Girls Pink Ruffled Dress",
    price: 1299,
    strikedoffprice: 2499,
    offer: "45% OFF",
    category: "kids"
  },
  {
    image_url: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=600",
    brand: "Max",
    para: "Boys Yellow Cotton Shirt",
    price: 699,
    strikedoffprice: 999,
    offer: "30% OFF",
    category: "kids"
  },
  {
    image_url: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=600",
    brand: "GAP Kids",
    para: "Girls Denim Overalls",
    price: 1899,
    strikedoffprice: 2999,
    offer: "35% OFF",
    category: "kids"
  },
  {
    image_url: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&q=80&w=600",
    brand: "Puma",
    para: "Kids Running Shoes",
    price: 2199,
    strikedoffprice: 3599,
    offer: "40% OFF",
    category: "kids"
  },
  {
    image_url: "https://images.unsplash.com/photo-1604467794349-0b74285de7e7?auto=format&fit=crop&q=80&w=600",
    brand: "Allen Solly Junior",
    para: "Boys Navy Blue Trousers",
    price: 1099,
    strikedoffprice: 1599,
    offer: "30% OFF",
    category: "kids"
  },

  // BEAUTY
  {
    image_url: "https://images.unsplash.com/photo-1596462502278-27bf85033e5a?auto=format&fit=crop&q=80&w=600",
    brand: "MAC",
    para: "Matte Ruby Woo Lipstick",
    price: 1950,
    strikedoffprice: 2500,
    offer: "20% OFF",
    category: "beauty"
  },
  {
    image_url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600",
    brand: "L'Oreal Paris",
    para: "Hyaluronic Acid Serum",
    price: 899,
    strikedoffprice: 1199,
    offer: "25% OFF",
    category: "beauty"
  },
  {
    image_url: "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=600",
    brand: "Maybelline",
    para: "Fit Me Matte Foundation",
    price: 549,
    strikedoffprice: 699,
    offer: "20% OFF",
    category: "beauty"
  },
  {
    image_url: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600",
    brand: "Chanel",
    para: "Coco Mademoiselle Perfume",
    price: 12500,
    strikedoffprice: null,
    offer: "",
    category: "beauty"
  },
  {
    image_url: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=600",
    brand: "Clinique",
    para: "Moisture Surge 100H",
    price: 2950,
    strikedoffprice: 3500,
    offer: "15% OFF",
    category: "beauty"
  },
  {
    image_url: "https://images.unsplash.com/photo-1580870058882-628469d76378?auto=format&fit=crop&q=80&w=600",
    brand: "Nykaa Cosmetics",
    para: "Eyeshadow Palette",
    price: 999,
    strikedoffprice: 1499,
    offer: "30% OFF",
    category: "beauty"
  },

  // STUDIO
  {
    image_url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600",
    brand: "Studio Exclusive",
    para: "Trendy Yellow Co-ord Set",
    price: 2499,
    strikedoffprice: 3999,
    offer: "35% OFF",
    category: "studio"
  },
  {
    image_url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600",
    brand: "Influencer Pick",
    para: "Urban Chic Leather Jacket",
    price: 4599,
    strikedoffprice: 6999,
    offer: "30% OFF",
    category: "studio"
  },
  {
    image_url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=600",
    brand: "Fashion Week",
    para: "Elegant White Summer Dress",
    price: 3199,
    strikedoffprice: 4999,
    offer: "35% OFF",
    category: "studio"
  },
  {
    image_url: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=600",
    brand: "Streetwear",
    para: "Oversized Denim Jacket",
    price: 2899,
    strikedoffprice: 4299,
    offer: "30% OFF",
    category: "studio"
  },
  {
    image_url: "https://images.unsplash.com/photo-1485230405346-71acb9518d9c?auto=format&fit=crop&q=80&w=600",
    brand: "Designer Label",
    para: "Abstract Print Midi Skirt",
    price: 1999,
    strikedoffprice: 3499,
    offer: "40% OFF",
    category: "studio"
  },
  {
    image_url: "https://images.unsplash.com/photo-1509631179647-0c37cb110cf5?auto=format&fit=crop&q=80&w=600",
    brand: "Vogue Collection",
    para: "Metallic Evening Gown",
    price: 5999,
    strikedoffprice: 8999,
    offer: "30% OFF",
    category: "studio"
  }
];

async function run() {
  console.log('Starting upload of new categories...');
  
  for (const prod of newProducts) {
    const assetId = await getUploadedImageAssetId(prod.image_url);
    if (!assetId) continue;

    const doc = {
      _type: 'product',
      title: prod.para,
      brand: prod.brand,
      price: prod.price,
      category: prod.category,
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: assetId
        }
      }
    };

    if (prod.strikedoffprice) doc.strikedPrice = prod.strikedoffprice;
    if (prod.offer) doc.offer = prod.offer;

    try {
      const result = await client.create(doc);
      console.log(`✓ Product created: ${prod.brand} - ${result._id}`);
    } catch (e) {
      console.error(`✕ Failed to create product ${prod.brand}:`, e.message);
    }
  }
  
  console.log('--- UPLOAD COMPLETE ---');
}

run();
