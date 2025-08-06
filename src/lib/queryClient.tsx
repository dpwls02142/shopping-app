import { cache } from "react";
import { QueryClient } from "@tanstack/react-query";

const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
          retry: 1,
        },
      },
    })
);

export { getQueryClient };
