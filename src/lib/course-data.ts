import type { CourseHole } from "@/types";

export const COURSE_NAME = "Glendoveer West";
export const COURSE_CITY = "Portland, OR";
export const COURSE_PAR = 72;
export const COURSE_HOLES_COUNT = 18;

// Glendoveer West Golf Course data
// Par values: 4,4,3,4,5,4,3,4,5,4,4,3,4,5,4,4,3,5 = 72
export const COURSE_HOLES: CourseHole[] = [
  { hole_number: 1,  par: 4, yardage: 375, handicap: 7 },
  { hole_number: 2,  par: 4, yardage: 355, handicap: 11 },
  { hole_number: 3,  par: 3, yardage: 165, handicap: 15 },
  { hole_number: 4,  par: 4, yardage: 390, handicap: 1 },
  { hole_number: 5,  par: 5, yardage: 490, handicap: 5 },
  { hole_number: 6,  par: 4, yardage: 345, handicap: 13 },
  { hole_number: 7,  par: 3, yardage: 155, handicap: 17 },
  { hole_number: 8,  par: 4, yardage: 365, handicap: 3 },
  { hole_number: 9,  par: 5, yardage: 510, handicap: 9 },
  { hole_number: 10, par: 4, yardage: 385, handicap: 6 },
  { hole_number: 11, par: 4, yardage: 370, handicap: 8 },
  { hole_number: 12, par: 3, yardage: 175, handicap: 16 },
  { hole_number: 13, par: 4, yardage: 400, handicap: 2 },
  { hole_number: 14, par: 5, yardage: 505, handicap: 10 },
  { hole_number: 15, par: 4, yardage: 360, handicap: 12 },
  { hole_number: 16, par: 4, yardage: 380, handicap: 4 },
  { hole_number: 17, par: 3, yardage: 160, handicap: 18 },
  { hole_number: 18, par: 5, yardage: 520, handicap: 14 },
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
