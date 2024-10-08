export type ProductType = {
    name: string,
    description: string,
    littledescription: string,
    information: string,
    composition: string,
    utilisation: string,
    status: StatusType,
    price50: number,
    price100: number,
    price2: number,
    price5: number,
    option250: boolean,
    vedette: boolean,
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

export type Cart = {
    userId: string;
    items: Array<{
        id: string;
        name: string;
        price50: number;
        price100: number;
        price2: number;
        price5: number;
        quantity50: number;
        quantity100: number;
        quantity2: number;
        quantity5: number;
        imageString: string
    }>
}

export type ProductCategory =
    | "all"
    | "huiles"
    | "graisses"
    | "huilescomposees"
    | "huilesaromatiques"
    | "huilesessentielles";