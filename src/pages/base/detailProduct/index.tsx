import { useEffect, useState } from 'react'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { addToCart, GET_ALL_PRODUCT_API, getProductDetail } from '../../../common/constants/api'
import { typeProduct } from '../../../types/typeProduct'
import Box from '@mui/material/Box'
import { useAppController } from '../../../contexts/app'
import SimilarProducts from '../SimilarProduct'
import MDImage from 'components/ui/MDImage'
import ActionForm from 'components/form/actionForm'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import MDButton from 'components/ui/MDButton'
import { CardActions, MenuItem, Select } from '@mui/material'
import { formatNumber } from 'utils'
import Comments from './comment'
import SliderSyncing from 'components/slider/sliderSyncing'

const DetailProduct = () => {
    const { id } = useParams()
    const [productDetail, setProductDetail] = useState<typeProduct>()
    const [products, setProducts] = useState<Array<typeProduct>>([])
    const navigate = useNavigate()

    // @ts-ignore
    const [userController, userDispatch] = useAppController()

    const fetchData = async () => {
        try {
            const [productDetailResponse, productListResponse] = await Promise.all([
                axios.get(getProductDetail(Number(id))),
                axios.get(GET_ALL_PRODUCT_API),
            ])
            if (productDetailResponse.data) {
                setProductDetail(productDetailResponse.data)
            }
            if (productListResponse.data) {
                setProducts(productListResponse.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [id])

    const handleAddToCart = async (id: number) => {
        const userId = userController?.user?.currentUser?.data.id
        if (userId) {
            try {
                const response = await axios.post(addToCart(userId), {
                    productId: id,
                    quantity: 1,
                })
                if (response.status === 200) {
                    alert('Sản phẩm đã được thêm vào giỏ hàng!')
                }
            } catch (error) {
                console.error(error)
                alert('Đã xảy ra lỗi khi thêm vào giỏ hàng!')
            }
        }
    }

    const handleProductClick = async (product: typeProduct) => {
        await navigate(`/product/${product.id}`)
    }

    const handleBuy = async (item: typeProduct) => {
        if (item.quantity > 0) {
            const isLoggedIn = userController.isLogin

            if (isLoggedIn) {
                const userId = userController?.user?.currentUser?.data.id
                if (userId) {
                    try {
                        const response = await axios.post(addToCart(userId), {
                            productId: item.id,
                            quantity: 1,
                        })
                    } catch (error) {
                        console.error(error)
                        alert('Đã xảy ra lỗi khi thêm vào giỏ hàng!')
                    }
                }
                navigate('/cart')
            } else {
                localStorage.setItem('cart', JSON.stringify({ cart: item }))
                navigate('/checkout-form')
            }
        } else {
            alert('Sản phẩm đang hết hàng')
        }
    }
    const images = [
        'https://theme.hstatic.net/200000690725/1001078549/14/slide_1_img.jpg?v=202',
        'https://360.com.vn/wp-content/uploads/2023/11/BANNER-WEB-1350X490.jpg',
        'https://theme.hstatic.net/200000182297/1000887316/14/ms_banner_img4.jpg?v=840',
    ]
    return (
        <>
            <Grid container spacing={4} p={5}>
                {productDetail && (
                    <>
                        {/* Cột hình ảnh */}
                        <Grid item xs={12} md={6}>
                            <Box
                                display='flex'
                                justifyContent='center'
                                alignItems='center'
                                style={{ position: 'relative' }}
                            >
                                <Zoom zoomMargin={-200}>
                                    <Box
                                        width='100%'
                                        sx={{
                                            overflow: 'hidden',
                                            borderRadius: '10px',
                                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                                        }}
                                    >
                                        {/*<SliderSyncing images={images} />*/}
                                        <MDImage
                                            src={productDetail.image}
                                            alt={productDetail.name}
                                            styles={{
                                                width: '100%',
                                                objectFit: 'cover',
                                                transition: 'transform 0.3s ease-in-out',
                                            }}
                                        />
                                    </Box>
                                </Zoom>
                            </Box>
                        </Grid>

                        {/* Cột thông tin sản phẩm */}
                        <Grid item xs={12} md={6}>
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant='h4'
                                    component='h1'
                                    sx={{
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                        marginBottom: '16px',
                                        color: '#333',
                                    }}
                                >
                                    {productDetail.name}
                                </Typography>

                                {/* Giá tiền */}
                                <Typography
                                    variant='h5'
                                    color='secondary'
                                    component='p'
                                    sx={{ fontWeight: 'bold', marginBottom: '12px' }}
                                >
                                    Giá tiền: {formatNumber(productDetail.price)}VNĐ
                                </Typography>

                                {/* Màu sắc */}
                                <Typography
                                    variant='body1'
                                    color='textPrimary'
                                    component='p'
                                    sx={{ marginBottom: '8px' }}
                                >
                                    <strong>Màu sắc:</strong> Đen, Vàng, Đỏ
                                </Typography>

                                {/* Kích cỡ */}
                                <Typography
                                    variant='body1'
                                    color='textPrimary'
                                    component='p'
                                    sx={{ marginBottom: '8px' }}
                                >
                                    <Select
                                        labelId='size-select-label'
                                        value={''}
                                        onChange={() => {
                                        }}
                                    >
                                        {['X', 'XL', 'XXL'].map((size) => (
                                            <MenuItem key={size} value={size}>
                                                {size}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Typography>

                                {/* Số lượng */}
                                <Typography
                                    variant='body1'
                                    color='textSecondary'
                                    component='p'
                                    sx={{ marginBottom: '16px' }}
                                >
                                    <strong>Số lượng trong kho:</strong> {productDetail.quantity}
                                </Typography>

                                {/* Mô tả sản phẩm */}
                                {productDetail.description && (
                                    <Typography
                                        variant='body2'
                                        color='textSecondary'
                                        component='p'
                                        sx={{
                                            background: '#f9f9f9',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            lineHeight: 1.6,
                                        }}
                                    >
                                        {productDetail.description}
                                    </Typography>
                                )}
                            </CardContent>

                            <CardActions sx={{ marginTop: '20px' }}>
                                <MDButton
                                    sx={{
                                        backgroundColor: '#e11467de',
                                        padding: '12px 24px',
                                        fontWeight: 'bold',
                                        fontSize: '16px',
                                        color: '#fff',
                                        borderRadius: '8px',
                                        marginRight: '16px',
                                    }}
                                    label='Mua ngay'
                                    onClick={() => handleBuy(productDetail)}
                                />
                                <MDButton
                                    sx={{
                                        backgroundColor: '#2D9BEC',
                                        padding: '12px 24px',
                                        fontWeight: 'bold',
                                        fontSize: '16px',
                                        color: '#fff',
                                        borderRadius: '8px',
                                    }}
                                    label='Thêm vào giỏ hàng'
                                    onClick={() => {
                                        if (productDetail?.quantity > 0) {
                                            handleAddToCart(productDetail?.id)
                                        } else {
                                            alert('Sản phẩm đang hết hàng.')
                                        }
                                    }}
                                />
                            </CardActions>
                        </Grid>
                        <Comments productId={productDetail?.id} />
                    </>
                )}
            </Grid>

            <h1 style={{ paddingLeft: '50px' }}>Sản phẩm tương tự</h1>
            <SimilarProducts
                products={products}
                productDetail={productDetail}
                handleProductClick={handleProductClick}
                handleBuy={handleBuy}
                handleAddToCart={handleAddToCart}
            />
        </>
    )
}

export default DetailProduct
