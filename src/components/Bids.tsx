"use client";

import { useState } from "react";

import BidItem from "./BidItem";
import Loader from "./ui/loader";
import Empty from "./ui/empty";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useFetchBids } from "@/hooks/useDataBids";
import { Collection } from "@/types";

type Props = {
  collection: Collection;
  isCollectionOwner: boolean;
  isSold: boolean;
};

export default function Bids({ collection, isCollectionOwner, isSold }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, refetch } = useFetchBids(isOpen, collection.id);

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      onClick={() => setIsOpen(!isOpen)}
    >
      <AccordionItem value={collection.name}>
        <AccordionTrigger>Show Bids</AccordionTrigger>
        <AccordionContent className="mt-2 flex flex-col gap-2">
          {isLoading && <Loader />}
          {!isLoading && data?.length === 0 && <Empty text="No bid data" />}
          {!isLoading &&
            data?.map((item, index: number) => (
              <BidItem
                key={item.id}
                idx={index}
                collection={collection}
                data={item}
                isCollectionOwner={isCollectionOwner}
                isSold={isSold}
                refetch={refetch}
              />
            ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
