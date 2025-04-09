import dynamic from "next/dynamic";
import { GetBranchesAction } from "@/actions/branchs";
import { getReservations } from "@/actions/get-reservations";
import LoadingSpinner from "@/components/loading";

const Chart = dynamic(() => import("@/components/charts/test"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

export default async function AdminPage() {
  const { data } = await getReservations();
  const branches = await GetBranchesAction();
  const dataApproved = data.filter((res: any) => res.status === "approved");
  return <Chart data={data} dataApproved={dataApproved} branches={branches} />
}
