import axios from "axios";
import { useMutation, useQuery } from "react-query";

import { Toast, useToast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/lib/constants";
import { Bid } from "@/types";

const handleError = (toast: (props: Toast) => void, e: Promise<Error>) => {
  toast({
    variant: "destructive",
    title: "Uh oh! Something went wrong.",
    description: JSON.stringify(e),
  });
};

export const useFetchBids = (isOpen: boolean, collectionId: number) => {
  return useQuery({
    enabled: isOpen,
    queryKey: ["bids", collectionId],
    queryFn: (): Promise<Bid[]> =>
      axios({
        method: "get",
        url: `${BASE_URL}/bids?collection_id=${collectionId}`,
      })
        .then((res) => res.data)
        .catch((e) => console.error(e)),
  });
};

export const useUpdateBid = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id?: number; data: Omit<Bid, "id"> }) =>
      axios({
        method: id ? "PUT" : "POST",
        url: `${BASE_URL}/bids/${id || ""}`,
        data,
      })
        .then(() =>
          toast({
            description: `Successfully ${id ? "update" : "place"} bid`,
          })
        )
        .catch((e: Promise<Error>) => handleError(toast, e)),
  });
};

export const useCancelBid = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: number) =>
      axios({
        method: "delete",
        url: `${BASE_URL}/bids/${id}`,
      })
        .then(() =>
          toast({
            description: "Successfully cancel bid",
            duration: 200,
          })
        )
        .catch((e) => handleError(toast, e)),
  });
};
