"use client"; // Si estás en App Router

import { useEffect, useState } from "react";
import axios from "axios";
import { CarsTable } from "./components/cars-table";
import { GetCarsAction } from "@/actions/car";
import { GetBranchesAction } from "@/actions/branchs";
import { getSatusCar } from "@/actions/save-card";

export default function VehiculosPage() {
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [groups, setGroups] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const BACK = process.env.NEXT_PUBLIC_URL_BACK;
        if (!BACK) throw new Error("NEXT_PUBLIC_URL_BACK no está definida");

        const [vehycle, branch, groupsRes, brandsRes] = await Promise.all([
          GetCarsAction(),
          GetBranchesAction(),
          axios.get(`${BACK}groups`),
          axios.get(`${BACK}brands`),
        ]);

        const updatedCars = await Promise.all(
          vehycle.map(async (car: any) => {
            const locked_status = (await getSatusCar(car.id)) as any;
            return {
              ...car,
              brand_name:
                brandsRes.data.find((b: any) => b.id === car.brand_id)?.name ??
                "No disponible",
              group_name:
                groupsRes.data.find((g: any) => g.id === car.group_id)?.name ??
                "No disponible",
              locked_status: locked_status?.locked_status,
            };
          })
        );

        setCars(updatedCars as any);
        setBrands(brandsRes.data);
        setGroups(groupsRes.data);
        setBranches(branch);
      } catch (error) {
        console.error("Error al cargar datos", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="relative animate-fade-in p-6">
      <CarsTable
        Cars={cars}
        Brands={brands}
        Groups={groups}
        Branches={branches}
      />
    </div>
  );
}
