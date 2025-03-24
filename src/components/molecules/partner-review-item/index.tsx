"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslations } from "next-intl";
import { RatingIcon } from "@/assets/info-card";

interface ReviewItemProps {
    rating: number;
    user_image: string;
    user_name: string;
    user_position: string;
    text: string;
}

export const ReviewItem = ({ rating, user_image, user_name, user_position, text }: ReviewItemProps) => {
    const [open, setOpen] = useState(false);
    const t = useTranslations("HomePage")

    return (
        <>
            {/* Основной элемент карточки с урезанным текстом */}
            <div className="w-full md:w-[380px] p-5 lg:px-9 rounded-2xl shadow-lg border-none">
                <div className="p-0 pt-5 lg:pt-12">
                    <div className="flex mb-4 gap-x-2">
                        {Array.from({ length: rating }).map((_, idx) => (
                            <RatingIcon key={idx} className="text-yellow-500" fill="currentColor" />
                        ))}
                    </div>
                    <div className="flex gap-x-3">
                        <Avatar className="bg-yellow-600">
                            <AvatarImage alt={user_name} src={user_image}/>
                        </Avatar>
                        <div className="flex flex-col">
                            <h2 className="font-bold w-3/4 lg:w-full text-lg leading-6">{user_name}</h2>
                            <div className="text-gray2 text-sm">{user_position}</div>
                        </div>
                    </div>
                    <p className="text-gray2 line-clamp-6 lg:line-clamp-10 mt-3 no-select">{text}</p>
                </div>
                <div className="flex justify-center lg:justify-start mt-3">
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button
                                variant="clean"
                                className="mt-auto w-fit text-accent py-2 px-4 gap-1 text-center hover:bg-background-gray2"
                            >
                                <span className="text-base">
                                    {t("section2.readAll")}
                                </span>
                                <ChevronRight />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg">
                            {/* Контент модалки с полным текстом */}
                            <div className="lg:px-5">
                                <div className="pt-5">
                                    <DialogTitle>
                                        <div className="flex mb-4 gap-x-2">
                                            {Array.from({ length: rating }).map((_, idx) => (
                                                <RatingIcon key={idx} className="text-yellow-500" fill="currentColor" />
                                            ))}
                                        </div>
                                    </DialogTitle>
                                    <div className="flex gap-x-3">
                                        <Avatar className="bg-yellow-600">
                                            <AvatarImage alt={user_name} src={user_image} />
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <DialogTitle><div className="font-bold w-3/4 md:w-full text-lg leading-6">{user_name}</div></DialogTitle>
                                            <div className="text-gray text-sm">{user_position}</div>
                                        </div>
                                    </div>
                                    {/* Полный текст */}
                                    <ScrollArea className="max-h-[400px] w-full my-3">
                                        {text}
                                    </ScrollArea>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </>
    );
};
