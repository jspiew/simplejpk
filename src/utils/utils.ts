import * as df from "dateformat"

export const DATEFORMAT = "dd-mmm-yyyy";
export function _formatDate(date: Date){
    return df(date, DATEFORMAT)
}
export const VATRATES = [0,5,8,23]