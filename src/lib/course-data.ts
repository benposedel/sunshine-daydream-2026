import type { CourseHole } from "@/types";

export const COURSE_NAME = "Glendoveer West";
export const COURSE_CITY = "Portland, OR";
export const COURSE_PAR = 71;
export const COURSE_HOLES_COUNT = 18;

// Glendoveer West Golf Course — WHITE tees
// Par values: 4,4,4,3,4,4,4,4,5,4,4,3,4,4,5,4,4,3 = 71
// Total yardage: 2705
export const COURSE_HOLES: CourseHole[] = [
  { hole_number: 1,  par: 4, yardage: 275, handicap: 13 },
  { hole_number: 2,  par: 4, yardage: 242, handicap: 15 },
  { hole_number: 3,  par: 4, yardage: 304, handicap: 7 },
  { hole_number: 4,  par: 3, yardage: 154, handicap: 17 },
  { hole_number: 5,  par: 4, yardage: 268, handicap: 11 },
  { hole_number: 6,  par: 4, yardage: 357, handicap: 1 },
  { hole_number: 7,  par: 4, yardage: 335, handicap: 5 },
  { hole_number: 8,  par: 4, yardage: 346, handicap: 3 },
  { hole_number: 9,  par: 5, yardage: 424, handicap: 9 },
  { hole_number: 10, par: 4, yardage: 265, handicap: 14 },
  { hole_number: 11, par: 4, yardage: 372, handicap: 2 },
  { hole_number: 12, par: 3, yardage: 112, handicap: 18 },
  { hole_number: 13, par: 4, yardage: 308, handicap: 8 },
  { hole_number: 14, par: 4, yardage: 340, handicap: 6 },
  { hole_number: 15, par: 5, yardage: 457, handicap: 4 },
  { hole_number: 16, par: 4, yardage: 383, handicap: 10 },
  { hole_number: 17, par: 4, yardage: 341, handicap: 12 },
  { hole_number: 18, par: 3, yardage: 144, handicap: 16 },
];

export function getHole(holeNumber: number): CourseHole {
  const hole = COURSE_HOLES.find((h) => h.hole_number === holeNumber);
  if (!hole) throw new Error(`Invalid hole number: ${holeNumber}`);
  return hole;
}

export function getParThrough(holeNumber: number): number {
  return COURSE_HOLES
    .filter((h) => h.hole_number <= holeNumber)
    .reduce((sum, h) => sum + h.par, 0);
}
