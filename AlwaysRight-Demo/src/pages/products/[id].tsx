import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Rating,
  Box,
  TextField,
  Divider,
  Snackbar,
  Alert,
  Chip,
  Stack,
  CircularProgress
} from '@mui/material';
import {
  Star,
  LocalOffer,
  ShoppingCart,
  ArrowBack,
  ThumbUp,
  Share
} from '@mui/icons-material';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { mockProducts } from '../../data/mockProducts';
import { useCart } from '../../context/CartContext';

// 类型定义
interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discountCode?: string;
  discountPercentage?: number;
  stock: number;
  category: string;
  status: string;
  imageUrl: string;
  rating: number;
  reviews: Review[];
}

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [userRating, setUserRating] = useState<number | null>(0);
  const [comment, setComment] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      // 从 mockProducts 中查找对应的商品
      const foundProduct = mockProducts.find(p => p.id === id);
      
      if (foundProduct) {
        // 确保数据符合 Product 接口
        const formattedProduct: Product = {
          ...foundProduct,
          rating: foundProduct.rating || 0,
          reviews: foundProduct.reviews || [],
          originalPrice: foundProduct.originalPrice,
          discountCode: foundProduct.discountCode,
          discountPercentage: foundProduct.discountPercentage
        };
        setProduct(formattedProduct);
      } else {
        setProduct(null);
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = () => {
    if (!userRating || !comment) {
      alert('Please provide both rating and comment');
      return;
    }

    const newReview: Review = {
      id: Date.now().toString(),
      userId: 'current-user-id', // 从用户会话获取
      userName: 'Current User', // 从用户会话获取
      rating: userRating,
      comment,
      createdAt: new Date().toISOString()
    };

    // 更新产品评论
    if (product) {
      const updatedProduct = {
        ...product,
        reviews: [...product.reviews, newReview],
        rating: calculateAverageRating([...product.reviews, newReview])
      };
      setProduct(updatedProduct);
      
      // 保存到 localStorage
      const products = JSON.parse(localStorage.getItem('products') || '[]');
      const updatedProducts = products.map((p: Product) => 
        p.id === product.id ? updatedProduct : p
      );
      localStorage.setItem('products', JSON.stringify(updatedProducts));
    }

    // 重置表单
    setUserRating(0);
    setComment('');
    setShowSuccess(true);
  };

  const calculateAverageRating = (reviews: Review[]) => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return Number((sum / reviews.length).toFixed(1));
  };

  const handleApplyDiscount = () => {
    if (product && product.discountCode === discountCode) {
      const discountedPrice = product.price * (1 - (product.discountPercentage || 0) / 100);
      setProduct({
        ...product,
        price: discountedPrice
      });
      setShowSuccess(true);
    } else {
      alert('Invalid discount code');
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button onClick={() => router.back()} sx={{ mb: 3 }}>
          Back to Products
        </Button>

        <Grid container spacing={4}>
          {/* 产品图片部分 */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <img
                src={product.imageUrl}
                alt={product.name}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px'
                }}
              />
            </Paper>
          </Grid>

          {/* 产品信息部分 */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h4" gutterBottom>
                {product.name}
              </Typography>

              {/* 价格和折扣信息 */}
              <Box sx={{ mb: 2 }}>
                {product.originalPrice && (
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ textDecoration: 'line-through' }}
                  >
                    ${product.originalPrice.toFixed(2)}
                  </Typography>
                )}
                <Typography variant="h5" color="primary">
                  ${product.price.toFixed(2)}
                </Typography>
                {product.discountPercentage && (
                  <Chip
                    icon={<LocalOffer />}
                    label={`${product.discountPercentage}% OFF`}
                    color="error"
                    size="small"
                    sx={{ ml: 1 }}
                  />
                )}
              </Box>

              {/* 折扣码输入 */}
              <Box sx={{ mb: 3 }}>
                <TextField
                  size="small"
                  placeholder="Enter discount code"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  sx={{ mr: 1 }}
                />
                <Button
                  variant="outlined"
                  onClick={handleApplyDiscount}
                >
                  Apply
                </Button>
              </Box>

              <Typography variant="body1" sx={{ mb: 3 }}>
                {product.description}
              </Typography>

              {/* 评分显示 */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating value={product.rating} precision={0.1} readOnly />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  ({product.reviews?.length || 0} reviews)
                </Typography>
              </Box>

              {/* 添加到购物车按钮 */}
              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{ mb: 2 }}
              >
                Add to Cart
              </Button>
            </Paper>
          </Grid>

          {/* 评论部分 */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Customer Reviews
              </Typography>

              {/* 添加评论表单 */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Write a Review
                </Typography>
                <Rating
                  value={userRating}
                  onChange={(_, newValue) => setUserRating(newValue)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Share your thoughts about this product..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  onClick={handleAddReview}
                >
                  Submit Review
                </Button>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* 评论列表 */}
              <Box>
                {product.reviews?.map((review) => (
                  <Box key={review.id} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Rating value={review.rating} readOnly size="small" />
                      <Typography variant="subtitle2" sx={{ ml: 1 }}>
                        {review.userName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        {new Date(review.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      {review.comment}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Snackbar
          open={showSuccess}
          autoHideDuration={6000}
          onClose={() => setShowSuccess(false)}
        >
          <Alert severity="success" sx={{ width: '100%' }}>
            {discountCode ? 'Discount applied successfully!' : 'Review added successfully!'}
          </Alert>
        </Snackbar>
      </Container>
    </DashboardLayout>
  );
}