import { getAllCourseMaterialsWithCourseCode } from "./scripts/courseFetches"

class Api {
    Courses = {
        Materials:  {
           async GetAllCourseMaterialsWithCourseCode (courseCode: string) {
             const response = await getAllCourseMaterialsWithCourseCode(courseCode)
              return response
            }
        }
    }
}

const BaseApi = new Api();

export  default BaseApi