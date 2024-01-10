'use client'
import React from 'react'
import Logo from './logo'
import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import { MENU_NAVIGATION } from '@/constants'
import SearchBar from './search-bar'
import UserInfo from './user-info'
export default function Header() {
  return (
    <div className={cn('bg-white px-8 flex justify-between items-center')}>
      <div className={cn('flex')}>
        <Logo />
        <NavigationMenu>
          <NavigationMenuList>
            {MENU_NAVIGATION.map((menu) => (
              <NavigationMenuItem key={menu.to} className='text-primary-color'>
                {menu?.children?.length > 0 ? (
                  <NavigationMenuTrigger className='font-bold'>
                    {menu.title}
                  </NavigationMenuTrigger>
                ) : (
                  <NavigationMenuLink
                    href={menu.to}
                    className={`${navigationMenuTriggerStyle()} font-bold`}
                  >
                    {menu?.title}
                  </NavigationMenuLink>
                )}
                <NavigationMenuContent>
                  <NavigationMenuLink></NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className={cn('flex items-center gap-4')}>
        <SearchBar />
        <UserInfo />
      </div>
    </div>
  )
}
