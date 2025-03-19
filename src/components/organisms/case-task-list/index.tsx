import { CaseTask } from "@/components/molecules/case-task";
import { Separator } from "@radix-ui/react-separator";

export const CaseTaskList = ({ tasks }: { tasks: { title: string; description: string; }[] }) => {
    return (
        <article className="max-w-[1280px] m-auto px-5">
            {tasks?.map((task) => (
                <div key={task.title} className="relative space-y-14">
                    <CaseTask
                        key={task.title}
                        title={task.title}
                        description={task.description}
                    />
                    <Separator className="bg-graphic-gray h-[1px]" />
                </div>
            ))}
        </article>
    )
}
