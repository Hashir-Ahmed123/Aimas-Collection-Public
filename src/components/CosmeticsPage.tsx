import React, { useState, useEffect } from 'react';
import { 
  Filter, 
  Search, 
  Grid, 
  List, 
  ChevronDown, 
  Star, 
  Heart,
  ShoppingBag,
  Eye,
  ArrowUpDown,
  X,
  Tag,
  Sparkles
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import ProductQuickView from './product/ProductQuickView';

interface Product {
  id: number;
  name: string;
  nameUrdu: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  isNew: boolean;
  isBestSeller: boolean;
  colors: string[];
  sizes: string[];
  description: string;
  subcategory: string;
  category: string;
}

const cosmeticsProducts: Product[] = [
  {
    id: 1,
    name: "Premium Lipstick Collection",
    nameUrdu: "پریمیم لپ اسٹک مجموعہ",
    price: 2500,
    originalPrice: 3000,
    image: "/cosmetics/a-studio-photograph-showcasing-a-premium_nOoB7vdxQ_KQX2DMWXF27w_Umt4c22LQU6HSMRJJwQJHg.jpeg",
    rating: 4.8,
    reviews: 245,
    isNew: false,
    isBestSeller: true,
    colors: ["Red", "Pink", "Nude", "Berry"],
    sizes: ["Standard"],
    description: "Long-lasting, highly pigmented lipstick collection with matte and glossy finishes",
    subcategory: "lips"
  },
  {
    id: 2,
    name: "Professional Makeup Kit",
    nameUrdu: "پروفیشنل میک اپ کٹ",
    price: 15000,
    image: "/cosmetics/a-photograph-of-a-professional-makeup-ki_zj7rEbm_QSCiXTmU7GyroA_5MuWiBL7TMOb1Tj4zVLSSw.jpeg",
    rating: 4.7,
    reviews: 132,
    isNew: true,
    isBestSeller: false,
    colors: ["Multi"],
    sizes: ["Full Kit"],
    description: "Complete professional makeup kit with eyeshadows, brushes, and accessories",
    subcategory: "kits"
  },
  {
    id: 3,
    name: "Glowing Foundation Set",
    nameUrdu: "چمکدار فاؤنڈیشن سیٹ",
    price: 3800,
    originalPrice: 4500,
    image: "/cosmetics/a-photograph-of-a-sleek-white-ceramic-fo_gZqM3FVqQeiY1gLFZEphRw_s4_-rQmkQHqSkSlVxRci4Q.jpeg",
    rating: 4.5,
    reviews: 167,
    isNew: false,
    isBestSeller: true,
    colors: ["Light", "Medium", "Dark"],
    sizes: ["30ml", "50ml"],
    description: "Full coverage foundation with natural glow and long-lasting formula",
    subcategory: "face"
  },
  {
    id: 4,
    name: "Eyeshadow Palette Pro",
    nameUrdu: "آئی شیڈو پیلیٹ پرو",
    price: 5500,
    image: "/cosmetics/a-photograph-of-an-eyeshadow-palette-pro_1VOmC4zSQ--_WXTe2_Yf9Q_VQskiYilQVadOLIHxGzowQ.jpeg",
    rating: 4.9,
    reviews: 203,
    isNew: false,
    isBestSeller: true,
    colors: ["Neutral", "Bold", "Smokey"],
    sizes: ["24 Shades"],
    description: "Professional eyeshadow palette with highly pigmented, blendable colors",
    subcategory: "eyes"
  },
  {
    id: 5,
    name: "Matte Liquid Lipstick",
    nameUrdu: "میٹ لکوڈ لپ اسٹک",
    price: 1800,
    image: "/cosmetics/a-close-up-studio-photograph-showcases-a_Sh0347V_RNCg4YgH3x1XHQ_F5s5AD30RkO7tTK5fytbzQ.jpeg",
    rating: 4.6,
    reviews: 198,
    isNew: false,
    isBestSeller: true,
    colors: ["Red", "Pink", "Coral", "Plum"],
    sizes: ["5ml"],
    description: "Long-wearing matte liquid lipstick with intense color payoff",
    subcategory: "lips"
  },
  {
    id: 6,
    name: "Waterproof Mascara",
    nameUrdu: "واٹر پروف مسکارا",
    price: 2200,
    image: "/cosmetics/a-photograph-of-a-tube-of-waterproof-mas_P0Dp69dnSHWgSISPClPRRw_wyRbq1eyRUaZqtnPMV3GbQ.jpeg",
    rating: 4.4,
    reviews: 156,
    isNew: true,
    isBestSeller: false,
    colors: ["Black", "Brown"],
    sizes: ["10ml"],
    description: "Volumizing waterproof mascara for dramatic, long-lasting lashes",
    subcategory: "eyes"
  },
  {
    id: 7,
    name: "Contouring Kit",
    nameUrdu: "کنٹورنگ کٹ",
    price: 4500,
    image: "/cosmetics/a-cinematic-still-life-showcasing-a-slee_8S0UDW6GSW-zJjAwvlKZ7A_MtIUHN6vTEiiAewD8zh33Q.jpeg",
    rating: 4.3,
    reviews: 89,
    isNew: true,
    isBestSeller: false,
    colors: ["Light", "Medium", "Dark"],
    sizes: ["6 Shades"],
    description: "Professional contouring kit with highlight and contour shades",
    subcategory: "face"
  },
  {
    id: 8,
    name: "Bridal Makeup Set",
    nameUrdu: "دلہن کا میک اپ سیٹ",
    price: 25000,
    originalPrice: 30000,
    image: "/cosmetics/a-photograph-of-an-open-bridal-makeup-se_ncQrpLNeSDitnPbPubb5Og_0u8B5e-iQ1-IobDuG6MFbg.jpeg",
    rating: 4.9,
    reviews: 67,
    isNew: true,
    isBestSeller: true,
    colors: ["Complete Set"],
    sizes: ["Bridal Kit"],
    description: "Complete bridal makeup collection with premium products for your special day",
    subcategory: "kits"
  },
  {
    id: 9,
    name: "Lip Gloss Collection",
    nameUrdu: "لپ گلاس مجموعہ",
    price: 1500,
    image: "/cosmetics/a-close-up-studio-photograph-showcases-a_ll-ukNYrS4SlIVNbdlCvgg_zeYK24kSSPygUkWr5KViCA.jpeg",
    rating: 4.2,
    reviews: 134,
    isNew: false,
    isBestSeller: false,
    colors: ["Clear", "Pink", "Peach", "Berry"],
    sizes: ["8ml"],
    description: "High-shine lip gloss collection with moisturizing formula",
    subcategory: "lips"
  },
  {
    id: 10,
    name: "Setting Powder",
    nameUrdu: "سیٹنگ پاؤڈر",
    price: 2800,
    image: "/cosmetics/a-close-up-studio-portrait-showcasing-a-_05ZvcXw5TYypvEEaC3awRw_7DH6dVYhTCmtngZB8W6H7Q.jpeg",
    rating: 4.5,
    reviews: 178,
    isNew: false,
    isBestSeller: true,
    colors: ["Translucent", "Light", "Medium"],
    sizes: ["20g"],
    description: "Long-lasting setting powder for a flawless, matte finish",
    subcategory: "face"
  }
];

const subcategories = [
  { id: 'all', name: 'All Cosmetics', nameUrdu: 'تمام کاسمیٹکس' },
  { id: 'face', name: 'Face Makeup', nameUrdu: 'چہرے کا میک اپ' },
  { id: 'eyes', name: 'Eye Makeup', nameUrdu: 'آنکھوں کا میک اپ' },
  { id: 'lips', name: 'Lip Products', nameUrdu: 'ہونٹوں کی مصنوعات' },
  { id: 'kits', name: 'Makeup Kits', nameUrdu: 'میک اپ کٹس' }
];

const sortOptions = [
  { id: 'featured', name: 'Featured' },
  { id: 'price-low', name: 'Price: Low to High' },
  { id: 'price-high', name: 'Price: High to Low' },
  { id: 'rating', name: 'Highest Rated' },
  { id: 'newest', name: 'Newest First' }
];

const CosmeticsPage = () => {
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 30000]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [filteredProducts, setFilteredProducts] = useState(cosmeticsProducts);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const { addToCart, loading: cartLoading } = useCart();

  const allColors = Array.from(new Set(cosmeticsProducts.flatMap(p => p.colors)));
  const allSizes = Array.from(new Set(cosmeticsProducts.flatMap(p => p.sizes)));

  useEffect(() => {
    let filtered = cosmeticsProducts;

    if (selectedSubcategory !== 'all') {
      filtered = filtered.filter(product => product.subcategory === selectedSubcategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.nameUrdu.includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (selectedColors.length > 0) {
      filtered = filtered.filter(product =>
        product.colors.some(color => selectedColors.includes(color))
      );
    }

    if (selectedSizes.length > 0) {
      filtered = filtered.filter(product =>
        product.sizes.some(size => selectedSizes.includes(size))
      );
    }

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        filtered.sort((a, b) => {
          if (a.isBestSeller && !b.isBestSeller) return -1;
          if (!a.isBestSeller && b.isBestSeller) return 1;
          return b.rating - a.rating;
        });
    }

    setFilteredProducts(filtered);
  }, [selectedSubcategory, searchQuery, sortBy, priceRange, selectedColors, selectedSizes]);

  const toggleWishlist = (productId: number) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const clearFilters = () => {
    setSelectedSubcategory('all');
    setSearchQuery('');
    setSortBy('featured');
    setPriceRange([0, 30000]);
    setSelectedColors([]);
    setSelectedSizes([]);
  };

  const handleAddToCart = async (product: Product, selectedColor?: string, selectedSize?: string) => {
    await addToCart(product, selectedColor, selectedSize);
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
      <div className="relative overflow-hidden aspect-[4/5]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          {product.isNew && (
            <span className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-3 py-1 rounded-full text-sm font-poppins font-semibold">
              New
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-poppins font-semibold">
              Best Seller
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-poppins font-semibold">
              Sale
            </span>
          )}
        </div>

        <button
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
        >
          <Heart
            size={18}
            className={`${
              wishlist.includes(product.id)
                ? 'text-red-500 fill-current'
                : 'text-gray-600'
            } transition-colors`}
          />
        </button>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex space-x-2">
            <button 
              onClick={() => setQuickViewProduct(product)}
              className="flex-1 bg-white/90 backdrop-blur-sm text-gray-900 py-3 rounded-lg font-poppins font-semibold flex items-center justify-center space-x-2 hover:bg-white transition-colors"
            >
              <Eye size={18} />
              <span>Quick View</span>
            </button>
            <button 
              onClick={() => handleAddToCart(product)}
              disabled={cartLoading}
              className="flex-1 bg-gradient-to-r from-pink-500 to-orange-500 text-white py-3 rounded-lg font-poppins font-semibold flex items-center justify-center space-x-2 hover:from-pink-600 hover:to-orange-600 transition-colors disabled:opacity-50"
            >
              <ShoppingBag size={18} />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center space-x-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={`${
                i < Math.floor(product.rating)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-sm text-gray-600 font-poppins ml-2">
            {product.rating} ({product.reviews})
          </span>
        </div>

        <h3 className="text-xl font-merriweather font-bold text-gray-900 mb-1">
          {product.name}
        </h3>
        <p className="text-lg font-nastaliq text-gray-600 mb-3">
          {product.nameUrdu}
        </p>

        <p className="text-gray-600 font-poppins text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center space-x-2 mb-4">
          <span className="text-sm text-gray-500 font-poppins">Shades:</span>
          <div className="flex space-x-1">
            {product.colors.slice(0, 3).map((color, index) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{
                  backgroundColor: 
                    color.toLowerCase() === 'red' ? '#ef4444' :
                    color.toLowerCase() === 'pink' ? '#ec4899' :
                    color.toLowerCase() === 'nude' ? '#f5deb3' :
                    color.toLowerCase() === 'berry' ? '#8b0000' :
                    color.toLowerCase() === 'multi' ? 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)' :
                    color.toLowerCase() === 'light' ? '#f8f9fa' :
                    color.toLowerCase() === 'medium' ? '#d4a574' :
                    color.toLowerCase() === 'dark' ? '#8b4513' :
                    color.toLowerCase() === 'neutral' ? '#d4d4aa' :
                    color.toLowerCase() === 'bold' ? '#ff1493' :
                    color.toLowerCase() === 'smokey' ? '#2f4f4f' :
                    color.toLowerCase() === 'black' ? '#000000' :
                    color.toLowerCase() === 'brown' ? '#92400e' :
                    color.toLowerCase() === 'coral' ? '#ff7f50' :
                    color.toLowerCase() === 'plum' ? '#dda0dd' :
                    color.toLowerCase() === 'clear' ? 'transparent' :
                    color.toLowerCase() === 'peach' ? '#ffcba4' :
                    color.toLowerCase() === 'translucent' ? 'rgba(255,255,255,0.5)' :
                    color.toLowerCase() === 'complete set' ? 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #ffa726)' :
                    '#9ca3af'
                }}
                title={color}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-xs text-gray-500 font-poppins">
                +{product.colors.length - 3}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-poppins font-bold text-gray-900">
              PKR {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-lg font-poppins text-gray-500 line-through">
                PKR {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          {product.originalPrice && (
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm font-poppins font-semibold">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-merriweather font-bold text-gray-900 mb-4">
            Cosmetics Collection
          </h1>
          <p className="text-xl text-gray-600 font-poppins max-w-2xl mx-auto">
            Discover our premium beauty and makeup products for every occasion
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search cosmetics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent font-poppins"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {subcategories.map((subcategory) => (
                <button
                  key={subcategory.id}
                  onClick={() => setSelectedSubcategory(subcategory.id)}
                  className={`px-4 py-2 rounded-full font-poppins font-medium transition-all duration-300 ${
                    selectedSubcategory === subcategory.id
                      ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {subcategory.name}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                >
                  <List size={18} />
                </button>
              </div>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 font-poppins focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
                <ArrowUpDown size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors font-poppins"
              >
                <Filter size={18} />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-poppins font-semibold mb-3">Price Range</h4>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="30000"
                      step="500"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600 font-poppins">
                      <span>PKR {priceRange[0].toLocaleString()}</span>
                      <span>PKR {priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-poppins font-semibold mb-3">Shades</h4>
                  <div className="flex flex-wrap gap-2">
                    {allColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => {
                          setSelectedColors(prev =>
                            prev.includes(color)
                              ? prev.filter(c => c !== color)
                              : [...prev, color]
                          );
                        }}
                        className={`px-3 py-1 rounded-full text-sm font-poppins transition-colors ${
                          selectedColors.includes(color)
                            ? 'bg-pink-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-poppins font-semibold mb-3">Sizes</h4>
                  <div className="flex flex-wrap gap-2">
                    {allSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => {
                          setSelectedSizes(prev =>
                            prev.includes(size)
                              ? prev.filter(s => s !== size)
                              : [...prev, size]
                          );
                        }}
                        className={`px-3 py-1 rounded-full text-sm font-poppins transition-colors ${
                          selectedSizes.includes(size)
                            ? 'bg-pink-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 font-poppins"
                >
                  <X size={16} />
                  <span>Clear All Filters</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mb-8">
          <p className="text-gray-600 font-poppins">
            Showing {filteredProducts.length} of {cosmeticsProducts.length} products
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Tag size={32} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-merriweather font-bold text-gray-900 mb-4">
              No products found
            </h3>
            <p className="text-gray-600 font-poppins mb-6">
              Try adjusting your filters or search terms
            </p>
            <button
              onClick={clearFilters}
              className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-3 rounded-full font-poppins font-semibold hover:from-pink-600 hover:to-orange-600 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {filteredProducts.length > 0 && (
          <div className="text-center mt-12">
            <button className="group bg-gradient-to-r from-pink-600 via-orange-500 to-purple-600 text-white px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 mx-auto">
              <Sparkles size={20} />
              <span>Load More Cosmetics</span>
            </button>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <ProductQuickView
          product={quickViewProduct}
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

export default CosmeticsPage;