import { REST_API } from "@/constants"

export const getAllCourseMaterialsWithCourseCode = async(courseCode: string) => {
    const response = await fetch(REST_API + `/courses/materials/get-all-materials/${courseCode}`, {
        method: "GET",
        credentials: "include", 
        headers: {"content-Type": "application/json"}
    })
    return response
}