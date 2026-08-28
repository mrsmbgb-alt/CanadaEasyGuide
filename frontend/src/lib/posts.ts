export interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  coverImage?: string | null;
  category: string;
  tags?: string | null;
  published: boolean;
  featured: boolean;
  views: number;
  author: string;
  createdAt: string;
}

export interface AdPlacement {
  id: number;
  name: string;
  adsterraCode: string;
  isActive: boolean;
  applyToAll: boolean;
  updatedAt: string;
}

const PLACEHOLDER_IMAGES: Record<string, string> = {
  "Express Entry": "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80",
  "Provincial Nominee": "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1200&q=80",
  "Study in Canada": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80",
  "Work Permits": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
  "Family Sponsorship": "https://images.unsplash.com/photo-1511895426328-dc8714191011?w=1200&q=80",
  Citizenship: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=1200&q=80",
  "Cost of Living": "https://images.unsplash.com/photo-1549421263-5ec394a5ad4c?w=1200&q=80",
  "Settlement Tips": "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&q=80",
};

export function getCoverImageFor(category: string, coverImage?: string | null): string {
  if (coverImage && coverImage.startsWith("http")) return coverImage;
  return PLACEHOLDER_IMAGES[category] || "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1200&q=80";
}

export const POSTS: Post[] = [
  {
    id: 1,
    title: "How to Apply for Express Entry in 2026",
    slug: "how-to-apply-for-express-entry-in-2026",
    excerpt:
      "A step-by-step guide to the Express Entry system: eligibility, CRS score, documents, profile creation, and what to do after an ITA.",
    body: `
# How to Apply for Express Entry in 2026

Express Entry is Canada's main economic immigration system for skilled workers. If you want to become a permanent resident through a federal program, this guide walks you through every step.

## 1. Check your eligibility

You need to be eligible for at least one of these federal programs:

- Federal Skilled Worker Program (FSW)
- Canadian Experience Class (CEC)
- Federal Skilled Trades Program (FST)

All programs use the Comprehensive Ranking System (CRS). A higher CRS score means a better chance of receiving an invitation to apply (ITA).

## 2. Estimate your CRS score

Your score is based on age, education, language ability, work experience, and Canadian connections. Use the official CRS calculator before you start.

## 3. Create your Express Entry profile

You will need:

- A valid passport
- Language test results (IELTS or CELPIP for English, TEF for French)
- Educational Credential Assessment (ECA)
- Proof of funds (for FSW)
- Work experience details

You can create an Express Entry profile online through the IRCC portal.

## 4. Receive an invitation to apply

IRCC runs regular draws. If your score is above the draw cutoff, you will receive an ITA. You normally have **60 days** to submit a complete application.

## 5. Submit your application

Your application should include police certificates, medical exams, and proof of funds. Missing documents is one of the most common reasons for refusal.

## 6. Get your PR card

Once approved, you will receive a Confirmation of Permanent Residence (COPR). After you land in Canada, your PR card is mailed to your Canadian address.

## Quick tips

- Improve your English or French score — language points are the fastest way to raise your CRS.
- Get a Provincial Nominee Program (PNP) nomination if your score is too low.
- Keep every document up to date and review your application before submission.

> This article is for informational purposes only. Always check the latest IRCC instructions or speak with an authorized immigration consultant.
`,
    category: "Express Entry",
    tags: "express-entry, crs, skills, permanent-residence, ita",
    published: true,
    featured: true,
    views: 2481,
    author: "Canada Easy Guide Team",
    createdAt: "2026-08-20T10:00:00Z",
  },
  {
    id: 2,
    title: "Provincial Nominee Program: Which Province Is Right for You?",
    slug: "provincial-nominee-program-which-province-is-right-for-you",
    excerpt:
      "Compare popular PNP streams in Ontario, Alberta, Saskatchewan, and Manitoba, and learn how a nomination can add 600 CRS points.",
    body: `
# Provincial Nominee Program: Which Province Is Right for You?

Provincial Nominee Programs (PNPs) let Canadian provinces nominate skilled workers who want to settle in their region. A nomination adds **600 points** to your CRS score.

## Ontario PNP

Ontario has streams for skilled workers, graduates, and entrepreneurs. It is popular because Ontario includes Toronto and Ottawa, but the competition is high.

## Alberta PNP

Alberta has dedicated streams for workers in technology, agriculture, and skilled trades. The province has strong job growth and lower housing costs than Ontario or BC.

## Saskatchewan PNP

Saskatchewan is known for its Express Entry and Occupation In-Demand streams. Processing can be faster, and the cost of living is lower.

## Manitoba PNP

Manitoba has a strong regional economy and friendly points system for workers with a job offer. It is a good option for applicants with provincial ties.

## How to choose

- Check the occupation lists for each province.
- After a nomination, update your Express Entry profile and accept the nomination.
- Once nominated, you can apply for permanent residence through Express Entry.
- Keep proof of your intention to settle in that province — it is a condition of the nomination.

## Common mistakes

- Applying to multiple provinces at the same time.
- Not showing genuine ties to the province.
- Missing deadlines for nomination acceptance.

> PNP rules change often. Always verify the latest stream criteria on the official website.
`,
    category: "Provincial Nominee",
    tags: "pnp, provincial-nominee, ontario, alberta, saskatchewan, manitoba, crs",
    published: true,
    featured: true,
    views: 1934,
    author: "Canada Easy Guide Team",
    createdAt: "2026-08-14T09:00:00Z",
  },
  {
    id: 3,
    title: "Study in Canada: Student Visa and Study Permit Guide",
    slug: "study-in-canada-student-visa-and-study-permit-guide",
    excerpt:
      "Everything international students need to know about a Canadian study permit: acceptance letter, proof of funds, biometrics, and working as a student.",
    body: `
# Study in Canada: Student Visa and Study Permit Guide

Canada is one of the top destinations for international students. A study permit allows you to study at a Designated Learning Institution (DLI).

## Step 1: Apply to a DLI

Choose a school and program that meets your career goals. You will need a **letter of acceptance** from a recognized DLI. The program must be at least six months long.

## Step 2: Get an official acceptance letter

The acceptance letter is required for the study permit application. Review the conditions carefully before accepting the offer.

## Step 3: Gather proof of funds

You must show that you can pay for:

- Tuition fees
- Living costs for you and your family
- Return transportation

## Step 4: Apply for a study permit

Create an account on the IRCC portal and submit:

- Letter of acceptance
- Proof of funds
- Valid passport
- Photographs
- Medical exam (if required)
- Police certificate (if required)

## Step 5: Biometrics and interview

Most applicants need to provide biometrics. Some may be asked for an interview or additional documents.

## Working while studying

- You can typically work up to **24 hours per week** during school terms and **full-time during scheduled breaks**.
- Check your study permit conditions — they change.

## After graduation

Many graduates apply for a Post-Graduation Work Permit (PGWP), which can help you gain Canadian work experience and later qualify for permanent residence.

> Immigration rules change. Always check the latest IRCC study permit requirements before applying.
`,
    category: "Study in Canada",
    tags: "study-permit, student-visa, dli, pgwp, international-students",
    published: true,
    featured: true,
    views: 1678,
    author: "Canada Easy Guide Team",
    createdAt: "2026-08-08T12:00:00Z",
  },
  {
    id: 4,
    title: "Canada Work Permits: Types, Requirements and How to Apply",
    slug: "canada-work-permits-types-requirements-and-how-to-apply",
    excerpt:
      "Understand open vs employer-specific work permits, LMIA, and the best pathways for skilled workers moving to Canada.",
    body: `
# Canada Work Permits: Types, Requirements and How to Apply

A Canadian work permit allows foreign nationals to work in Canada temporarily. There are two main types: open work permits and employer-specific work permits.

## Open work permits

An open work permit lets you work for **any employer** in Canada. You may qualify if you are:

- The spouse or common-law partner of a skilled worker or student
- A graduate from a Canadian institution with a valid PGWP category
- A refugee or protected person

## Employer-specific work permits

These permits are tied to a specific employer and job. In most cases, the employer must get a **Labour Market Impact Assessment (LMIA)** to show that no Canadian worker is available for the role.

## Who needs an LMIA?

Not everyone needs one. For example, some international graduates, intra-company transfers, and applicants under certain federal programs may be exempt.

## How to apply

1. Decide whether you need an open or employer-specific permit.
2. Confirm that your employer has completed any required LMIA process.
3. Complete the online application.
4. Provide your passport, photos, medical exam, and biometrics.
5. Wait for a decision — processing times vary.

## Important things to know

- A work permit does not automatically make you a permanent resident.
- Work experience in Canada can help you qualify for Express Entry later.
- Check whether your permit lets you change employers.

## Common refusal reasons

- Incomplete or inconsistent job offer
- Insufficient funds to support yourself
- No proof of ties to your home country
- Medical or background issues

> Always review the specific conditions on your work permit before accepting a job offer or changing employers.
`,
    category: "Work Permits",
    tags: "work-permit, lmia, open-work-permit, employer-specific, job-offer",
    published: true,
    featured: false,
    views: 1211,
    author: "Canada Easy Guide Team",
    createdAt: "2026-08-01T11:00:00Z",
  },
  {
    id: 5,
    title: "Sponsoring Your Spouse or Family to Canada",
    slug: "sponsoring-your-spouse-or-family-to-canada",
    excerpt:
      "A clear overview of family sponsorship in Canada: who can sponsor, who qualifies as family, income requirements, and common mistakes.",
    body: `
# Sponsoring Your Spouse or Family to Canada

Family reunification is a priority for Canada's immigration system. If you are a citizen or permanent resident, you may be able to sponsor your spouse, common-law partner, dependent children, parents, or grandparents.

## Who can sponsor?

You must be a Canadian citizen or permanent resident who is 18 or older and living in Canada. You must also be able to support your family members financially.

## Sponsoring a spouse or partner

- You must be legally married or in a genuine common-law relationship.
- You must show that the relationship is genuine and ongoing.
- The spouse must pass medical and security checks.

## Sponsoring dependent children

You can sponsor children under 22 who are unmarried and do not have a common-law partner.

## Sponsoring parents and grandparents

The Parent and Grandparent Program (PGP) has limited intake. If you do not get selected, the **Super Visa** lets parents and grandparents visit Canada for up to five years at a time.

## Minimum income requirements

For spouses and dependent children, there is usually no minimum income requirement. For parents and grandparents, you must meet the minimum necessary income (MNI).

## The sponsorship undertaking

As a sponsor, you commit to financially supporting your family member for a set period after arrival. This is a legal commitment.

## Common mistakes

- Not proving a genuine relationship
- Providing incomplete documents
- Missing deadline to respond to IRCC
- Applying for parents without meeting the income requirement

> Family sponsorship applications are strict. Double-check all requirements or consult a professional if your case is complex.
`,
    category: "Family Sponsorship",
    tags: "family-sponsorship, spouse, common-law, parents, super-visa, pgr",
    published: true,
    featured: false,
    views: 980,
    author: "Canada Easy Guide Team",
    createdAt: "2026-07-24T08:00:00Z",
  },
  {
    id: 6,
    title: "Canadian Citizenship: The Complete Application Process",
    slug: "canadian-citizenship-complete-application-process",
    excerpt:
      "Learn how to qualify for Canadian citizenship, what documents you need, how the citizenship test works, and what to expect after approval.",
    body: `
# Canadian Citizenship: The Complete Application Process

Canadian citizenship gives you the right to vote, hold a Canadian passport, and travel with citizenship of one of the most open countries in the world.

## Eligibility

You may be eligible if you:

- Are a permanent resident
- Have lived in Canada for at least **1,095 days in the five years** before applying
- Have filed taxes
- Pass the language and citizenship tests
- Were not in Canada as a prisoner or under certain temporary conditions

## Physical presence

You must have been physically present in Canada for at least three years, even if you have been a permanent resident for longer.

## Language requirements

Applicants aged 18 to 54 must prove English or French ability. You can use test results, Canadian school transcripts, or proof of studies in English or French.

## Citizenship test

The test covers:

- Canadian rights and responsibilities
- Canadian history
- Geography and government

You can take the test online or in person, depending on your situation.

## Required documents

- PR card or record of landing
- Travel documents
- Language proof (if required)
- Police certificates (if required)
- Photos that meet IRCC specifications

## After you apply

You may be asked for an interview, or a judicial decision may be required. Once approved, you attend a citizenship ceremony and receive your certificate.

## Tips

- Keep a personal checklist of your days in Canada.
- Apply online to reduce errors.
- Prepare for the test using the official Discover Canada guide.

> Citizenship applications can be delayed by incomplete forms. Review every section before submitting.
`,
    category: "Citizenship",
    tags: "citizenship, passport, discover-canada, permanent-resident, physical-presence",
    published: true,
    featured: false,
    views: 844,
    author: "Canada Easy Guide Team",
    createdAt: "2026-07-15T09:30:00Z",
  },
  {
    id: 7,
    title: "Cost of Living in Canada: Toronto vs Calgary vs Vancouver",
    slug: "cost-of-living-in-canada-toronto-vs-calgary-vs-vancouver",
    excerpt:
      "Compare rent, groceries, transit, and salaries in Canada's biggest cities so you can plan your new budget realistically.",
    body: `
# Cost of Living in Canada: Toronto vs Calgary vs Vancouver

Moving to Canada requires realistic planning. Your budget will depend heavily on which city you choose.

## Toronto

- One-bedroom apartment: **CAD 2,000 – 2,700/month**
- Transit pass: **CAD 150/month**
- Groceries for one person: **CAD 300–450/month**
- Strong job market in finance, tech, and healthcare
- Higher housing costs and commute times

## Calgary

- One-bedroom apartment: **CAD 1,400 – 1,900/month**
- Transit pass: **CAD 115/month**
- Groceries for one person: **CAD 250–350/month**
- Lower housing costs than Toronto or Vancouver
- Strong energy and technology sectors

## Vancouver

- One-bedroom apartment: **CAD 2,200 – 3,000/month**
- Transit pass: **CAD 105/month**
- Groceries for one person: **CAD 300–450/month**
- Mild winters and beautiful surroundings
- Among the most expensive housing markets in Canada

## Budget plan for newcomers

1. Start with **6–12 months** of expenses in savings.
2. Rent first, buy later. Most newcomers rent for at least a year.
3. Budget for first-month rent, last-month rent, and a damage deposit.
4. Get a phone plan, transit pass, and health card early.
5. Track your budget for the first three months to spot surprises.

## Hidden costs to remember

- International student fees are higher than domestic fees.
- Car insurance can be expensive in Ontario.
- Taxes are deducted from salary before you receive it.
- Professional credential assessment can cost money.

> Costs change over time. Use the latest averages from government or rental websites when planning.
`,
    category: "Cost of Living",
    tags: "cost-of-living, toronto, calgary, vancouver, budget, housing, banking",
    published: true,
    featured: true,
    views: 1532,
    author: "Canada Easy Guide Team",
    createdAt: "2026-07-05T10:15:00Z",
  },
  {
    id: 8,
    title: "Newcomer Settlement Checklist: Your First 30 Days in Canada",
    slug: "newcomer-settlement-checklist-first-30-days-in-canada",
    excerpt:
      "The exact checklist for your first month in Canada: SIN, health card, bank account, housing, and community resources.",
    body: `
# Newcomer Settlement Checklist: Your First 30 Days in Canada

Your first month in Canada sets the foundation for a smooth transition. Here is a practical checklist.

## Week 1

- [ ] Land and activate your permanent residence status
- [ ] Get a local SIM card and phone plan
- [ ] Apply for a **Social Insurance Number (SIN)**
- [ ] Find temporary accommodation
- [ ] Open a Canadian bank account

## Week 2

- [ ] Apply for your **provincial health card**
- [ ] Search for a permanent place to live
- [ ] Register with a settlement agency
- [ ] Update your rental lease address

## Week 3

- [ ] Start your job search or transfer your credentials
- [ ] Get a Canadian-style resume reviewed
- [ ] Register children in school
- [ ] Build a network in your community

## Week 4

- [ ] Understand your rights and responsibilities as a resident
- [ ] Set up automatic bill payments
- [ ] Find a family doctor or walk-in clinic
- [ ] Review your budget and adjust

## Important documents to keep together

- Passport and COPR
- SIN letter
- Health card
- Bank details
- Rental agreement
- Work or study documents

## Where to get help

- Settlement agencies offer free orientation sessions.
- Provincial websites list services for newcomers.
- Libraries and community centres run free workshops.

> Newcomer services are free and confidential where available. Use them early — they are designed to help you settle faster.
`,
    category: "Settlement Tips",
    tags: "settlement-tips, sin, health-card, bank-account, newcomers, first-30-days",
    published: true,
    featured: true,
    views: 1204,
    author: "Canada Easy Guide Team",
    createdAt: "2026-06-25T08:00:00Z",
  },
  {
    id: 9,
    title: "IRCC Processing Times: What They Mean and How to Track",
    slug: "ircc-processing-times-what-they-mean-and-how-to-track",
    excerpt:
      "Why IRCC processing times change, how to check your application status online, and what to do if your application is delayed.",
    body: `
# IRCC Processing Times: What They Mean and How to Track

Processing times are estimates, not guarantees. They vary by application type, country, and how complete your file is.

## Where to find processing times

- Visit the official IRCC website and choose your application type.
- Check the note about the "date the application was received" — it affects the estimate.
- Do not rely on third-party sites for official timelines.

## Why times change

- Seasonal application volumes
- Incomplete applications
- Additional verification steps
- Changes to immigration priorities

## How to track your application

Create an IRCC account or use the paper application portal to see statuses such as:

- Received
- In progress
- Additional documents requested
- Decision made

## What to do if your application is delayed

1. Check your email and online account for a request.
2. Confirm that your payment went through.
3. Respond quickly to any document request.
4. Use the IRCC web form if your application is past the posted time.
5. Avoid re-applying unless you are asked to.

## How to reduce delays

- Submit complete documents the first time.
- Provide a valid email and address.
- Keep your application details consistent.
- Tell IRCC about important changes, such as a new address.

> Never share personal information with unofficial sites or callers claiming to be IRCC. IRCC does not ask for payment through social media.
`,
    category: "Settlement Tips",
    tags: "ircc, processing-time, application-status, delays, webform",
    published: true,
    featured: false,
    views: 720,
    author: "Canada Easy Guide Team",
    createdAt: "2026-06-18T09:00:00Z",
  },
];

