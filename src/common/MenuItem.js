import {
   ShoppingBasket,
   Server,
   ShoppingCart,
   Home,
   Settings,
   UserRound
   
  } from 'lucide-react'


  const MENU_ITEMS = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      isTitle: false,
      icon: Home,
      url: '/',
    },
    {
      key: 'Product',
      label: 'Product',
      isTitle: false,
      icon: ShoppingBasket,
      url: '/product',
  
    },
    {
      key: 'Category',
      label:'Category',
      isTitle:false,
      icon:Server,
      url:'/category'
    },
    {
      key: 'Customer',
      label:'Customer',
      isTitle:false,
      icon:UserRound,
      url:'/Customer'
    },
    {
      key:'Orders',
      label:'Orders',
      isTitle:false,
      icon: ShoppingCart,
      url:'/order'
    },
    {
      key:'Settings',
      label:'Settings',
      isTitle:false,
      icon:Settings,
      url:'/settings'
    }
  
   
  
  
    
   
   
   
  
   
  
  
  
  
   
  ]
  
  export { MENU_ITEMS }