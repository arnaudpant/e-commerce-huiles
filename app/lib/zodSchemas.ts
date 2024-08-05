import { z } from "zod"

export const productSchema = z.object({
    name: z.string(),
    description: z.string(),
    information: z.string(),
    composition: z.string(),
    utilisation: z.string(),
    status: z.enum(["draft", "published", "archived"]),
    price50: z.number(),
    price100: z.number(),
    price250: z.number(),
    images: z.array(z.string().min(1, "Au moins une image requise")),
    category: z.enum(["huileVegetale", "graisseVegetalePure", "huileVegetaleComposee", "huileAromatique", "huileEssentielle"]),
    stock: z.number(),
    format: z.enum(["ml50", "ml100", "ml250"])
})