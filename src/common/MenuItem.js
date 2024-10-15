import {
   ShoppingBasket,
   Server,
   ShoppingCart,
   Home,
   Settings,
   UserRound,
   CircleUserRound,
   MessageSquareDot
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
      url:'/customer'
    },
    {
      key:'Staff',
      label:'Staff',
      isTitle:false,
      icon:CircleUserRound,
      url:'/staff'
    },
    {
      key:'Orders',
      label:'Orders',
      isTitle:false,
      icon: ShoppingCart,
      url:'/order'
    },
    {
      key:"Complains",
      label:"Complains",
      isTitle:false,
      icon:MessageSquareDot,
      url:'/complain'
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