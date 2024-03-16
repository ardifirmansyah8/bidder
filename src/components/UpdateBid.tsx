import { zodResolver } from "@hookform/resolvers/zod";
import { useCookies } from "next-client-cookies";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "./ui/button";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useUpdateBid } from "@/hooks/useDataBids";

type Props = {
  id?: number;
  btnText: string;
  data: { id: string; price: number };
  refetch: () => void;
};

const formSchema = z.object({
  bid: z.number().min(1),
});

export default function UpdateBid({ id, btnText, data, refetch }: Props) {
  const cookies = useCookies();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bid: 0,
    },
  });
  const { mutate, isLoading, isSuccess } = useUpdateBid();

  const [isOpen, setIsOpen] = useState(false);

  const userId = cookies.get("user_id");

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({
      id,
      data: {
        collection_id: data.id,
        price: values.bid,
        user_id: Number(userId),
        status: "pending",
      },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      setIsOpen(false);
      form.reset();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (data) {
      form.reset({ bid: id ? data.price : data.price + 1 });
    }
  }, [data]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>{btnText}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2">
            {id ? "Edit" : "Place"} Your Bid
          </DialogTitle>

          <Form {...form}>
            <form className="space-y-3">
              <FormField
                control={form.control}
                name="bid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Bid</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min={id ? data.price : data.price + 1}
                        onChange={(event) =>
                          field.onChange(+event.target.value)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => {
              setIsOpen(false);
              form.reset();
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            isLoading={isLoading}
            onClick={form.handleSubmit(onSubmit)}
          >
            {id ? "Update" : "Place"} Bid
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
