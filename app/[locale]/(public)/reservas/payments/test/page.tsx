import { getMaxIncrement } from "@/actions/holidays";
import axios from "axios";

export default async function TEST() {
  const resp = await axios.get("http://64.227.21.31/api/reservations/93")
  //console.log(resp);
  const info = resp.data
  console.log(info);
  const MaxIncremente = await getMaxIncrement(info.start_date, info.end_date)

  return (
    <div>
      <h1>TEST</h1>
      {MaxIncremente}
    </div>

  )
}