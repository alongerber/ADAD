// =============================================
// אינדקס יחידות מספרים וחיסור - כיתה ד'
// =============================================

import { LearningUnit } from '../../../types/curriculum';
import { unit1PlaceValue } from './unit1-place-value';
import { unit2Thousands } from './unit2-thousands';
import { unit3ZeroTraps } from './unit3-zero-traps';
import { unit4Subtraction } from './unit4-subtraction';
import { unit5Borrowing } from './unit5-borrowing';
import { unit6Mastery } from './unit6-mastery';

// =============================================
// מודול מספרים מלא
// =============================================
export interface NumbersModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  units: LearningUnit[];
  totalSteps: number;
  estimatedTime: string;
}

export const numbersModule: NumbersModule = {
  id: 'numbers_grade_4',
  title: 'מספרים וחיסור',
  description: 'כתיבת מספרים גדולים וחיסור במאונך עם פריטה',
  icon: '🔢',
  units: [
    unit1PlaceValue,
    unit2Thousands,
    unit3ZeroTraps,
    unit4Subtraction,
    unit5Borrowing,
    unit6Mastery
  ],
  totalSteps:
    unit1PlaceValue.steps.length +
    unit2Thousands.steps.length +
    unit3ZeroTraps.steps.length +
    unit4Subtraction.steps.length +
    unit5Borrowing.steps.length +
    unit6Mastery.steps.length,
  estimatedTime: '3-4 שעות'
};

// =============================================
// פונקציות עזר
// =============================================

/**
 * מחזיר יחידה לפי ID
 */
export function getUnitById(unitId: string): LearningUnit | undefined {
  return numbersModule.units.find(u => u.id === unitId);
}

/**
 * מחזיר את היחידה הבאה
 */
export function getNextUnit(currentUnitId: string): LearningUnit | undefined {
  const currentIndex = numbersModule.units.findIndex(u => u.id === currentUnitId);
  if (currentIndex === -1 || currentIndex >= numbersModule.units.length - 1) {
    return undefined;
  }
  return numbersModule.units[currentIndex + 1];
}

/**
 * מחזיר את היחידה הקודמת
 */
export function getPreviousUnit(currentUnitId: string): LearningUnit | undefined {
  const currentIndex = numbersModule.units.findIndex(u => u.id === currentUnitId);
  if (currentIndex <= 0) {
    return undefined;
  }
  return numbersModule.units[currentIndex - 1];
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
  const totalCount = numbersModule.units.length;
  const completedCount = numbersModule.units.filter(u =>
    completedUnits.includes(u.id)
  ).length;

  const progressPercent = Math.round((completedCount / totalCount) * 100);

  // מצא את היחידה הבאה שזמינה אבל לא הושלמה
  const nextUnit = numbersModule.units.find(u =>
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
  unit1PlaceValue,
  unit2Thousands,
  unit3ZeroTraps,
  unit4Subtraction,
  unit5Borrowing,
  unit6Mastery
};

// ייצוא ברירת מחדל
export default numbersModule;
