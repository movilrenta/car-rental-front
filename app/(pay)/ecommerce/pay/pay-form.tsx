// "use client";

// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import Image from "next/image";
// import PayBg from "@/public/images2/carBanner.webp";
// // import User from "@/public/images/user-64-13.jpg";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/form";
// import { Input } from "@/components/input";
// import { formSchema, PaymentMethods } from "@/types/payway-form.schema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/select";
// import clsx from "clsx";
// import { getPaymentMethods, get-TokenPay, saveCard } from "@/actions";
// import { FaCreditCard } from "react-icons/fa";
// import { useToast } from "@/hooks/use-toast";
// import { useEffect, useState } from "react";

// export default function PayForm() {
//   const [loader, setLoader] = useState<boolean>(true);
//   const [paymentsMethods, setPaymentsMethods] = useState<PaymentMethods[]>();
//   const { toast } = useToast();

//   const payMethods = async () => {
//     const resp = await getPaymentMethods();
//     setPaymentsMethods(resp.data);
//   };
//   useEffect(() => {
//     payMethods();
//     setLoader(false);
//   }, []);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       card_number: "",
//       card_expiration_month: "",
//       card_expiration_year: "",
//       security_code: "",
//       card_holder_birthday: "",
//       card_holder_door_number: 0,
//       card_holder_name: "",
//       card_holder_identification: {
//         type: "DNI",
//         number: "",
//       },
//       payment_method_id: "",
//       street_address:""
//     },
//   });

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     const {street_address,...rest} = values
//     const resp = await get-TokenPay(rest);
//     if (!resp?.ok) {
//       toast({
//         variant: "default",
//         title: `${resp?.message}`,
//       });
//     } else {
//       await saveCard(values);

//       toast({
//         variant: "default",
//         title: `${resp.message}`,
//       });
//       form.reset();
//     }
//   };
//   return (
//     <main>
//       <div className="relative pt-8">
//         <div
//           className="absolute inset-0 bg-gray-800 overflow-hidden"
//           aria-hidden="true"
//         >
//           <Image
//             className="object-cover h-full w-full filter blur opacity-10"
//             src={PayBg}
//             width={460}
//             height={180}
//             alt="Pay background"
//           />
//         </div>
//         <div className="relative px-4 sm:px-6 lg:px-8 max-w-lg mx-auto">
//           <Image
//             className="rounded-t-xl shadow-lg"
//             src={PayBg}
//             width={460}
//             height={180}
//             alt="Pay background"
//           />
//         </div>
//       </div>

