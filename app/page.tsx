import { Button } from "./components/ui/button";
import {
    RegisterLink,
    LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
    return (
        <div className="flex gap-4 m-4">
            <Button asChild>
                <LoginLink>Connexion</LoginLink>
            </Button>
            <Button asChild>
                <RegisterLink>Inscription</RegisterLink>
            </Button>
        </div>
    );
}
