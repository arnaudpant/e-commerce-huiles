import { z } from "zod"

export const productSchema = z.object({
    name: z.string(),
    description: z.string(),
    littledescription: z.string(),
    information: z.string(),
    composition: z.string(),
    utilisation: z.string(),
    status: z.enum(["draft", "published", "archived"]),
    price50: z.number().min(0),
    price100: z.number().min(0),
    price2: z.number().min(0),
    price5: z.number().min(0),
    option250: z.boolean().optional(),
    images: z.array(z.string()).min(1, "Au moins une image requise"),
    category: z.enum(["huileVegetale", "graisseVegetalePure", "huileVegetaleComposee", "huileAromatique", "huileEssentielle"]),
    stock: z.boolean().optional(),
})

export const bannerSchema = z.object({
    title: z.string(),
    imageString: z.string()
})