// Keep the public site deterministic and safe for static export.
export function getPublishedPosts(): Post[] {
  return POSTS.filter((p) => p.published).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getFeaturedPosts(limit = 3): Post[] {
  return getPublishedPosts().filter((p) => p.featured).slice(0, limit);
}

export function getLatestPosts(limit = 9): Post[] {
  return getPublishedPosts().slice(0, limit);
}

export function getPostBySlug(slug: string): Post | undefined {
  return getPublishedPosts().find((p) => p.slug === slug);
}

export function getPostsByCategory(category: string): Post[] {
  return getPublishedPosts().filter((p) => p.category.toLowerCase() === category.toLowerCase());
}

export function getRelatedPosts(slug: string, limit = 3): Post[] {
  const current = getPostBySlug(slug);
  if (!current) return [];
  return getPublishedPosts()
    .filter((p) => p.slug !== slug && p.category === current.category)
    .slice(0, limit);
}

export function searchPosts(query: string): Post[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return getPublishedPosts().filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      (p.tags || "").toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );
}

export function getCategoryFromSlug(slug: string): string {
  const map: Record<string, string> = {
    "express-entry": "Express Entry",
    "provincial-nominee": "Provincial Nominee",
    "study-canada": "Study in Canada",
    "work-permits": "Work Permits",
    "family-sponsorship": "Family Sponsorship",
    citizenship: "Citizenship",
    "cost-of-living": "Cost of Living",
    "settlement-tips": "Settlement Tips",
  };
  return map[slug] || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function getCategorySlug(category: string): string {
  return category.toLowerCase().replace(/\s+/g, "-").replace(/[()]/g, "");
}

export const ADS: AdPlacement[] = [
  {
    id: 1,
    name: "Header",
    adsterraCode: "",
    isActive: false,
    applyToAll: true,
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: 2,
    name: "In-Post Top",
    adsterraCode: "",
    isActive: false,
    applyToAll: true,
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: 3,
    name: "In-Post Middle",
    adsterraCode: "",
    isActive: false,
    applyToAll: true,
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: 4,
    name: "Sidebar",
    adsterraCode: "",
    isActive: false,
    applyToAll: true,
    updatedAt: "2026-01-01T00:00:00Z",
  },
];

export function getActiveAds(): AdPlacement[] {
  return ADS.filter((a) => a.isActive);
}
