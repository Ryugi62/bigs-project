import { DefaultOptions, QueryClient } from "@tanstack/react-query";

const defaultOptions: DefaultOptions = {
  queries: {
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 30 * 1000,
  },
};

export function createQueryClient() {
  return new QueryClient({ defaultOptions });
}

