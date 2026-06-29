import prisma from "@/lib/prisma";
import { AdPlacement } from "@prisma/client";
import { AdBannerClient } from "./AdBannerClient";

interface AdSlotProps {
  placement: AdPlacement;
}

/**
 * Server component — fetches an active ad for the given placement slot
 * from the database and renders it. Returns nothing if no active ad exists.
 */
export async function AdSlot({ placement }: AdSlotProps) {
  const now = new Date();

  const ad = await prisma.ad.findFirst({
    where: {
      status: "active",
      placements: { has: placement },
      OR: [
        { start_date: null },
        { start_date: { lte: now } },
      ],
      AND: [
        {
          OR: [
            { end_date: null },
            { end_date: { gte: now } },
          ],
        },
      ],
    },
    orderBy: { start_date: "desc" },
  });

  if (!ad) return null;

  return (
    <AdBannerClient
      adId={ad.id}
      placement={placement}
      imageUrl={ad.image_url}
      targetUrl={ad.target_url}
      altText={ad.title}
    />
  );
}
