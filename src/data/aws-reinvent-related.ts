export const AWS_REINVENT_OOH_SLUG = 'aws-reinvent-ooh-2023';
export const AWS_REINVENT_BOOTH_SLUG = 'aws-reinvent-booth-2023';
export const AWS_REINVENT_CAR_WRAP_SLUG = 'car-wrap-reinvent-2023';

export const AWS_REINVENT_CAMPAIGN_SLUGS = [
  AWS_REINVENT_OOH_SLUG,
  AWS_REINVENT_BOOTH_SLUG,
  AWS_REINVENT_CAR_WRAP_SLUG,
] as const;

export function isAwsReinventCampaignSlug(slug: string): boolean {
  return (AWS_REINVENT_CAMPAIGN_SLUGS as readonly string[]).includes(slug);
}

export function getAwsReinventRelatedSlugs(currentSlug: string): string[] {
  return AWS_REINVENT_CAMPAIGN_SLUGS.filter((slug) => slug !== currentSlug);
}

export const AWS_REINVENT_RELATED_INTRO: Record<string, string> = {
  [AWS_REINVENT_OOH_SLUG]:
    'Part of a unified AWS re:Invent 2023 campaign — OOH, booth design, and vehicle wraps shared one visual system across Las Vegas.',
  [AWS_REINVENT_BOOTH_SLUG]:
    'Part of a unified AWS re:Invent 2023 campaign — the booth connected to out-of-home media and vehicle wraps through a single visual language.',
  [AWS_REINVENT_CAR_WRAP_SLUG]:
    'Part of a unified AWS re:Invent 2023 campaign — fleet wraps extended the OOH and booth visual system across Las Vegas.',
};
