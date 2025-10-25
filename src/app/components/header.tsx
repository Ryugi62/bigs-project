import Image from "next/image";
import LogoImage from "@/app/assets/logo.png"

export default function HeaderComponent() {
    const navArr = [
        { "Menu1": "/menu1" },
        { "Menu2": "/menu2" },
        { "Menu3": "/menu3" }
    ]

    return (
        <div className="max-h-[77px] h-full border-b border-[#ddd]">
            <div className="max-w-[1280px] h-full flex items-center m-auto">
                <Image
                    src={LogoImage}
                    alt="Logo"
                    className="object-contain h-[32px]"
                />

                <nav className="h-full ml-auto">
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
        </div>
    )
}