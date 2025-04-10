import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { config } from '../../config'
import Loading from '../ui/Loading'
import Container from '../ui/Container'

const Product = () => {
  const [productData, setProductData] = useState(null)
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [imgUrl, setImgUrl] = useState("")
  const [color, setColor] = useState("")

  const { id } = useParams()
  const endpoint = id
    ? `${config?.baseUrl}/products/${id}`
    : `${config?.baseUrl}/products`

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(endpoint)
        const data = await response.json()
        if (id) {
          setProductData(data)
          setAllProducts([])
        } else {
          setAllProducts(data)
          setProductData(null)
        }
      } catch (error) {
        console.error('Error fetching product data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  useEffect(() => {
    if (productData) {
      setImgUrl(productData?.images?.[0] || "")
      setColor(productData?.colors?.[0] || "")
    }
  }, [productData])

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          {id && productData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex gap-4">
                {/* Thumbnail gallery */}
                <div className="flex flex-col gap-2">
                  {productData?.images?.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={productData?.name}
                      onClick={() => setImgUrl(image)}
                      className={`w-24 cursor-pointer opacity-80 hover:opacity-100 duration-300 ${
                        imgUrl === image
                          ? 'border border-gray-500 rounded-sm opacity-100'
                          : ''
                      }`}
                    />
                  ))}
                </div>

                {/* Main product image */}
                <div className="flex-1">
                  <img
                    src={imgUrl}
                    alt={productData?.name}
                    className="w-full h-auto rounded-md"
                  />
                </div>
              </div>

              {/* Product info */}
              <div>
                <h1 className="text-3xl font-bold mb-4">{productData?.title}</h1>
                <p className="text-gray-600 mb-2">{productData?.description}</p>
                <p className="text-gray-800 font-semibold">Selected Color: {color}</p>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-4">All Products</h2>
              {allProducts.map((product) => (
                <div key={product.id} className="mb-6">
                  <h3 className="font-bold">{product.title}</h3>
                  <img src={product.images?.[0]} alt={product.title} className="w-40 mt-2" />
                </div>
              ))}
            </div>
          )}
        </Container>
      )}
    </div>
  )
}

export default Product
