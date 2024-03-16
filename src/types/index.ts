export interface Collection {
  id: number;
  name: string;
  description?: string;
  stocks: number;
  price: number;
  user_id: number;
  status: CollectionStatus;
}

export type CollectionStatus = "pending" | "sold";

export interface Bid {
  id: number;
  collection_id: number;
  price: number;
  user_id: number;
  status: BidStatus;
}

export type BidStatus = "accepted" | "pending" | "rejected";

export interface User {
  id: number;
  name: string;
  email: string;
}
