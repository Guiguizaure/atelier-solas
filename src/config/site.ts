/** Canonical address of the site (metadata, sitemap, robots). */
export const SITE_URL = "https://atelier.webjuno.com";

/**
 * The commission configurator is live. Until it is (commit 9), « Start your pattern » and
 * « Draft this pattern » lead to the contact label, which says commissions open soon.
 */
export const COMMISSIONS_OPEN = false;

/** Where a « start a commission » link goes, for a given model or none. */
export const commissionHref = (model?: string) =>
  COMMISSIONS_OPEN ? (model ? `/commission?model=${model}` : "/commission") : "/#label";
