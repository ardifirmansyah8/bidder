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
import { useCancelBid } from "@/hooks/useDataBids";

type Props = {
  id: number;
  refetch: () => void;
};

export default function CancelBid({ id, refetch }: Props) {
  const { mutate, isLoading, isSuccess } = useCancelBid();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Cancel</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will cancel your bid.
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
            onClick={() => mutate(id)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
