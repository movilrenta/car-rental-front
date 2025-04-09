export default function Loading() {
  return (
    <div className="flex flex-col justify-start items-center h-screen">
      <div className="animate-spin rounded-full h-28 w-28 border-b-2 border-gray-900 mt-52 my-4"></div>
      <div>Obteniendo datos...</div>
    </div>
  );
}
