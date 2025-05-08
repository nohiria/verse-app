import { usePage } from "@inertiajs/react";

export default function useAuth() {
  const user = usePage().props.auth?.user || null;

  return {
    user,
    isLoggedIn: !!user,
  };
}
