import Image from "next/image";
import LogoImage from "@/app/assets/logo.png"

export default function HeaderComponent() {
    const navArr = [
        { "Menu1": "/menu1" },
        { "Menu2": "/menu2" },
        { "Menu3": "/menu3" }
    ]

    return (
        <div className="h-full min-h-[77px] flex items-center">
            <Image
                src={LogoImage}
                alt="Logo"
                className="object-contain h-[32px] max-w-[215px]"
            />

            <nav
                className="h-full"
            >
                {
                    navArr.map((element, idx) => {
                        const [[label, href]] = Object.entries(element);
                        return (
                            <a key={idx} href={href} className="mx-2">
                                {label}
                            </a>
                        );
                    })
                }
            </nav>
        </div>
    )
}