import React from 'react';
import { ForestryContextType } from "../../views/forestry/types";

export const handleSetHistoryStack = (
    newValue: string,
    setForestryContext: React.Dispatch<React.SetStateAction<ForestryContextType>>,
    forestryContext: ForestryContextType
) => {
    const newHistoryStack = [...forestryContext.historyStack, newValue];
    //shift `newHistoryStack` Not to make the stack to big
    //Aim is to make sure that the back button routes to correct page eg: back to activity, etc
    if (newHistoryStack.length > 1000) {
        newHistoryStack.shift()
    }
    setForestryContext({ ...forestryContext, historyStack: newHistoryStack })
}
