// import { createContext, useContext } from "react";
// import { useGetBusinessTypesQuery, useGetServicesTypesQuery, useGetPromotionGoalsQuery } from "@/api/Base";

// const FormOptionsContext = createContext(null);

// export const FormOptionsProvider = ({ children }) => {
//     const { data: businessTypes = [], isLoading: businessLoading } = useGetBusinessTypesQuery();
//     const { data: servicesTypes = [], isLoading: servicesLoading } = useGetServicesTypesQuery();
//     const { data: promotionGoals = [], isLoading: goalsLoading } = useGetPromotionGoalsQuery();

//     const isLoading = businessLoading || servicesLoading || goalsLoading;

//     return (
//         <FormOptionsContext.Provider value={{ businessTypes, servicesTypes, promotionGoals, isLoading }}>
//             {children}
//         </FormOptionsContext.Provider>
//     );
// };

// export const useFormOptions = () => {
//     return useContext(FormOptionsContext);
// };
