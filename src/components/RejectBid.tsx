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
import { Bid } from "@/types";

type Props = {
  data: Bid;
  refetch: () => void;
};

export default function RejectBid({ data, refetch }: Props) {
  const { mutate, isLoading, isSuccess } = useUpdateBid();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Reject</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will reject bid.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Back
          </Button>
          <Button
            disabled={isLoading}
            isLoading={isLoading}
            variant="destructive"
            onClick={() =>
              mutate({ id: data.id, data: { ...data, status: "rejected" } })
            }
          >
            Reject
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
