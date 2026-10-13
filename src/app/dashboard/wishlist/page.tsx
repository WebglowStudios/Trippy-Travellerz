import { redirect } from "next/navigation";

export default function DashboardWishlistRedirect() {
  redirect("/dashboard?tab=wishlist");
}
