import { z } from "zod";

/**
 * Categories are dynamic (DB-driven), so the schema only checks the shape here.
 * Routes validate that the value is actually a known submittable category
 * against the database (see isSubmittableCategory in lib/db/categories.ts).
 */
export const resourceCategorySchema = z
  .string()
  .trim()
  .min(1, "Elegí una categoría")
  .max(64);
export type ResourceCategory = z.infer<typeof resourceCategorySchema>;

export const resourceSchema = z.object({
  name: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres").max(80),
  description: z
    .string()
    .trim()
    .min(10, "Contá un poco más (mínimo 10 caracteres)")
    .max(300),
  url: z.string().trim().url("La URL no es válida"),
  tags: z
    .array(z.string().trim().min(1).max(24))
    .min(1, "Agregá al menos un tag")
    .max(8, "Máximo 8 tags"),
  category: resourceCategorySchema,
  featured: z.boolean().optional(),
});
export type ResourceInput = z.infer<typeof resourceSchema>;

export const loginSchema = z.object({
  email: z.string().trim().email("Email inválido"),
  password: z.string().min(1, "Ingresá tu contraseña"),
});
export type LoginInput = z.infer<typeof loginSchema>;

/** Collect every validation issue so users fix all fields at once. */
export function formatZodIssues(error: z.ZodError): string {
  const unique = [...new Set(error.issues.map((issue) => issue.message))];
  return unique.join(" · ");
}
