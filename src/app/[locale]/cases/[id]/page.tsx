import { getPostById } from "@/api/Post";
import { getPromotionTypes } from "@/api/Types";
import { CostCalculationForm } from "@/components/forms/cost-calculation-form";
import FeedbackForm from "@/components/forms/feedback-form";
import { CaseItemHeader } from "@/components/molecules/case-item-header";
import { CaseImages } from "@/components/organisms/case-images";
import { CaseStats } from "@/components/organisms/case-stats";
import { CaseTaskList } from "@/components/organisms/case-task-list";
import CompanyPostList from "@/components/organisms/company-post-list";
import FormLayout from "@/components/templates/form-layout";
import { Separator } from "@/components/ui/separator";

type Params = Promise<{ id: string }>;

export async function generateMetadata(props: { params: Params }) {
    const params = await props.params
    const data = await getPostById(params.id);
   

    return {
        title: data?.title || "Кейс",
    };
}

const CasePage = async (props: { params: Params }) => {
    const params = await props.params
    const data = await getPostById(params.id);
    const promotion_types = await getPromotionTypes();

    return (
        <>
            {data &&
                <CaseItemHeader
                    post={data}
                    breadcrumb={[
                        { text: 'Главная', href: '/home' },
                        { text: 'Кейсы', href: '/cases' },
                        { text: data?.title, href: '/cases' }
                    ]}
                />
            }
            <Separator className="bg-graphic-gray h-[1px] mb-8 md:mb-14" />
            {data?.tasks && <CaseTaskList tasks={data?.tasks} />}
            {data?.images &&
                <>
                    <CaseImages images={data?.images} />
                    <Separator className="bg-graphic-gray h-[1px] mb-8 md:mb-14" />
                </>
            }

            {data?.target && data?.target.length > 0 &&
                <>
                    <CaseTaskList tasks={data.target} />
                    <Separator className="bg-graphic-gray h-[1px] mb-8 md:mb-14" />
                </>
            }
            {data?.results && data?.results.length > 0 &&
                <>
                    <CaseStats stats={data?.results} />
                    <Separator className="bg-graphic-gray h-[1px] mb-8 md:mb-14" />
                </>
            }

            <CompanyPostList title="Другие кейсы" />
            <FormLayout nestedForm={<CostCalculationForm promotion_types={promotion_types} />} />
        </>
    )
}

export default CasePage;