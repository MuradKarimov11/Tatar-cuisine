"use client";

import { SITE_CONFIG } from "@/config/site.config";
import DOMPurify from "isomorphic-dompurify";
import { usePathname } from "next/navigation";
import parse from "html-react-parser";

const PageContent = () => {
    const pathname = usePathname();
    const pageContent  = SITE_CONFIG.pagesContent[pathname as keyof typeof SITE_CONFIG.pagesContent];


    if (!pageContent) {
        return null;
    }

    const clearHTML = DOMPurify.sanitize(pageContent.content);

    return (
        <div>{parse(clearHTML)}</div>
    )

}

export default PageContent;