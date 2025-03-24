
import { MarketingChapter } from "@/components/molecules/marketing-department-chapter";
import MarketingDepartmentBg from "@/assets/backgrounds/marketing_department.svg";
import { Heading } from "@/components/atoms/heading";
import { RequestHandler } from "@/components/atoms/request-handler";
import { MarketingDepartmentResponse } from "@/api/Marketing/types";

interface Props {
    isPrint?: boolean;
    data: MarketingDepartmentResponse;
}

const MarketingDepartment: React.FC<Props> = ({data}) => {

    return (
        <section
            aria-labelledby="marketing-department"
            className="relative flex justify-center p-4 md:px-16 lg:px-40"
        >
            <MarketingDepartmentBg
                id="marketing-department"
                className="absolute top-3/4 md:top-32 left-0 -z-50 max-w-[1920px]"
            />
            <div className="flex flex-col gap-y-16 w-full max-w-[1280px] py-14 md:py-36">
                <RequestHandler data={data}>
                    <div className="flex flex-col md:flex-row gap-y-5 gap-x-10">
                        <Heading as="h2">
                            {data?.title}
                        </Heading>
                        <p className="flex items-end text-gray2 text-lg lg:text-2xl">
                            {data?.sub_title}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {data?.chapters.map((chapter) => (
                            <div key={chapter.number}>
                                <MarketingChapter
                                    number={chapter.number}
                                    title={chapter.title}
                                />
                            </div>
                        ))}
                    </div>
                </RequestHandler>
            </div>
        </section>
    );
};

export default MarketingDepartment;