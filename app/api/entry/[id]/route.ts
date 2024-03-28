import { analyse } from "@/utils/ai";
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export const PATCH = async (request: Request, { params }) => {
  const { content } = await request.json();

  const user = await getUserByClerkID();

  const updatedEnrty = await prisma.entry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content,
    },
  });

  const analysis = await analyse(updatedEnrty.content);

  const updatedAnalysis = await prisma.analysis.upsert({
    where: {
      entryId: updatedEnrty.id,
    },
    update: {
      ...analysis,
    },
    create: {
      userId: user.id,
      entryId: updatedEnrty.id,
      ...analysis,
    },
  });

  return NextResponse.json({
    data: { ...updatedEnrty, analysis: updatedAnalysis },
  });
};
