"use client";

import { SITE_CONFIG } from "@/config/site.config";
import { usePathname } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
import parse from "html-react-parser";

const PageContent = () => {
  const pathname = usePathname();
  const pageContent =
    SITE_CONFIG.pagesContent[pathname as keyof typeof SITE_CONFIG.pagesContent];

  if (!pageContent) {
    return <div>Страница не найдена</div>;
  }

  const cleanHTML = DOMPurify.sanitize(pageContent.content);

  return <div>{parse(cleanHTML)}</div>;
};

export default PageContent;