import { ParameterCategory } from "../interfaces/parameter-category";

export const paramCats:ParameterCategory[] = [
    {
        categoryName:"general",
        childrenParam:[
            {paramName:"Input"},
            {paramName:"Output"},
            {paramName:"Bypass"},
            {paramName:"Dry"},
            {paramName:"Wet"},
        ]
    }
]