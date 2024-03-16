"use client";

import { useCookies } from "next-client-cookies";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useFetchUsers } from "@/hooks/useUsers";

export default function SelectUsers() {
  const cookies = useCookies();

  const { data } = useFetchUsers();

  const userId = cookies.get("user_id");

  const onUserChange = (val: string) => {
    cookies.set("user_id", val);
    window.location.reload();
  };

  return (
    <Select defaultValue={userId} onValueChange={(val) => onUserChange(val)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select User" />
      </SelectTrigger>
      <SelectContent>
        {data?.map((user) => (
          <SelectItem key={user.id} value={user.id.toString()}>
            {user.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
