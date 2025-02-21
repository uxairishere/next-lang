"use client"
import Link from "next/link";
import * as React from "react";
import { redirect, usePathname } from 'next/navigation';
import { BsRobot } from "react-icons/bs";
import { MdAutoGraph } from "react-icons/md";
import { TfiWrite } from "react-icons/tfi";


import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Languages, PagesDictionary } from "@/constants/types";
import { cn } from "@/lib/utils";
import { LuPencilRuler } from "react-icons/lu";
import { languages } from "@/constants/constants";

export function NavbarMenu({ dict, lang }: { dict: PagesDictionary, lang: Languages }) {
    const pathname = usePathname()
    const [selectedLang, setSelectedLang] = React.useState(lang);

    const menuItems = [
        { href: `/${selectedLang}`, label: dict.pages.home.name, icon: <LuPencilRuler className="w-5 h-5" /> },
        { href: `/${selectedLang}/humanizer`, label: dict.pages.humanizer.name, icon: <BsRobot  className="w-5 h-5" /> },
        { href: `/${selectedLang}/research-paper`, label: dict.pages.research.name, icon: <MdAutoGraph className="w-5 h-5" /> },
        { href: `/${selectedLang}/rewrite`, label: dict.pages.rewrite.name, icon: <TfiWrite className="w-5 h-5" /> },
    ];

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newLang = event.target.value as Languages;
        setSelectedLang(newLang);
        const currentPath = pathname.split('/').slice(2).join('/');
        redirect(`${process.env.NEXT_PUBLIC_APP_URL}/${newLang}/${currentPath}`);
    };

    return (
        <NavigationMenu className="bg-gradient-to-r w-fit py-3 px-5  rounded-xl m-5 mx-auto from-stone-400/20 via-stone-500/20 to-stone-600/20">
            <NavigationMenuList className="gap-5 md:gap-10">
                {menuItems.map((item, index) => (
                    <NavigationMenuItem key={index}>
                        <Link href={item.href} legacyBehavior passHref>
                            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "px-2 md:px-7 gap-5 font-bold text-base tracking-wider text-stone-600 hover:text-stone-950 bg-transparent")}>
                                {item.icon && item.icon}
                                <h1 className="hidden md:block">{item.label}</h1>
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                ))}
                <NavigationMenuItem>
                    <select
                        className={navigationMenuTriggerStyle()}
                        value={selectedLang}
                        onChange={handleLanguageChange}
                    >
                        {Object.entries(languages).map(([key, value]) => (
                            <option key={key} value={key}>
                                {value.charAt(0).toUpperCase() + value.slice(1)}
                            </option>
                        ))}
                    </select>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
