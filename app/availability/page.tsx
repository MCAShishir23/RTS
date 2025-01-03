import Availability from "@/components/Availability";

export default function AvailabilityPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Check Table Availability</h1>
      <Availability />
    </main>
  );
}
