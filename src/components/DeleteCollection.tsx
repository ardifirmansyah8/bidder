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
import { useDeleteCollection } from "@/hooks/useDataCollections";

type Props = {
  id: number;
  refetch: () => void;
};

export default function DeleteCollection({ id, refetch }: Props) {
  const { mutate, isLoading, isSuccess } = useDeleteCollection();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will delete your collection.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            isLoading={isLoading}
            variant="destructive"
            onClick={() => mutate(id)}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
