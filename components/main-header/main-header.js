import Link from "next/link";
import Image from "next/image";
import logoImg from "@/assets/logo.png";
import classes from './main-header.module.css'
import MainHeaderBackground from "@/components/main-header/main-header-background";
import NavLink from "@/components/main-header/nav-link";

export default function MainHeader() {

    return (
        <>
        <MainHeaderBackground></MainHeaderBackground>
        <header className={classes.header} id="main-header">
            <Link className={classes.logo} href="/">
                <Image
                    src={logoImg}
                    alt="a plate with food"
                />
                NextLevel Food
            </Link>

            <nav className={classes.nav}>
                <ul>
                    <li>
                        <NavLink href="/meals">Browse Meals</NavLink>
                    </li>
                    <li>
                        <NavLink href="/community">Foodies Community</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
        </>
    );
}
