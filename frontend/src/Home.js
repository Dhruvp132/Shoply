import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import CollapsibleSidebar from "./components/CollapsableSideBar";
import Carousel from "./components/Carousel";
import TopNavigation from "./components/TopNavigationbar";
import Product from "./Product.js";
import ProductGrid from "./components/ProductGrid";

// Example categories and subcategories
const categories = [
  {
    name: "Electronics",
    subcategories: ["Mobiles", "Laptops", "Accessories", "Gaming"],
  },
  {
    name: "Fashion",
    subcategories: ["Men", "Women", "Kids"],
  },
  {
    name: "Home & Kitchen",
    subcategories: ["Furniture", "Decor", "Appliances"],
  },
  {
    name: "Books",
    subcategories: ["Fiction", "Non-Fiction", "Children"],
  },
  {
    name: "Sports",
    subcategories: ["Outdoor", "Indoor", "Fitness"],
  },
];

// Carousel slides
const carouselSlides = [
  {
    image: "https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg",
    title: "Great Summer Sale",
    description: "Starts 1st May, Noon",
    darkText: false
  },
  {
    image: "https://m.media-amazon.com/images/I/71U-Q+N7PXL._SX3000_.jpg",
    title: "Electronics Deals",
    description: "Up to 40% off on top brands",
    darkText: false
  },
  {
    image: "https://m.media-amazon.com/images/I/61zAjw4bqPL._SX3000_.jpg",
    title: "Fashion Sale",
    description: "New styles added daily",
    darkText: true
  },
  {
    image: "https://m.media-amazon.com/images/I/71Ie3JXGfVL._SX3000_.jpg",
    title: "Home Essentials",
    description: "Revamp your living space",
    darkText: true
  }
];

