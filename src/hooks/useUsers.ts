import axios from "axios";
import { useQuery } from "react-query";

import { BASE_URL } from "@/lib/constants";
import { User } from "@/types";

export const useFetchUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: (): Promise<User[]> =>
      axios({
        method: "get",
        url: `${BASE_URL}/users`,
      })
        .then((res) => res.data)
        .catch((e: Promise<Error>) => console.error(e)),
  });
};
