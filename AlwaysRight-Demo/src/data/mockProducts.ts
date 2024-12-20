// 先定义并导出 categories
export const categories = [
  'All',
  'Electronics',
  'Furniture',
  'Fashion',
  'Appliances',
  'Books'
];

// 然后是 mockProducts 数组
export const mockProducts = [
  // 电子产品
  {
    id: '1',
    name: 'Apple iPhone 15 Pro',
    description: 'A17 Pro chip, 48MP main camera, titanium design, 6.1" Super Retina XDR display, Dynamic Island, USB-C, all-day battery life.',
    price: 999.99,
    originalPrice: 1299.99,
    discountCode: 'SUMMER20',
    discountPercentage: 20,
    stock: 50,
    category: 'Electronics',
    status: 'active',
    createdAt: '2024-03-20',
    updatedAt: '2024-03-20',
    imageUrl: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-1.jpg',
    rating: 4.5,
    reviews: [
      {
        id: '1',
        userId: 'user1',
        userName: 'John Doe',
        rating: 5,
        comment: 'Great product, very satisfied!',
        createdAt: '2024-03-20T10:00:00Z'
      }
    ]
  },
  {
    id: '2',
    name: 'Samsung 65" OLED 4K TV',
    description: 'Quantum HDR OLED, Neural Quantum Processor 4K, Dolby Atmos, Gaming Hub, Smart TV features with voice control.',
    price: 1799.99,
    stock: 30,
    category: 'Electronics',
    status: 'active',
    createdAt: '2024-03-20',
    updatedAt: '2024-03-20',
    imageUrl: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTmOrYvfLFJ9OHEdAC6ZwUcoZlTHiTYpzYhcWwZU32pvH0aDVccDsVRfHnV9IoKkvDIqQkb22WNYt7Fr_DvMk0Q_j0wVCej2keuW6UhQlmshcfUSrWfvXMr-w'
  },

  // 家具
  {
    id: '3',
    name: 'Modern Leather Sofa',
    description: 'Premium genuine leather, ergonomic design, comfortable seating for 3, perfect for modern living rooms.',
    price: 899.99,
    stock: 15,
    category: 'Furniture',
    status: 'active',
    createdAt: '2024-03-20',
    updatedAt: '2024-03-20',
    imageUrl: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRd0CxYM0kOnUr_36SFmIAMHb0JOxHC4gIE1Vfzxy6zBr59CAlz8ot_XH0env4djYM6caBhMtw7EmFfN58TE5qSQqmgtpdy-I4KddJHoCykCLR0TsKPfGWi5Q&usqp=CAc'
  },
  {
    id: '4',
    name: 'Adjustable Standing Desk',
    description: 'Electric height adjustment, memory settings, anti-collision system, cable management, solid wood top.',
    price: 499.99,
    stock: 25,
    category: 'Furniture',
    status: 'active',
    createdAt: '2024-03-20',
    updatedAt: '2024-03-20',
    imageUrl: 'https://img.kwcdn.com/product/fancy/f1e43325-9743-42ea-af09-179186f90223.jpg?imageView2/2/w/800/q/70/format/webp'
  },

  // 服装
  {
    id: '5',
    name: 'Nike Air Max 2024',
    description: 'Latest Air Max technology, breathable mesh upper, responsive cushioning, perfect for running and casual wear.',
    price: 179.99,
    stock: 100,
    category: 'Fashion',
    status: 'active',
    createdAt: '2024-03-20',
    updatedAt: '2024-03-20',
    imageUrl: 'https://static.nike.com/a/images/f_auto/dpr_3.0,cs_srgb/h_363,c_limit/f0aed4a2-9e3d-435d-ac6c-645c03aafab5/air-max-day-2024-introducing-the-air-max-dn-the-next-generation-of-air-technology.jpg'
  },
  {
    id: '6',
    name: 'Classic Leather Jacket',
    description: 'Genuine leather, quilted lining, multiple pockets, perfect for all seasons.',
    price: 299.99,
    stock: 40,
    category: 'Fashion',
    status: 'active',
    createdAt: '2024-03-20',
    updatedAt: '2024-03-20',
    imageUrl: 'data:image/webp;base64,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'
  },

  // 家电
  {
    id: '7',
    name: 'Dyson V15 Vacuum',
    description: 'Powerful suction, HEPA filtration, up to 60 minutes runtime, LCD screen, intelligent sensors.',
    price: 699.99,
    stock: 20,
    category: 'Appliances',
    status: 'active',
    createdAt: '2024-03-20',
    updatedAt: '2024-03-20',
    imageUrl: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTUfLYdMi7YCqixEJDQK82iPeOUM2HnmELKbmPml2B7Sw82elPllpN-GHiwOqUkGWUAJMrG4wOZmp_BVa0_j_0i6YKFVwKwTZQgfOtNr0uHsvq0R7hl33UCHd5m5yKtHk87R6saA1I&usqp=CAc'
  },
  {
    id: '8',
    name: 'KitchenAid Stand Mixer',
    description: '5-quart capacity, 10 speeds, tilt-head design, includes whisk, dough hook, and flat beater.',
    price: 399.99,
    stock: 35,
    category: 'Appliances',
    status: 'active',
    createdAt: '2024-03-20',
    updatedAt: '2024-03-20',
    imageUrl: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTjvjRpQLWsaHbV5_miP8IrRQrJm7YH9n8t57GxQs2svdOoHWgq3OyaFDHomGqQypYNzwki_HacTZKpdiUy325m_4WE_G_FCzA13AkxlsybZQnMC9RUmUiCcA'
  },

  // 书籍
  {
    id: '9',
    name: 'Atomic Habits',
    description: 'James Clears guide to building good habits and breaking bad ones. #1 New York Times bestseller.',
    price: 24.99,
    stock: 150,
    category: 'Books',
    status: 'active',
    createdAt: '2024-03-20',
    updatedAt: '2024-03-20',
    imageUrl: 'https://m.media-amazon.com/images/I/81wgcld4wxL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    id: '10',
    name: 'Kindle Paperwhite',
    description: '6.8" display, 8GB storage, waterproof, adjustable warm light, weeks of battery life.',
    price: 139.99,
    stock: 60,
    category: 'Electronics',
    status: 'active',
    createdAt: '2024-03-20',
    updatedAt: '2024-03-20',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRKMy03vWoKVorv6KqJPuCIKSfEYQe34P2PXUIg-SHbT3VQERqA7lk74Iu8jWnShZXOlCVeSAeS2GfcQLbDYjtEYBWUh5iySet619ZQBMyJJWdRlsqAht1LCA'
  }
]; 