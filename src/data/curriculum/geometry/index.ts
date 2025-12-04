// =============================================
// אינדקס יחידות גיאומטריה - כיתה ד'
// =============================================

import { LearningUnit } from '../../../types/curriculum';
import { unit1Shapes } from './unit1-shapes';
import { unit2Perimeter } from './unit2-perimeter';
import { unit3Area } from './unit3-area';
import { unit4Angles } from './unit4-angles';
import { unit5Mastery } from './unit5-mastery';

// =============================================
// מודול גיאומטריה מלא
// =============================================
export interface GeometryModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  units: LearningUnit[];
  totalSteps: number;
  estimatedTime: string;
}

export const geometryModule: GeometryModule = {
  id: 'geometry_grade_4',
  title: 'גיאומטריה',
  description: 'צורות, היקף, שטח וזוויות',
  icon: '📐',
  units: [
    unit1Shapes,
    unit2Perimeter,
    unit3Area,
    unit4Angles,
    unit5Mastery
  ],
  totalSteps:
    unit1Shapes.steps.length +
    unit2Perimeter.steps.length +
    unit3Area.steps.length +
    unit4Angles.steps.length +
    unit5Mastery.steps.length,
  estimatedTime: '3-4 שעות'
};

// =============================================
// פונקציות עזר
// =============================================

/**
 * מחזיר יחידה לפי ID
 */
export function getUnitById(unitId: string): LearningUnit | undefined {
  return geometryModule.units.find(u => u.id === unitId);
}

/**
 * מחזיר את היחידה הבאה
 */
export function getNextUnit(currentUnitId: string): LearningUnit | undefined {
  const currentIndex = geometryModule.units.findIndex(u => u.id === currentUnitId);
  if (currentIndex === -1 || currentIndex >= geometryModule.units.length - 1) {
    return undefined;
  }
  return geometryModule.units[currentIndex + 1];
}

/**
 * מחזיר את היחידה הקודמת
 */
export function getPreviousUnit(currentUnitId: string): LearningUnit | undefined {
  const currentIndex = geometryModule.units.findIndex(u => u.id === currentUnitId);
  if (currentIndex <= 0) {
    return undefined;
  }
  return geometryModule.units[currentIndex - 1];
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
  const totalCount = geometryModule.units.length;
  const completedCount = geometryModule.units.filter(u =>
    completedUnits.includes(u.id)
  ).length;

  const progressPercent = Math.round((completedCount / totalCount) * 100);

  // מצא את היחידה הבאה שזמינה אבל לא הושלמה
  const nextUnit = geometryModule.units.find(u =>
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
  unit1Shapes,
  unit2Perimeter,
  unit3Area,
  unit4Angles,
  unit5Mastery
};

// ייצוא ברירת מחדל
export default geometryModule;
