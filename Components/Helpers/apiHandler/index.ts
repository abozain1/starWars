
import api from "@/lib/axios";

export async function dynamicGetReq(url: string) {
  const { data } = await api.get(url);
  return data;
}
