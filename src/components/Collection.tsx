"use client";

import { useCookies } from "next-client-cookies";

import { Card, CardContent, CardHeader } from "./ui/card";
import Bids from "./Bids";
import DeleteCollection from "./DeleteCollection";
import UpdateBid from "./UpdateBid";
import UpdateCollection from "./UpdateCollection";
import { Collection } from "@/types";

type Props = {
  data: Collection;
  refetch: () => void;
};

export default function Collection({ data, refetch }: Props) {
  const cookies = useCookies();

  const userId = cookies.get("user_id");
  const isCollectionOwner = data.user_id === Number(userId);
  const isSold = data.status === "sold";

  return (
    <Card key={data.id} className={isSold ? "border-green-500" : ""}>
      <CardHeader className="flex flex-row justify-between">
        <h1 className="text-lg font-semibold flex gap-2 items-center">
          {data.name}
          {isSold && (
            <span className="text-sm text-green-500 font-bold">SOLD!</span>
          )}
        </h1>

        <div className="flex gap-4">
          {!isCollectionOwner && !isSold && (
            <UpdateBid
              btnText="Place Bid"
              data={data}
              refetch={() => window.location.reload()}
            />
          )}
          {isCollectionOwner && !isSold && (
            <>
              <UpdateCollection
                id={data.id}
                btnText="Edit"
                refetch={refetch}
                data={data}
              />
              <DeleteCollection id={data.id} refetch={refetch} />
            </>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <span className="text-base">{data.description || "-"}</span>
        <span className="text-base">${data.price}</span>
        <span className="text-base">Qty: {data.stocks}</span>

        <Bids
          collection={data}
          isCollectionOwner={isCollectionOwner}
          isSold={isSold}
        />
      </CardContent>
    </Card>
  );
}
