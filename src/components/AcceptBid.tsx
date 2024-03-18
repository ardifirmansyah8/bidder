import { useEffect, useState } from "react";

import { Button } from "./ui/button";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "./ui/dialog";
import { useUpdateBid } from "@/hooks/useDataBids";
import { useUpdateCollection } from "@/hooks/useDataCollections";
import { Bid, Collection } from "@/types";

type Props = {
  dataCollection: Collection;
  dataBid: Bid;
};

export default function AcceptBid({ dataCollection, dataBid }: Props) {
  const {
    mutate: mutateBid,
    isLoading: loadingBid,
    isSuccess: successBid,
  } = useUpdateBid();
  const {
    mutate: mutateCollection,
    isLoading: loadingCol,
    isSuccess: successCol,
  } = useUpdateCollection();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (successBid) {
      mutateCollection({
        id: dataCollection.id,
        data: { ...dataCollection, status: "sold" },
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successBid]);

  useEffect(() => {
    if (successBid && successCol) {
      window.location.reload();
    }
  }, [successBid, successCol]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Accept</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will approve bid.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Back
          </Button>
          <Button
            disabled={loadingBid && loadingCol}
            isLoading={loadingBid && loadingCol}
            onClick={() =>
              mutateBid({
                id: dataBid.id,
                data: { ...dataBid, status: "accepted" },
              })
            }
          >
            Approve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
