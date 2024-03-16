import axios from "axios";
import { useMutation, useQuery } from "react-query";

import { Toast, useToast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/lib/constants";
import { Bid, Collection } from "@/types";

const handleError = (toast: (props: Toast) => void, e: Promise<Error>) => {
  toast({
    variant: "destructive",
    title: "Uh oh! Something went wrong.",
    description: JSON.stringify(e),
  });
};

export const useFetchCollections = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ["collections"],
    queryFn: (): Promise<Collection[]> =>
      axios({
        method: "get",
        url: `${BASE_URL}/collections`,
      })
        .then((res) => res.data)
        .catch((e: Promise<Error>) => handleError(toast, e)),
  });
};

export const useUpdateCollection = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id?: number; data: Omit<Collection, "id"> }) =>
      axios({
        method: id ? "PUT" : "POST",
        url: `${BASE_URL}/collections/${id || ""}`,
        data,
      })
        .then(() =>
          toast({
            description: `Successfully ${id ? "update" : "create"} collection`,
          })
        )
        .catch((e: Promise<Error>) => handleError(toast, e)),
  });
};

export const useDeleteCollection = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: number) =>
      axios({
        method: "delete",
        url: `${BASE_URL}/collections/${id}`,
      })
        .then(() =>
          toast({
            description: "Successfully delete collection",
            duration: 200,
          })
        )
        .catch((e: Promise<Error>) => handleError(toast, e)),
  });
};
