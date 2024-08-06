import { z } from "zod"

export const productSchema = z.object({
    name: z.string(),
    description: z.string(),
    information: z.string(),
    composition: z.string(),
    utilisation: z.string(),
    status: z.enum(["draft", "published", "archived"]),
    price50: z.number().min(0),
    price100: z.number().min(0),
    price250: z.number().optional(),
    images: z.array(z.string().min(1, "Au moins une image requise")),
    category: z.enum(["huileVegetale", "graisseVegetalePure", "huileVegetaleComposee", "huileAromatique", "huileEssentielle"]),
    stock: z.boolean().optional(),
    format: z.enum(["ml50", "ml100", "ml250"])
})