"use client";

import { SITE_CONFIG } from "@/config/site.config";
import { usePathname } from "next/navigation";


const Title = () => {

    const pahtname = usePathname();

    const currentNavItem = SITE_CONFIG.navItems.find((item) => item.href === pahtname);

    const pageTitle = currentNavItem ? currentNavItem.label : SITE_CONFIG.title;
    return(
        <div className="w-full flex justify-center my-6">
            <h1 className="text-3xl font-bold">{pageTitle}</h1>
        </div>
    )

}

export default Title;