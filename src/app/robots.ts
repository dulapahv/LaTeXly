import { MetadataRoute } from "next";

import { BASE_URL } from "@/lib/constants/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: BASE_URL,
  };
}
