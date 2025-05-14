import CarouselsTable from "./carousel-table";

export const dynamic = "force-dynamic";

export default async function CarouselPage() {
  return (
    <div className="relative animate-fade-in p-6">
      <CarouselsTable />
    </div>
  )
}