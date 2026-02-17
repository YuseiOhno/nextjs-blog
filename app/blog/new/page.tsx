import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";
import NewPostForm from "./NewPostForm";

export default async function NewPostPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login?callback=/blog/new");
  }

  return <NewPostForm />;
}
