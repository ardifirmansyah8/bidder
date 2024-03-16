"use client";

import { useCookies } from "next-client-cookies";

import CancelBid from "./CancelBid";
import UpdateBid from "./UpdateBid";
import RejectBid from "./RejectBid";
import AcceptBid from "./AcceptBid";
import { cn } from "@/lib/utils";
import { Bid, Collection } from "@/types";

type Props = {
  idx: number;
  collection: Collection;
  data: Bid;
  isCollectionOwner: boolean;
  isSold: boolean;
  refetch: () => void;
};

export default function BidItem({
  idx,
  collection,
  data,
  isCollectionOwner,
  isSold,
  refetch,
}: Props) {
  const cookies = useCookies();

  const user_id = cookies.get("user_id");
  const isOwner = data.user_id === Number(user_id);
  const isAccepted = data.status === "accepted";
  const isRejected = data.status === "rejected";

  return (
    <div
      className={cn(
        "w-full flex flex-row items-center justify-between border p-3 rounded-md",
        isAccepted ? "border-green-500" : "",
        isRejected ? "border-red-500" : ""
      )}
    >
      <label className="font-semibold flex items-center gap-2">
        Bid {idx + 1} ($ {data.price})
        {isAccepted && (
          <span className="text-sm text-green-500 font-bold">ACCEPTED!</span>
        )}
        {isRejected && (
          <span className="text-sm text-red-500 font-bold">REJECTED!</span>
        )}
      </label>

      <div className="flex gap-4">
        {isCollectionOwner && !isSold && !isAccepted && !isRejected && (
          <>
            <AcceptBid dataBid={data} dataCollection={collection} />
            <RejectBid data={data} refetch={refetch} />
          </>
        )}
        {isOwner && !isSold && !isAccepted && !isRejected && (
          <>
            <UpdateBid
              id={data.id}
              btnText="Edit"
              refetch={refetch}
              data={{ id: collection.id, price: data.price }}
            />
            <CancelBid id={data.id} refetch={refetch} />
          </>
        )}
      </div>
    </div>
  );
}