//       <div className="relative px-4 sm:px-6 lg:px-8 pb-8 max-w-lg mx-auto">
//         <div className="bg-white dark:bg-gray-800 px-8 pb-6 rounded-b-xl shadow-sm">
//           {/* Card header */}
//           <div className="text-center mb-6">
//             {/* <div className="mb-2">
//               <Image
//                 className="-mt-8 inline-flex rounded-full"
//                 src={User}
//                 width={64}
//                 height={64}
//                 alt="User"
//               />
//             </div> */}
//             <h1 className="text-xl leading-snug text-gray-800 dark:text-gray-100 font-semibold mb-2 pt-4">
//               Movil Renta
//             </h1>
//             <div className="text-sm">
//              Por favor complete los siguientes datos del formulario de pago para finalizar su reserva.
//             </div>
//           </div>
//           <Form {...form}>
//             <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
//               {/* Payments Methods */}
//               {loader ? (
//                 <div className="w-full flex flex-col gap-2">
//                   <p className="h-4 animate-pulse bg-slate-200 rounded-md"></p>
//                   <div className="w-full h-10 animate-pulse bg-slate-200 rounded-md"></div>
//                 </div>
//               ) : (
//                 <FormField
//                   control={form.control}
//                   name="payment_method_id"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Seleccione un medio de pago</FormLabel>
//                       <Select
//                         onValueChange={field.onChange}
//                         defaultValue={field.value}
//                       >
//                         <FormControl>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Seleccione su tarjeta" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           {paymentsMethods?.map((item, index) => (
//                             <div
//                               key={index}
//                               className="flex items-center gap-4 p-2 cursor-pointer hover:bg-slate-100"
//                             >
//                               <FaCreditCard size={20} className="text-slate-700"/>
//                               <SelectItem value={item.idmediopago}>
//                                 {item.tarjeta}
//                               </SelectItem>
//                             </div>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               )}
//               {/* Card Number */}
//               <FormField
//                 control={form.control}
//                 name="card_number"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="block text-sm font-medium mb-1">
//                       Número de la tarjeta{" "}
//                       <span className="text-red-500"> *</span>
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         className="form-input w-full"
//                         type="text"
//                         maxLength={16}
//                         placeholder="1234 1234 1234 1234"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               {/* Expiry and CVC */}
//               <div className="flex space-x-4">
//                 <FormField
//                   control={form.control}
//                   name="card_expiration_month"
//                   render={({ field }) => (
//                     <FormItem className="flex-1">
//                       <FormLabel className="block text-sm font-medium mb-1">
//                         Mes
//                         <span className="text-red-500"> *</span>
//                       </FormLabel>
//                       <FormControl>
//                         <Input
//                           className="form-input w-full"
//                           type="text"
//                           placeholder="MM"
//                           maxLength={2}
//                           inputMode="numeric"
//                           pattern="[0-9]*"
//                           value={field.value}
//                           onChange={(e) => {
//                             const input = e.target.value.replace(/\D/g, ""); // Remueve cualquier carácter no numérico
//                             field.onChange(input); // Actualiza el estado del campo
//                           }}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 {/* Expiry and CVC */}
//                 <FormField
//                   control={form.control}
//                   name="card_expiration_year"
//                   render={({ field }) => (
//                     <FormItem className="flex-1">
//                       <FormLabel className="block text-sm font-medium mb-1">
//                         Año
//                         <span className="text-red-500"> *</span>
//                       </FormLabel>
//                       <FormControl>
//                         <Input
//                           className="form-input w-full"
//                           type="text"
//                           placeholder="AA"
//                           maxLength={2}
//                           inputMode="numeric"
//                           pattern="[0-9]*"
//                           value={field.value}
//                           onChange={(e) => {
//                             const input = e.target.value.replace(/\D/g, ""); // Remueve cualquier carácter no numérico
//                             field.onChange(input); // Actualiza el estado del campo
//                           }}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="security_code"
//                   render={({ field }) => (
//                     <FormItem className="flex-1">
//                       <FormLabel className="block text-sm font-medium mb-1">
//                         CVC
//                         <span className="text-red-500"> *</span>
//                       </FormLabel>
//                       <FormControl>
//                         <Input
//                           className="form-input w-full"
//                           type="text"
//                           placeholder="123"
//                           maxLength={4}
//                           inputMode="numeric"
//                           pattern="[0-9]*"
//                           value={field.value}
//                           onChange={(e) => {
//                             const input = e.target.value.replace(/\D/g, ""); // Remueve cualquier carácter no numérico
//                             field.onChange(input); // Actualiza el estado del campo
//                           }}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               {/* Birthday*/}
//               <FormField
//                 control={form.control}
//                 name="card_holder_birthday"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="block text-sm font-medium mb-1">
//                       Fecha de nacimiento
//                       <span className="text-red-500"> *</span>
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         className="form-input w-full"
//                         type="text"
//                         maxLength={10}
//                         placeholder="DD/MM/YYYY"
//                         pattern="\d{2}/\d{2}/\d{4}"
//                         value={field.value}
//                         onChange={(e) => {
//                           const input = e.target.value.replace(/\D/g, ""); // Remueve cualquier carácter no numérico
//                           const formatted = input
//                             .replace(/^(\d{2})(\d{2})/, "$1/$2") // Añade la primera barra
//                             .replace(/(\d{2}\/\d{2})(\d+)/, "$1/$2"); // Añade la segunda barra
//                           field.onChange(formatted); // Actualiza el estado del campo
//                         }}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               {/* Name on Card */}
//               <FormField
//                 control={form.control}
//                 name="card_holder_name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="block text-sm font-medium mb-1">
//                       Nombre y Apellido
//                       <span className="text-red-500"> *</span>
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         className="form-input w-full"
//                         type="text"
//                         placeholder="José Perez"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <div className="flex space-x-4">
//               <FormField
//                 control={form.control}
//                 name="street_address"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="block text-sm font-medium mb-1">
//                      Dirección
//                       <span className="text-red-500"> *</span>
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         className="form-input w-full"
//                         type="text"
//                         placeholder="Calle"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="card_holder_door_number"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="block text-sm font-medium mb-1">
//                       Nº
//                       <span className="text-red-500"> *</span>
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         className="form-input w-full"
//                         type="text"
//                         placeholder="123"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               </div>
//               <div className="flex space-x-4">
//                 <FormField
//                   control={form.control}
//                   name="card_holder_identification.type"
//                   render={({ field }) => (
//                     <FormItem className="flex-1">
//                       <FormLabel className="block text-sm font-medium mb-1">
//                         Tipo
//                       </FormLabel>
//                       <Select
//                         onValueChange={field.onChange}
//                         defaultValue={field.value}
//                       >
//                         <FormControl>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Seleccione tipo" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent className="bg-white">
//                           <SelectItem value="DNI">DNI</SelectItem>
//                           <SelectItem value="LE">LE</SelectItem>
//                           <SelectItem value="LC">LC</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="card_holder_identification.number"
//                   render={({ field }) => (
//                     <FormItem className="flex-2">
//                       <FormLabel className="block text-sm font-medium mb-1">
//                         N°
//                         <span className="text-red-500"> *</span>
//                       </FormLabel>
//                       <FormControl>
//                         <Input
//                           className="form-input w-full"
//                           type="text"
//                           placeholder="12345678"
//                           maxLength={10}
//                           inputMode="numeric"
//                           pattern="[0-9]*"
//                           value={field.value}
//                           onChange={(e) => {
//                             const input = e.target.value.replace(/\D/g, ""); // Remueve cualquier carácter no numérico
//                             field.onChange(input); // Actualiza el estado del campo
//                           }}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               {/* htmlForm footer */}
//               <div className="mt-6">
//                 <Button
//                   disabled={form.formState.isSubmitting}
//                   type="submit"
//                   className={clsx(
//                     "btn w-full bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white",
//                     {
//                       "bg-gray-900/60": form.formState.isSubmitting,
//                       "bg-gray-900": !form.formState.isSubmitting,
//                     }
//                   )}
//                 >
//                   Pagar
//                 </Button>
//               </div>
//             </form>
//           </Form>
//         </div>
//       </div>
//     </main>
//   );
// }
