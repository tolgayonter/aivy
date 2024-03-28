import { analyse } from "@/utils/ai";
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async () => {
  const user = await getUserByClerkID();

  const entry = await prisma.entry.create({
    data: {
      userId: user.id,
      content: "Today, like every other day, was great!",
    },
  });

  const analysis = await analyse(entry.content);
  await prisma.analysis.create({
    data: {
      userId: user.id,
      entryId: entry.id,
      ...analysis,
    },
  });

  revalidatePath("/entry");

  return NextResponse.json({ data: entry });
};
