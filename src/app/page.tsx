"use client";

import Collection from "@/components/Collection";
import UpdateCollection from "@/components/UpdateCollection";
import { useFetchCollections } from "@/hooks/useDataCollections";

export default function Home() {
  const { data, refetch } = useFetchCollections();

  return (
    <main className="flex min-h-screen flex-col gap-4 p-24 bg-white">
      <div className="flex justify-end">
        <UpdateCollection btnText="Create Collection" refetch={refetch} />
      </div>
      {data?.map((item) => (
        <Collection key={item.id} data={item} refetch={refetch} />
      ))}
    </main>
  );
}
