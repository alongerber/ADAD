import React from 'react';
import { PracticeQuestion, PracticeType } from '../../types/curriculum';
import { MultipleChoice } from './MultipleChoice';
import { TapToCount } from './TapToCount';
import { TrueFalse } from './TrueFalse';
import { SortOrder } from './SortOrder';
import { DragMatch } from './DragMatch';

// =============================================
// קומפוננטת ניתוב לסוגי תרגול שונים
// =============================================
interface PracticeRouterProps {
  question: PracticeQuestion;
  onAnswer: (isCorrect: boolean) => void;
  disabled?: boolean;
}

export const PracticeRouter: React.FC<PracticeRouterProps> = ({
  question,
  onAnswer,
  disabled = false
}) => {
  const { type, answer } = question;

  switch (type) {
    case 'choice':
      if (answer.type !== 'choice') return null;
      return (
        <MultipleChoice
          question={question.question}
          narrative={question.narrative}
          options={answer.options}
          correctIndex={answer.correctIndex}
          onAnswer={(isCorrect) => onAnswer(isCorrect)}
          disabled={disabled}
        />
      );

    case 'tap':
      if (answer.type !== 'tap') return null;
      return (
        <TapToCount
          question={question.question}
          narrative={question.narrative}
          totalParts={answer.totalParts}
          targetCount={answer.targetCount}
          type="pizza"
          onAnswer={(isCorrect) => onAnswer(isCorrect)}
          disabled={disabled}
        />
      );

    case 'truefalse':
      if (answer.type !== 'truefalse') return null;
      return (
        <TrueFalse
          statement={answer.statement}
          isTrue={answer.isTrue}
          narrative={question.narrative}
          onAnswer={(isCorrect) => onAnswer(isCorrect)}
          disabled={disabled}
        />
      );

    case 'sort':
      if (answer.type !== 'sort') return null;
      // המרת הפריטים לפורמט של SortOrder
      const sortItems = answer.items.map((item, idx) => {
        if (typeof item === 'string') {
          return {
            id: `sort_${idx}`,
            text: item,
            value: idx // נצטרך לחשב ערך אמיתי
          };
        }
        return {
          id: `sort_${idx}`,
          fraction: item,
          value: item.n / item.d
        };
      });
      return (
        <SortOrder
          question={question.question}
          narrative={question.narrative}
          items={sortItems}
          direction="ascending"
          onAnswer={(isCorrect) => onAnswer(isCorrect)}
          disabled={disabled}
        />
      );

    case 'match':
      if (answer.type !== 'match') return null;
      // המרת הזוגות לפורמט של DragMatch
      const matchPairs = answer.pairs.map((pair, idx) => {
        const left = typeof pair.left === 'string'
          ? { type: 'text' as const, text: pair.left }
          : { type: 'fraction' as const, fraction: pair.left };

        let right: { type: 'visual' | 'text'; visual?: { slices: number; filled: number }; text?: string };
        if (typeof pair.right === 'string') {
          right = { type: 'text', text: pair.right };
        } else if ('type' in pair.right && pair.right.type === 'pizza') {
          right = {
            type: 'visual',
            visual: {
              slices: pair.right.props?.slices || 4,
              filled: pair.right.props?.filled || 0
            }
          };
        } else {
          right = { type: 'text', text: String(pair.right) };
        }

        return { id: `match_${idx}`, left, right };
      });
      return (
        <DragMatch
          question={question.question}
          narrative={question.narrative}
          pairs={matchPairs}
          onAnswer={(isCorrect) => onAnswer(isCorrect)}
          disabled={disabled}
        />
      );

    case 'beaker':
      // הכוסית נשארת בקומפוננטה הקיימת - LabRoom
      // זה placeholder במקרה שנרצה להעביר גם אותה לכאן
      return (
        <div className="text-center text-white/60">
          סוג תרגול כוסית - נמצא ב-LabRoom
        </div>
      );

    default:
      return (
        <div className="text-center text-red-400">
          סוג תרגול לא מוכר: {type}
        </div>
      );
  }
};

export default PracticeRouter;
