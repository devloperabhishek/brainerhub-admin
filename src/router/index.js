import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '../utils/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/Login.vue'),
      meta: { authRequires: false}
    },
    {
      path: '/products',
      name: 'product',
      component: () => import('../views/product/ListProducts.vue'),

    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('../views/category/ListCategories.vue')
    },
    {
      path: '/sub-categories',
      name: 'subcategories,',
      component: () => import('../views/sub-category/ListSubCategories.vue')
    }
  ]
})


router.beforeEach((to, from, next) => {

  let authRequires = true; // initially auth required

	if ('authRequires' in to.meta) {
		authRequires = to.meta.authRequires // if key available then act accordingly
	}

  if (authRequires && !getToken()) {
		next({ path: '/' })
	}
	else {
		next()
	}

  
}) 

export default router
