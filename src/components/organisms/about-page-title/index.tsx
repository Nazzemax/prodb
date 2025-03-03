import { ButtonWithIcon } from "@/components/atoms/button-with-icon"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

export const AboutTitle = () => {
    return (
        <div className="h-screen max-w-[1920px] flex justify-center items-center bg-black/30">
            <div className="max-w-[1280px] h-screen flex flex-col justify-center md:items-center gap-y-10 px-5">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/home">Главная</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>О нас</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <h1 className="text-secondary text-4xl md:text-5xl lg:text-7xl font-bold md:text-center">Мы меняем представление о маркетинге в Центральной Азии</h1>
                <ButtonWithIcon>
                    Получить консультацию
                </ButtonWithIcon>
            </div>
        </div>
    )
}
