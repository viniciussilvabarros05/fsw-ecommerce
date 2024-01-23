"use client";

import { ProductWithTotalPrice } from "@/helpers/product";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";

export interface CartProduct extends ProductWithTotalPrice {
  quantity: number;
}
interface ICartContext {
  products: CartProduct[];
  cartTotalPrice: number;
  cartBasePrice: number;
  cartTotalDiscount: number;
  total:number;
  subtotal: number;
  totalDiscount: number;
  addProductToCart: (product:CartProduct)=>void;
  decreaseProductQuantity: (productId:string)=>void; 
  increaseProductQuantity: (productId:string)=>void; 
  removeProductFromCart: (productId:string)=>void; 
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cartTotalPrice: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  addProductToCart: ()=>{},
  decreaseProductQuantity: ()=>{},
  increaseProductQuantity: ()=>{},
  removeProductFromCart: ()=>{},
  total:0,
  subtotal: 0,
  totalDiscount: 0,
});

const CartProvider = ({ children }: { children: ReactNode }) => {
    const [products,setProducts] = useState<CartProduct[]>(JSON.parse(localStorage.getItem("@fsw-store/cart-products")|| "[]"));

    const subtotal = useMemo(()=>{
      return products.reduce((acc,product)=>{
        return acc + Number(product.basePrice)*product.quantity
      },0)
    },[products])

    const total = useMemo(()=>{
      return products.reduce((acc,product)=>{
        return acc+product.totalPrice*product.quantity
      },0)
    },[products])

    const totalDiscount = subtotal- total

    function addProductToCart(product:CartProduct){
      const productIsAlreadyOnCart = products.some(cartProduct=> cartProduct.id == product.id)
    
      if(productIsAlreadyOnCart){
        setProducts((prev)=>{
          return prev.map((cartProduct)=> {
            if(cartProduct.id == product.id){
              return {
                ...cartProduct,
                quantity: cartProduct.quantity + product.quantity
              }
            }
            return cartProduct
          })
        })
        return
      }
      setProducts(prev=> [...prev, product])
    }

    function decreaseProductQuantity(productId:string){
      setProducts((prev)=>
        prev.map(cartProduct => {
          if(cartProduct.id === productId){
            return {
              ...cartProduct,
              quantity: cartProduct.quantity -1
            }
          }
          return cartProduct
        }).filter((cartProduct)=> cartProduct.quantity>0)
      )
    }
    function increaseProductQuantity(productId:string){
      setProducts((prev)=>
        prev.map(cartProduct => {
          if(cartProduct.id === productId){
            return {
              ...cartProduct,
              quantity: cartProduct.quantity +1
            }
          }
          return cartProduct
        })
      )
    }
    function removeProductFromCart(productId: string){
      setProducts((prev)=> prev.filter(product => product.id !== productId))
    }

    
    useEffect(()=>{
     
      localStorage.setItem("@fsw-store/cart-products", JSON.stringify(products))
    },[products])
    
    useEffect(()=>{
      setProducts(JSON.parse(localStorage.getItem("@fsw-store/cart-products")|| "[]"))
    },[])

  return (
    <CartContext.Provider
      value={{
        total,
        subtotal,
        totalDiscount,
        addProductToCart,
        products,
        cartTotalPrice: 0,
        cartBasePrice: 0,
        cartTotalDiscount: 0,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProductFromCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider