// =============================================
// אינדקס יחידות שברים - כיתה ד'
// =============================================

import { LearningUnit } from '../../../types/curriculum';
import { unit1Whole } from './unit1-whole';
import { unit2Basics } from './unit2-basics';
import { unit3Special } from './unit3-special';
import { unit4Compare } from './unit4-compare';
import { unit5Equivalent } from './unit5-equivalent';
import { unit6Addition } from './unit6-addition';
import { unit7Subtraction } from './unit7-subtraction';
import { unit8Mastery } from './unit8-mastery';

// =============================================
// מודול שברים מלא
// =============================================
export interface FractionsModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  units: LearningUnit[];
  totalSteps: number;
  estimatedTime: string;
}

export const fractionsModule: FractionsModule = {
  id: 'fractions_grade_4',
  title: 'שברים',
  description: 'קורס מלא בשברים לכיתה ד\' - מהבסיס ועד שליטה מלאה',
  icon: '🍕',
  units: [
    unit1Whole,
    unit2Basics,
    unit3Special,
    unit4Compare,
    unit5Equivalent,
    unit6Addition,
    unit7Subtraction,
    unit8Mastery
  ],
  totalSteps:
    unit1Whole.steps.length +
    unit2Basics.steps.length +
    unit3Special.steps.length +
    unit4Compare.steps.length +
    unit5Equivalent.steps.length +
    unit6Addition.steps.length +
    unit7Subtraction.steps.length +
    unit8Mastery.steps.length,
  estimatedTime: '4-6 שעות'
};

// =============================================
// פונקציות עזר
// =============================================

/**
 * מחזיר יחידה לפי ID
 */
export function getUnitById(unitId: string): LearningUnit | undefined {
  return fractionsModule.units.find(u => u.id === unitId);
}

/**
 * מחזיר את היחידה הבאה
 */
export function getNextUnit(currentUnitId: string): LearningUnit | undefined {
  const currentIndex = fractionsModule.units.findIndex(u => u.id === currentUnitId);
  if (currentIndex === -1 || currentIndex >= fractionsModule.units.length - 1) {
    return undefined;
  }
  return fractionsModule.units[currentIndex + 1];
}

/**
 * מחזיר את היחידה הקודמת
 */
export function getPreviousUnit(currentUnitId: string): LearningUnit | undefined {
  const currentIndex = fractionsModule.units.findIndex(u => u.id === currentUnitId);
  if (currentIndex <= 0) {
    return undefined;
  }
  return fractionsModule.units[currentIndex - 1];
}

/**
 * בודק אם יחידה זמינה (prerequisites מולאו)
 */
export function isUnitAvailable(unitId: string, completedUnits: string[]): boolean {
  const unit = getUnitById(unitId);
  if (!unit) return false;

  // יחידה ראשונה תמיד זמינה
  if (!unit.prerequisites || unit.prerequisites.length === 0) {
    return true;
  }

  // בדיקה שכל הדרישות המקדימות הושלמו
  return unit.prerequisites.every(prereq => completedUnits.includes(prereq));
}

/**
 * מחזיר סטטיסטיקות מודול
 */
export function getModuleStats(completedUnits: string[]): {
  completedCount: number;
  totalCount: number;
  progressPercent: number;
  nextUnit: LearningUnit | undefined;
} {
  const totalCount = fractionsModule.units.length;
  const completedCount = fractionsModule.units.filter(u =>
    completedUnits.includes(u.id)
  ).length;

  const progressPercent = Math.round((completedCount / totalCount) * 100);

  // מצא את היחידה הבאה שזמינה אבל לא הושלמה
  const nextUnit = fractionsModule.units.find(u =>
    !completedUnits.includes(u.id) && isUnitAvailable(u.id, completedUnits)
  );

  return {
    completedCount,
    totalCount,
    progressPercent,
    nextUnit
  };
}

// ייצוא יחידות בודדות
export {
  unit1Whole,
  unit2Basics,
  unit3Special,
  unit4Compare,
  unit5Equivalent,
  unit6Addition,
  unit7Subtraction,
  unit8Mastery
};

// ייצוא ברירת מחדל
export default fractionsModule;
