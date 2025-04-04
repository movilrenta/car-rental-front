"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { CSVLink } from "react-csv";
import {
  PieChart,
  Pie,
  Cell,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";
import {
  SelectLabel,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";

export const Chart = ({ data }: any) => {
  const [selectedYear, setSelectedYear] = React.useState(
    new Date().getFullYear().toString()
  );
  const getMonthName = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleString("es-ES", { month: "long" }); // Ej: "February"
  };
  const getAvailableYears = (reservations: any) => {
    const years: any = reservations.map((res: any) =>
      new Date(res.start_date).getFullYear()
    );
    return Array.from(new Set(years)).sort();
  };

  const generateChartData = (reservations: any, year: string) => {
    // Filter reservations by selected year first
    const filteredReservations = reservations.filter((res: any) => {
      const resYear = new Date(res.start_date).getFullYear().toString();
      return resYear === year;
    });

    // Group by month
    const groupedByMonth = filteredReservations.reduce(
      (acc: any, curr: any) => {
        const month = getMonthName(curr.start_date);
        acc[month] = acc[month] || { online: 0, presential: 0 };

        if (curr.origin === null) {
          acc[month].online++;
        } else if (curr.origin === "offline_agent") {
          acc[month].presential++;
        }
        return acc;
      },
      {}
    );

    // Define month order (in Spanish)
    const monthOrder = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];

    // Convert to array and sort by month order
    return Object.entries(groupedByMonth)
      .map(([month, data]: any) => ({
        month,
        online: data.online,
        presential: data.presential,
      }))
      .sort((a, b) => {
        // Convert month names to lowercase for consistent comparison
        const monthA = a.month.toLowerCase();
        const monthB = b.month.toLowerCase();
        return monthOrder.indexOf(monthA) - monthOrder.indexOf(monthB);
      });
  };

  console.log(data);

  const test = generateChartData(data, selectedYear);
  const availableYears = getAvailableYears(data);

  const chartConfig = {
    online: {
      label: "R. online",
      color: "hsl(var(--chart-1))",
    },
    presential: {
      label: "R. presencial",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  const calculateTrend = (chartData: any[]) => {
    // Get current date (March 27, 2025 as per context)
    const currentDate = new Date();
    const currentMonthName = currentDate.toLocaleString("es-ES", {
      month: "long",
    }); // "marzo"
    const previousDate = new Date(currentDate);
    previousDate.setMonth(currentDate.getMonth() - 1);
    const previousMonthName = previousDate.toLocaleString("es-ES", {
      month: "long",
    }); // "febrero"

    // Find current and previous months in chartData
    const currentMonthData = chartData.find(
      (data) => data.month.toLowerCase() === currentMonthName
    ) || { online: 0, presential: 0 }; // Default to 0 if not found

    const previousMonthData = chartData.find(
      (data) => data.month.toLowerCase() === previousMonthName
    ) || { online: 0, presential: 0 }; // Default to 0 if not found

    // Calculate total sales for each month
    const currentTotal =
      (currentMonthData.online || 0) + (currentMonthData.presential || 0);
    const previousTotal =
      (previousMonthData.online || 0) + (previousMonthData.presential || 0);

    // Calculate percentage change
    const difference = currentTotal - previousTotal;
    const percentage =
      previousTotal !== 0
        ? Number(((difference / previousTotal) * 100).toFixed(1))
        : currentTotal > 0
        ? 100
        : 0;

    return {
      percentage: Math.abs(percentage),
      isUp: difference >= 0,
      currentMonth: currentMonthName, // Optional: return the current month name for display
    };
  };
  // Calculate the trend using the current test data
  const trend = calculateTrend(test);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const reservationsByStatus = data.reduce((acc: any, res: any) => {
    acc[res.status] = (acc[res.status] || 0) + 1;
    return acc;
  }, {});
  const statusData = Object.keys(reservationsByStatus).map((key, index) => ({
    name: key,
    value: reservationsByStatus[key],
    color: COLORS[index % COLORS.length],
  }));

  // Reservas por sucursal
  const reservationsByBranch = data.reduce((acc: any, res: any) => {
    acc[res.start_branch_id] = (acc[res.start_branch_id] || 0) + 1;
    return acc;
  }, {});
  const branchData = Object.keys(reservationsByBranch).map((key) => ({
    branch: `Sucursal ${key}`,
    reservations: reservationsByBranch[key],
  }));

  // Tiempo promedio de reserva
  const avgReservationTime = data.map((res: any) => {
    const start = new Date(res.start_date).getTime();
    const end = new Date(res.end_date).getTime();
    return (end - start) / (1000 * 60 * 60 * 24); // Días
  });
  const avgDays =
    avgReservationTime.reduce((sum: any, val: any) => sum + val, 0) /
      avgReservationTime.length || 0;

  return (
    <div className="grid grid-cols-12 m-5 gap-5">
      {/* Tiempo promedio de reserva */}
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Tiempo Promedio de Reserva</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{avgDays.toFixed(1)} días</p>
        </CardContent>
      </Card>
      <Card className="col-span-4">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Tipos de ventas</CardTitle>
          <CardDescription>
            <Select
              onValueChange={(e: any) => setSelectedYear(e)}
              value={selectedYear.toString()}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecciona un ano" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {availableYears.map((year: any) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </CardDescription>
          <CSVLink
            data={test}
            filename="tipos-de-ventas.csv"
            className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition"
          >
            Descargar
          </CSVLink>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={test}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="dashed"
                    className="bg-slate-100"
                  />
                }
              />
              <Bar
                dataKey="online"
                fill="oklch(0.707 0.165 254.624)"
                radius={4}
              />
              <Bar
                dataKey="presential"
                fill="oklch(0.882 0.059 254.128)"
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            {trend.isUp ? "Subiendo un" : "Bajando un"} {trend.percentage}% en{" "}
            {trend.currentMonth}
            {trend.isUp ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
          </div>
          <div className="leading-none text-muted-foreground">
            Ventas del año {selectedYear}
          </div>
        </CardFooter>
      </Card>
      <Card className="col-span-4 flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Reservas por Estado</CardTitle>
          <CSVLink
            data={statusData}
            filename="reservas-estado.csv"
            className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition"
          >
            Descargar
          </CSVLink>
        </CardHeader>
        <CardContent className="flex justify-start items-center gap-6">
          <PieChart width={200} height={200} className="mt-10 ml-6">
            <Pie
              data={statusData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) =>
                name === "pending"
                  ? ["PENDIENTE", value]
                  : name === "approved"
                  ? ["APROBADO", value]
                  : [name, value]
              }
            />
          </PieChart>
          {/* Columna de datos a la derecha */}
          <div className="flex flex-col gap-2">
            {statusData.map((entry) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="font-medium">
                  {entry.name === "pending"
                    ? "PENDIENTE"
                    : entry.name === "approved"
                    ? "APROBADO"
                    : entry.name.toUpperCase()}
                </span>
                <span className="text-muted-foreground">{entry.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Reservas por Sucursal</CardTitle>
          <CSVLink
            data={statusData}
            filename="reservas-sucursal.csv"
            className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition"
          >
            Descargar
          </CSVLink>
        </CardHeader>
        <CardContent>
          <BarChart width={350} height={300} data={branchData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="branch" />
            <YAxis />
            <Tooltip formatter={(value) => [`${value}`, "RESERVAS"]} />
            <Bar dataKey="reservations" fill="#8884d8" />
          </BarChart>
        </CardContent>
      </Card>
    </div>
  );
};
