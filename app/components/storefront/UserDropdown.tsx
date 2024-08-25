import { LogOut, Mail, PlusCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";

type UserDropDownType = {
    email: string;
    name: string;
    userImage: string
}

export function UserDropdown({email, name, userImage}: UserDropDownType) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                >
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={userImage} alt="photo utilisateur" />
                        <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                        {/* <Mail className="mr-2 h-4 w-4" /> */}
                        {email}
                    </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/">Accueil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/products/all">Tous les produits</Link>
                </DropdownMenuItem>

                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Huiles</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem asChild>
                                <Link href="/products/huiles">
                                    Huiles végétales
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/products/huilescomposees">
                                    Huiles végétales composées
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/products/huilesaromatiques">
                                    Huiles aromatiques
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/products/huilesessentielles">
                                    Huiles essentielles
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>

                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Graisses</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem asChild>
                                <Link href="/products/graisses">
                                    Graisses végétales
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>

                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <LogoutLink>
                        <LogOut className="mr-2 h-4 w-4" />
                        Déconnexion
                    </LogoutLink>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