function Home() {
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedSort, setSelectedSort] = useState("featured");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Extract search keyword from query parameters
  const searchKeyword = new URLSearchParams(location.search).get("search") || "";

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const [localResponse, apiResponse] = await Promise.all([
          axios.get("http://localhost:5001/admin/products").catch(() => ({ data: { products: [] } })),
          axios.get("https://fakestoreapi.com/products")
        ]);
  
        const localProducts = localResponse.data.products || [];
        const apiProducts = apiResponse.data || [];
  
        // Combine both product arrays and add random categories/subcategories if missing
        const combinedProducts = [...localProducts, ...apiProducts].map(product => {
          if (!product.category) {
            const randomCategory = categories[Math.floor(Math.random() * categories.length)];
            product.category = randomCategory.name;
            product.subcategory = randomCategory.subcategories[Math.floor(Math.random() * randomCategory.subcategories.length)];
          }
          return product;
        });
        
        setFetchedProducts(combinedProducts);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        // If API fails, use sample data
        const sampleProducts = hardcodedProducts;
        setFetchedProducts(sampleProducts);
        setIsLoading(false);
      }
    };

    fetchProducts();
    
    // Set sidebar state based on screen width
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    
    // Initial call
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filtering and sorting logic
  useEffect(() => {
    let filtered = fetchedProducts;

    if (searchKeyword) {
      filtered = filtered.filter(
        (product) =>
          product.title?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          (product.description &&
            product.description.toLowerCase().includes(searchKeyword.toLowerCase()))
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) =>
          product.category &&
          product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedSubcategory) {
      filtered = filtered.filter(
        (product) =>
          product.subcategory &&
          product.subcategory.toLowerCase() === selectedSubcategory.toLowerCase()
      );
    }

    if (selectedGender) {
      filtered = filtered.filter(
        (product) =>
          product.gender &&
          product.gender.toLowerCase() === selectedGender.toLowerCase()
      );
    }

    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      switch (selectedSort) {
        case "featured":
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        case "priceLow":
          return a.price - b.price;
        case "priceHigh":
          return b.price - a.price;
        case "newest":
          return new Date(b.date || 0) - new Date(a.date || 0);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [searchKeyword, fetchedProducts, selectedCategory, selectedSubcategory, selectedGender, selectedSort]);

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(""); // Reset subcategory when category changes
    
    // Close sidebar on mobile after selection
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  // Handle subcategory change
  const handleSubcategoryChange = (subcategory) => {
    setSelectedSubcategory(subcategory);
    
    // Close sidebar on mobile after selection
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  // Handle gender change
  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    
    // Close sidebar on mobile after selection
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  // Handle sort change
  const handleSortChange = (sort) => {
    setSelectedSort(sort);
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Sample hardcoded products
  const hardcodedProducts = [
    {
      id: "12321341",
      title: "The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback",
      price: 11.96,
      rating: 5,
      image: "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg",
      category: "Books",
      subcategory: "Non-Fiction",
      gender: ""
    },
    {
      id: "49538094",
      title: "Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl",
      price: 239.0,
      rating: 4,
      image: "https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg",
      category: "Home & Kitchen",
      subcategory: "Appliances",
      gender: ""
    },
    {
      id: "4903850",
      title: "Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor",
      price: 199.99,
      rating: 3,
      image: "https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg",
      category: "Electronics",
      subcategory: "Gaming",
      gender: "Men"
    },
    {
      id: "23445930",
      title: "Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric",
      price: 98.99,
      rating: 5,
      image: "https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$",
      category: "Electronics",
      subcategory: "Accessories",
      gender: ""
    },
    {
      id: "3254354345",
      title: "New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)",
      price: 598.99,
      rating: 4,
      image: "https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg",
      category: "Electronics",
      subcategory: "Mobiles",
      gender: ""
    },
    {
      id: "90829332",
      title: "Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440",
      price: 1094.98,
      rating: 4,
      image: "https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg",
      category: "Electronics",
      subcategory: "Gaming",
      gender: "Men"
    }
  ];

  // Group products by category for display
  const getProductsByCategory = (category) => {
    return fetchedProducts.filter(product => 
      product.category && product.category.toLowerCase() === category.toLowerCase()
    ).slice(0, 4); // Limit to 4 products per category
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      maxWidth: '1500px',
      margin: '0 auto',
      backgroundColor: '#EAEDED'
    }}>
      {/* Top Navigation with Categories */}
      <TopNavigation 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        onToggleSidebar={toggleSidebar}
      />

      <div style={{
        display: 'flex',
        width: '100%',
        position: 'relative'
      }}>
        {/* Collapsible Sidebar */}
        <CollapsibleSidebar 
          categories={categories}
          selectedCategory={selectedCategory}
          selectedSubcategory={selectedSubcategory}
          selectedGender={selectedGender}
          onCategoryChange={handleCategoryChange}
          onSubcategoryChange={handleSubcategoryChange}
          onGenderChange={handleGenderChange}
          isOpen={sidebarOpen}
          onToggle={toggleSidebar}
        />

        {/* Main Content */}
        <div style={{
          flex: '1',
          padding: '15px',
          transition: 'margin-left 0.3s ease-in-out',
          marginLeft: sidebarOpen && window.innerWidth > 768 ? '0' : '0'
        }}>
          {/* Sidebar Toggle Button (Mobile) */}
          {!sidebarOpen && (
            <button 
              onClick={toggleSidebar}
              style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                zIndex: 1000,
                backgroundColor: '#232f3e',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                cursor: 'pointer',
                fontSize: '20px',
                display: window.innerWidth <= 768 ? 'flex' : 'none',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ☰
            </button>
          )}

          {/* Main Carousel */}
          <Carousel slides={carouselSlides} />

          {/* Featured Products Grid */}
          {!isLoading && !searchKeyword && !selectedCategory && !selectedSubcategory && !selectedGender && (
            <div style={{ marginBottom: '30px' }}>
              {/* Featured Products */}
              <ProductGrid 
                title="Today's Deals" 
                products={hardcodedProducts.slice(0, 4)} 
                columns={4} 
              />
              
              {/* Electronics */}
              <ProductGrid 
                title="Electronics" 
                products={getProductsByCategory("Electronics")} 
                columns={4} 
              />
              
              {/* Fashion */}
              <ProductGrid 
                title="Fashion" 
                products={getProductsByCategory("Fashion")} 
                columns={4} 
              />
              
              {/* Home & Kitchen */}
              <ProductGrid 
                title="Home & Kitchen" 
                products={getProductsByCategory("Home & Kitchen")} 
                columns={4} 
              />
            </div>
          )}

          {/* Category Browsing - Show when a category is selected */}
          {selectedCategory && (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <h1 style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  margin: 0,
                  color: '#232f3e'
                }}>
                  {selectedCategory} {selectedSubcategory ? `> ${selectedSubcategory}` : ''}
                </h1>
                
                <select 
                  value={selectedSort}
                  onChange={(e) => handleSortChange(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                    backgroundColor: 'white',
                    fontSize: '14px'
                  }}
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>
              
              {/* Subcategory Pills */}
              {selectedCategory && (
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px',
                  marginBottom: '20px'
                }}>
                  <button
                    onClick={() => handleSubcategoryChange("")}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '20px',
                      border: '1px solid #ddd',
                      backgroundColor: selectedSubcategory === "" ? '#232f3e' : 'white',
                      color: selectedSubcategory === "" ? 'white' : '#232f3e',
                      fontSize: '14px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    All
                  </button>
                  
                  {categories.find(cat => cat.name === selectedCategory)?.subcategories.map(sub => (
                    <button
                      key={sub}
                      onClick={() => handleSubcategoryChange(sub)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        border: '1px solid #ddd',
                        backgroundColor: selectedSubcategory === sub ? '#232f3e' : 'white',
                        color: selectedSubcategory === sub ? 'white' : '#232f3e',
                        fontSize: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
              
              {/* Filtered Products Grid */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                margin: '0 -10px'
              }}>
                {filteredProducts.length === 0 ? (
                  <div style={{
                    width: '100%',
                    padding: '40px 0',
                    textAlign: 'center',
                    color: '#565959'
                  }}>
                    <p style={{ fontSize: '18px' }}>No products found.</p>
                    <p style={{ fontSize: '14px', marginTop: '10px' }}>Try adjusting your filters or browse our other categories.</p>
                  </div>
                ) : (
                  filteredProducts.map((product) => (
                    <div 
                      key={product.id} 
                      style={{ 
                        width: '25%', 
                        padding: '0 10px',
                        marginBottom: '20px',
                        '@media (max-width: 992px)': {
                          width: '33.333%'
                        },
                        '@media (max-width: 768px)': {
                          width: '50%'
                        },
                        '@media (max-width: 480px)': {
                          width: '100%'
                        }
                      }}
                    >
                      <Product
                        id={product.id}
                        title={product.title}
                        price={product.price}
                        rating={product.rating || 4}
                        image={product.image}
                        category={product.category}
                        subcategory={product.subcategory}
                        gender={product.gender}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Search Results */}
          {searchKeyword && (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <h1 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '20px',
                color: '#232f3e'
              }}>
                Search results for "{searchKeyword}"
              </h1>
              
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                margin: '0 -10px'
              }}>
                {filteredProducts.length === 0 ? (
                  <div style={{
                    width: '100%',
                    padding: '40px 0',
                    textAlign: 'center',
                    color: '#565959'
                  }}>
                    <p style={{ fontSize: '18px' }}>No products found for "{searchKeyword}".</p>
                    <p style={{ fontSize: '14px', marginTop: '10px' }}>Try checking your spelling or use more general terms.</p>
                  </div>
                ) : (
                  filteredProducts.map((product) => (
                    <div 
                      key={product.id} 
                      style={{ 
                        width: '25%', 
                        padding: '0 10px',
                        marginBottom: '20px',
                        '@media (max-width: 992px)': {
                          width: '33.333%'
                        },
                        '@media (max-width: 768px)': {
                          width: '50%'
                        },
                        '@media (max-width: 480px)': {
                          width: '100%'
                        }
                      }}
                    >
                      <Product
                        id={product.id}
                        title={product.title}
                        price={product.price}
                        rating={product.rating || 4}
                        image={product.image}
                        category={product.category}
                        subcategory={product.subcategory}
                        gender={product.gender}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;