export type ProductType = {
    name: string,
    description: string,
    information: string,
    composition: string,
    utilisation: string,
    status: StatusType,
    price50: number,
    price100: number,
    price250: number,
    images: string[],
    category: CategoryHuileType,
    stock: boolean
}

export type CategoryHuileType = {
    category: "huileVegetale" | "graisseVegetalePure" | "huileVegetaleComposee" | "huileAromatique" | "huileEssentielle"
}

export type StatusType = {
    status: "draft" | "published" | "archived"
}