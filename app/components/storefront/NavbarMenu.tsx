"use client";

import Link from "next/link";
import React from "react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import NavbarMenuListItem from "./NavbarMenuListItem";
import { graisses, huiles } from "@/app/lib/categories";

type AdminType = {
    admin: boolean
}

export function NavbarMenu({ admin }: AdminType) {
    return (
        <div className="hidden md:flex justify-center items-center gap-x-4 ml-8">
            <NavigationMenu>
                <NavigationMenuList>
                    {/* Catalogue */}
                    <NavigationMenuItem>
                        <Link href="/products/all" legacyBehavior passHref>
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                            >
                                Catalogue
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    
                    {/* Huiles */}
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Huiles</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                {huiles.map((component) => (
                                    <NavbarMenuListItem
                                        key={component.title}
                                        title={component.title}
                                        href={component.href}
                                    >
                                        {component.description}
                                    </NavbarMenuListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    
                    {/* Graisses */}
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Graisses</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                {graisses.map((component) => (
                                    <NavbarMenuListItem
                                        key={component.title}
                                        title={component.title}
                                        href={component.href}
                                    >
                                        {component.description}
                                    </NavbarMenuListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    {/* Dashboard */}
                    {admin && (
                        <NavigationMenuItem>
                            <Link href="/dashboard" legacyBehavior passHref>
                                <NavigationMenuLink
                                    className={navigationMenuTriggerStyle()}
                                >
                                    Dashboard
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    )}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}

NavbarMenuListItem.displayName = "ListItem";
