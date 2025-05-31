'use client'

import { useState } from 'react'
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react'
import { useCart } from '@/contexts/cart-context'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart()

  return (
    <>
      {/* Cart Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 rounded-md hover:bg-muted touch-manipulation"
        aria-label="Open cart"
      >
        <ShoppingCart className="h-6 w-6" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-black/50 transition-opacity',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-lg transform transition-transform duration-200 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Shopping Cart</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-md hover:bg-muted touch-manipulation"
              aria-label="Close cart"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <ShoppingCart className="h-12 w-12 mb-4" />
                <p className="text-lg font-medium">Your cart is empty</p>
                <p className="text-sm">Add some products to your cart to see them here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.api_product_id} className="flex gap-4">
                    {/* Product Image */}
                    <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                      {item.main_image_url ? (
                        <Image
                          src={item.main_image_url}
                          alt={item.product_title}
                          fill
                          className="object-contain"
                          sizes="96px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                          No image
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium line-clamp-2">{item.product_title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{item.brand}</p>
                      <div className="font-semibold text-primary mb-2">{item.price}</div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.api_product_id, item.quantity - 1)}
                          className="p-1 rounded-md hover:bg-muted touch-manipulation"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.api_product_id, item.quantity + 1)}
                          className="p-1 rounded-md hover:bg-muted touch-manipulation"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => removeItem(item.api_product_id)}
                          className="p-1 rounded-md hover:bg-muted text-red-500 touch-manipulation ml-auto"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">Total</span>
                <span className="font-semibold text-lg">${totalPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={() => {
                  // Handle checkout
                  console.log('Checkout')
                }}
                className="w-full py-3 px-4 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
} 