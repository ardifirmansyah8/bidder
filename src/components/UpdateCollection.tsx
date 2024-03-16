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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useUpdateCollection } from "@/hooks/useDataCollections";
import { Collection } from "@/types";

type Props = {
  id?: number;
  btnText: string;
  data?: Collection;
  refetch: () => void;
};

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  stocks: z.number().min(1),
  price: z.number().min(1),
});

export default function UpdateCollection({
  id,
  btnText,
  data,
  refetch,
}: Props) {
  const cookies = useCookies();
  const userId = cookies.get("user_id");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      stocks: 0,
      price: 0,
    },
  });

  const { mutate, isLoading, isSuccess } = useUpdateCollection();

  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({
      id,
      data: {
        ...values,
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
      form.reset(data);
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
            {id ? "Edit" : "Add"} Collection
          </DialogTitle>

          <Form {...form}>
            <form className="space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name of collection" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Description of collection"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-sm text-gray-400">
                      Optional
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stocks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stocks</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        onChange={(event) =>
                          field.onChange(+event.target.value)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
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
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
