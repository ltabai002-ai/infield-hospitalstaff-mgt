import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const demoRequestSchema = z.object({
  name: z.string().trim().min(2).max(100),
  hospital: z.string().trim().min(2).max(150),
  phone: z.string().min(5).max(30),
  email: z.union([z.string().trim().email().max(255), z.literal("")]).optional(),
  staffCount: z.string().optional(),
  role: z.string().optional(),
  challenge: z.string().optional(),
  message: z.string().trim().max(1000).optional(),
});

export const submitDemoRequest = createServerFn({ method: "POST" })
  .inputValidator((input) => demoRequestSchema.parse(input))
  .handler(async ({ data }) => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      await supabaseAdmin.from("demo_requests").insert({
        name: data.name,
        hospital: data.hospital,
        phone: data.phone,
        email: data.email || null,
        staff_count: data.staffCount ?? null,
        role: data.role ?? null,
        message: data.message || null,
      });
    } catch (e) {
      // Ignore Supabase error if not configured
    }
    return { ok: true };
  });
