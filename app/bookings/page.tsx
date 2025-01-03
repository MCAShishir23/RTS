import BookingsList from "@/components/BookingsList";
export default function BookingsPage() {
  return (
    <div className="max-w-7xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-4">Bookings</h1>
      <BookingsList />
    </div>
  );
}
