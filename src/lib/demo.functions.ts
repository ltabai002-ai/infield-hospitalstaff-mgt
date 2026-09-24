import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const demoRequestSchema = z.object({
  name: z.string().trim().min(2).max(100),
  hospital: z.string().trim().min(2).max(150),
  phone: z.string().regex(/^[6-9]\d{9}$/),
  email: z.union([z.string().trim().email().max(255), z.literal("")]).optional(),
  staffCount: z.enum(["1–50", "51–200", "201–500", "500+"]).optional(),
  role: z.enum(["Owner/Director", "Administrator", "Operations", "Other"]).optional(),
  message: z.string().trim().max(1000).optional(),
});

export const submitDemoRequest = createServerFn({ method: "POST" })
  .inputValidator((input) => demoRequestSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("demo_requests").insert({
      name: data.name,
      hospital: data.hospital,
      phone: data.phone,
      email: data.email || null,
      staff_count: data.staffCount ?? null,
      role: data.role ?? null,
      message: data.message || null,
    });
    if (error) throw new Error("We could not save your request. Please try again.");
    return { ok: true };
  });
