type Tuple = [number | null, number | null]
interface Course {
  name: string,
  prices: Tuple
}
type CourseList = Course[]

let courses: CourseList = [
  { name: "Courses in England", prices: [0, 100] },
  { name: "Courses in Germany", prices: [500, null] },
  { name: "Courses in Italy", prices: [100, 200] },
  { name: "Courses in Russia", prices: [null, 400] },
  { name: "Courses in China", prices: [50, 250] },
  { name: "Courses in China", prices: [50, 210] },
  { name: "Courses in USA", prices: [200, null] },
  { name: "Courses in Kazakhstan", prices: [56, 324] },
  { name: "Courses in France", prices: [null, null] },
]

// Варианты цен (фильтры), которые ищет пользователь
let requiredRange1: Tuple = [null, 200]
let requiredRange2: Tuple = [100, 350]
let requiredRange3: Tuple = [200, null]

/**
 * Filter list of courses by specified range of prices
 * @param searchedRange Range of prices which list will be filtered by
 * @returns Filtered #CourseList by specified range
 */

function filterCourseList(searchedRange: Tuple): CourseList {
  if (!searchedRange[0] && !searchedRange[1])
    return courses

  const requiredCourses: CourseList = []
  const [minSearchPrice, maxSearchPrice] = searchedRange

  for (let i = 0; i < courses.length; i++) {
    const course = courses[i]
    const [minCoursePrice, maxCoursePrice] = course.prices

    if (!minCoursePrice && !maxCoursePrice) {
      requiredCourses.push({
        ...course,
        prices: searchedRange
      })
      continue
    }

    if (
      (!minSearchPrice && maxSearchPrice > minCoursePrice) ||
      (!maxSearchPrice && minSearchPrice < maxCoursePrice) ||
      (maxSearchPrice > minCoursePrice && minSearchPrice < maxCoursePrice)
    )
      requiredCourses.push(countNewPriceRange(searchedRange, course))
  }

  return requiredCourses
}

/**
 * This function returns the set of prices that exists in both intervals
 */
function countNewPriceRange(searchedRange: Tuple, course: Course): Course {
  const priceRange: Tuple = course.prices
  return {
    ...course,
    prices: [
      Math.max(searchedRange[0], priceRange[0]) || null,
      Math.min(searchedRange[1], priceRange[1]) ||
      Math.max(searchedRange[1], priceRange[1])
    ]
  }
}

/**
 * Sort courses list
 * @param courses List of courses
 * @param direction true/false: true - ascending sort, false - descending sort
 */

function sortCoursesList(courses: CourseList, direction: boolean = true): CourseList {
  const coursesCopy = [...courses]
  if (direction) {
    return coursesCopy.sort((a, b) =>
      (a.prices[0] - b.prices[0]) || (a.prices[1] - b.prices[1]))
  }
  else {
    return coursesCopy.sort((a, b) =>
      -(a.prices[0] - b.prices[0]) || -(a.prices[1] - b.prices[1]))
  }
}

sortCoursesList(courses)

console.log("< 200", filterCourseList(requiredRange1))
console.log("100-350", filterCourseList(requiredRange2))
console.log("> 200", filterCourseList(requiredRange3))

console.log("sorted: ", sortCoursesList(courses, true))
console.log("sorted: ", sortCoursesList(courses, false))
