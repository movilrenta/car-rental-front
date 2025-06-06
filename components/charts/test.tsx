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
import { BranchesType } from "@/types/branches";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

const Chart = ({
  data,
  dataApproved,
  branches,
}: {
  data: any;
  dataApproved: any;
  branches: BranchesType[];
}) => {
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

  // const generateChartData = (reservations: any, year: string) => {
  //   // Filter reservations by selected year first
  //   //const filterdReservationByApproved = reservations.filter((res: any) => res.status === "approved")
  //   const filteredReservations = reservations.filter((res: any) => {
  //     const resYear = new Date(res.start_date).getFullYear().toString();
  //     return resYear === year;
  //   });

  //   // Group by month
  //   const groupedByMonth = filteredReservations.reduce(
  //     (acc: any, curr: any) => {
  //       const month = getMonthName(curr.start_date);
  //       acc[month] = acc[month] || { online: 0, presential: 0 };

  //       if (curr.origin === null) {
  //         acc[month].online++;
  //       } else if (curr.origin === "offline_agent") {
  //         acc[month].presential++;
  //       }
  //       return acc;
  //     },
  //     {}
  //   );

  //   // Define month order (in Spanish)
  //   const monthOrder = [
  //     "enero",
  //     "febrero",
  //     "marzo",
  //     "abril",
  //     "mayo",
  //     "junio",
  //     "julio",
  //     "agosto",
  //     "septiembre",
  //     "octubre",
  //     "noviembre",
  //     "diciembre",
  //   ];

  //   // Convert to array and sort by month order
  //   return Object.entries(groupedByMonth)
  //     .map(([month, data]: any) => ({
  //       month,
  //       online: data.online,
  //       presential: data.presential,
  //     }))
  //     .sort((a, b) => {
  //       // Convert month names to lowercase for consistent comparison
  //       const monthA = a.month.toLowerCase();
  //       const monthB = b.month.toLowerCase();
  //       return monthOrder.indexOf(monthA) - monthOrder.indexOf(monthB);
  //     });
  // };

  //console.log(data);
  const generateDetailedChartData = (reservations: any[], year: string) => {
    const filteredReservations = reservations.filter((res) => {
      const resYear = new Date(res.start_date).getFullYear().toString();
      return resYear === year;
    });

    const groupedByMonth: Record<string, any[]> = {};

    filteredReservations.forEach((res) => {
      const month = getMonthName(res.start_date).toLowerCase();
      const origin = res.origin === "offline_agent" ? "Presencial" : "Online";
      const status = res.status;
      const amount = Number(res.payment?.amount ?? 0); // ✅ forzar a número

      if (!groupedByMonth[month]) {
        groupedByMonth[month] = [];
      }

      groupedByMonth[month].push({
        origin,
        status,
        amount,
      });
    });

    const detailedData = Object.entries(groupedByMonth).flatMap(
      ([month, entries]) => {
        const summary: Record<string, any> = {};

        entries.forEach(({ origin, status, amount }) => {
          const key = `${origin}-${status}`;

          if (!summary[key]) {
            summary[key] = {
              categoria: "Tipo de venta",
              subcategoria: origin,
              estado_reserva: capitalize(status),
              mes: capitalize(month),
              cantidad: 0,
              monto: 0,
            };
          }

          summary[key].cantidad += 1;
          summary[key].monto += amount; // ✅ ahora sí suma correctamente
        });

        return Object.values(summary);
      }
    );

    return detailedData;
  };

  const test = generateDetailedChartData(dataApproved, selectedYear);

  //console.log(test, "TEST");
  const availableYears = getAvailableYears(dataApproved);

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
      (data) => data.month?.toLowerCase() === currentMonthName
    ) || { online: 0, presential: 0 }; // Default to 0 if not found

    const previousMonthData = chartData.find(
      (data) => data.month?.toLowerCase() === previousMonthName
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
    branch: `Sucursal ${
      branches.filter((branch: BranchesType) => branch.id === +key)[0].name
    }`,
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
  // Filtrás solo reservas pendientes
  const pendingReservations = data.filter(
    (res: any) => res.status === "pending"
  );

  // Agrupás por mes
  const pendingByMonth = pendingReservations.reduce((acc: any, res: any) => {
    const dateString = res.start_date; // o res.created_at, según prefieras
    if (!dateString) return acc;

    const month = format(parseISO(dateString), "MMMM", { locale: es });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  // Convertís a array para el gráfico
  const pendingData = Object.entries(pendingByMonth).map(([month, value]) => ({
    month,
    value,
  }));

  const orderedMonths = [
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

  const orderedPendingData = orderedMonths.map((month) => {
    const found = pendingData.find((item) => item.month === month);
    return found || { month, value: 0 }; // Si no hay datos, pone valor 0
  });

  // const unifiedData = [
  //   // Tipo de venta (online/presential por mes)
  //   ...test
  //     .map((item) => [
  //       {
  //         categoria: "Tipo de venta",
  //         subcategoria: "Online",
  //         mes: capitalize(item.month),
  //         cantidad: item.online,
  //       },
  //       {
  //         categoria: "Tipo de venta",
  //         subcategoria: "Presential",
  //         mes: capitalize(item.month),
  //         cantidad: item.presential,
  //       },
  //     ])
  //     .flat(),

  //   // Estados de reserva
  //   ...statusData.map((item) => ({
  //     categoria: "Estado de reserva",
  //     subcategoria: capitalize(item.name),
  //     mes: "",
  //     cantidad: item.value,
  //   })),

  //   // Reservas por mes
  //   ...orderedPendingData.map((item) => ({
  //     categoria: "Reservas por mes",
  //     subcategoria: "Total",
  //     mes: capitalize(item.month),
  //     cantidad: item.value,
  //   })),

  //   // Reservas por sucursal
  //   ...branchData.map((item) => ({
  //     categoria: "Sucursal",
  //     subcategoria: item.branch,
  //     mes: "",
  //     cantidad: item.reservations,
  //   })),
  // ];

  // Función para capitalizar meses
  const unifiedData = [
    // Tipo de venta con estado y monto
    ...generateDetailedChartData(dataApproved, selectedYear),

    // Estados de reserva (sin cambios)
    ...statusData.map((item) => ({
      categoria: "Estado de reserva",
      subcategoria: capitalize(item.name),
      mes: "",
      cantidad: item.value,
      total: 0,
    })),

    // Reservas por mes (sin cambios)
    ...orderedPendingData.map((item) => ({
      categoria: "Reservas por mes",
      subcategoria: "Total",
      mes: capitalize(item.month),
      cantidad: item.value,
      total: 0,
    })),

    // Reservas por sucursal (sin cambios)
    ...branchData.map((item) => ({
      categoria: "Sucursal",
      subcategoria: item.branch,
      mes: "",
      cantidad: item.reservations,
      total: 0,
    })),
  ];

  function capitalize(str: any) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  console.log(test);

  return (
    <div className="grid grid-cols-12 m-5 gap-5">
      {/* Tiempo promedio de reserva */}
      <div className="col-span-4">
        <CSVLink
          className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition"
          data={unifiedData}
          headers={[
            { label: "Categoría", key: "categoria" },
            { label: "Subcategoría", key: "subcategoria" },
            { label: "Mes", key: "mes" },
            { label: "Cantidad", key: "cantidad" },
            { label: "Total", key: "monto" }, // NUEVA COLUMNA
          ]}
          filename="informe_unificado.csv"
        >
          Descargar Informe unificado
        </CSVLink>
      </div>
      <Card className="col-span-12 md:col-span-6 xl:col-span-4">
        <CardHeader>
          <CardTitle>Tiempo Promedio de Reserva</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{avgDays.toFixed(1)} días</p>
        </CardContent>
      </Card>
      <Card className="col-span-12 md:col-span-6 xl:col-span-4">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Pagos aprobados por mes</CardTitle>
          <CardDescription>
            <Select
              onValueChange={(e: any) => setSelectedYear(e)}
              value={selectedYear.toString()}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecciona un año" />
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
            filename="pagos-aprobados-por-mes.csv"
            className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition"
          >
            Descargar
          </CSVLink>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Gráfico de pagos presenciales */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Pagos Presenciales</h3>
            <ChartContainer config={chartConfig}>
              <LineChart
                data={test.filter(
                  (item: any) => item.subcategoria === "Presencial"
                )}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="mes"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      indicator="line"
                      className="bg-slate-100"
                    />
                  }
                />
                <Line
                  type="monotone"
                  dataKey="cantidad"
                  stroke="oklch(0.707 0.165 254.624)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-12 md:col-span-6 xl:col-span-4">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Pagos aprobados por mes</CardTitle>
          <CardDescription>
            <Select
              onValueChange={(e: any) => setSelectedYear(e)}
              value={selectedYear.toString()}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecciona un año" />
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
            filename="pagos-aprobados-por-mes.csv"
            className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition"
          >
            Descargar
          </CSVLink>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Gráfico de pagos online */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Pagos Online</h3>
            <ChartContainer config={chartConfig}>
              <LineChart
                data={test.filter(
                  (item: any) => item.subcategoria !== "Presencial"
                )}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="mes"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      indicator="line"
                      className="bg-slate-100"
                    />
                  }
                />
                <Line
                  type="monotone"
                  dataKey="cantidad"
                  stroke="oklch(0.707 0.165 254.624)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-12 md:col-span-6 xl:col-span-4 flex flex-col h-full">
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
        <CardContent className="grid grid-cols-4 gap-6 h-full">
          <PieChart
            width={206}
            height={206}
            className="col-span-2 m-auto min-w-0 max-w-full"
          >
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
          <div className="col-span-2 flex flex-col justify-center gap-2">
            {statusData.map((entry) => (
              <div
                key={entry.name}
                className="flex items-center gap-2 text-sm sm:text-base"
              >
                <div
                  className="w-3 min-w-3 h-3 min-h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="">
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

      <Card className="col-span-12 md:col-span-6 xl:col-span-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Reservas pendientes</CardTitle>
          <CSVLink
            data={statusData}
            filename="reservas-sucursal.csv"
            className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition"
          >
            Descargar
          </CSVLink>
        </CardHeader>
        <CardContent className="h-full">
          <h3 className="text-sm font-semibold mb-4">
            Reservas pendientes por mes
          </h3>
          <ChartContainer config={chartConfig}>
            <LineChart data={orderedPendingData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)} // muestra solo los primeros 3 caracteres del mes
              />
              <YAxis />
              <Tooltip
                formatter={(value) => [`${value}`, "PENDIENTES"]}
                labelFormatter={(label) => `Mes: ${label}`}
                contentStyle={{ backgroundColor: "#f8fafc" }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#fbbf24"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="col-span-12 md:col-span-6 xl:col-span-4">
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

export default Chart;
