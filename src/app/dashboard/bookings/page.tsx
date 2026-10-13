import { redirect } from "next/navigation";

export default function DashboardBookingsRedirect() {
  redirect("/dashboard?tab=bookings");
}
