const PRODUCT_BASE_URL = '/products'
const POST_BASE_URL = '/post'
const DISCOUNT_BASE_URL = '/code'
const TN_BASE_URL = '/tn'
const PLAN_TOUR_BASE_URL = '/plan-tour'
const productsEndpoint = () => {
  return {
    products: () => `${PRODUCT_BASE_URL}/filter`,
    allProducts: () => `${PRODUCT_BASE_URL}/all`,
    productsById: (id: string | undefined): string =>
      `${PRODUCT_BASE_URL}/${id}`,
    categories: () => `${PRODUCT_BASE_URL}/categories`,
    updateProduct: (id: string) => `${PRODUCT_BASE_URL}/${id}`
  }
}

const tnEnpoint = () => {
  return {
    allType: () => `${TN_BASE_URL}/type`,
    allTag: () => `${TN_BASE_URL}/tags`
  }
}

const discountsEndpoint = () => {
  return {
    checkDiscount: () => `${DISCOUNT_BASE_URL}/check`
  }
}

const postsEndpoint = () => {
  return {
    posts: () => `${POST_BASE_URL}`,
    allPosts: () => `${POST_BASE_URL}/all`,
    postById: (id: string) => `${POST_BASE_URL}/${id}`
  }
}

const planTourEndpoint = () => {
  return {
    getPlanTour: () => `${PLAN_TOUR_BASE_URL}`
  }
}

const endpoints = {
  productsEndpoint,
  postsEndpoint,
  discountsEndpoint,
  tnEnpoint,
  planTourEndpoint
}

export default endpoints
