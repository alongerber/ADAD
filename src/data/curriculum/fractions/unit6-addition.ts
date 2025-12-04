import { LearningUnit } from '../../../types/curriculum';

// =============================================
// יחידה 6: חיבור שברים
// =============================================

export const unit6Addition: LearningUnit = {
  id: 'unit_6_addition',
  number: 6,
  title: 'חיבור שברים',
  description: 'חיבור שברים עם אותו מכנה ועם מכנים שונים',
  icon: '➕',

  objectives: [
    'לחבר שברים עם אותו מכנה',
    'להבין למה מחברים רק את המונים',
    'לחבר שברים עם מכנים שונים (פשוטים)',
    'לצמצם תוצאה כשצריך'
  ],

  prerequisites: ['unit_5_equivalent'],

  steps: [
    // ========================================
    // שלב 1: למידה - חיבור עם אותו מכנה
    // ========================================
    {
      id: 'step_6_1_same_denom',
      type: 'learning',
      title: 'חיבור שברים - קל!',
      slides: [
        {
          id: 'slide_add_intro',
          type: 'story',
          title: 'סיפור הפיצה',
          content: {
            emoji: '🍕',
            text: 'פיצה חתוכה ל-8 משולשים.',
            subtext: 'דני אכל 2 משולשים. אחר כך אכל עוד 3 משולשים.',
            question: 'כמה משולשים אכל בסך הכל?'
          }
        },
        {
          id: 'slide_add_visual',
          type: 'visual',
          title: 'בואו נחשב',
          content: {
            visual: {
              type: 'pizza',
              props: { slices: 8, filled: 5, showLabels: true }
            },
            highlight: '2/8 + 3/8 = 5/8',
            subtext: '2 משולשים + 3 משולשים = 5 משולשים'
          }
        },
        {
          id: 'slide_add_rule',
          type: 'discovery',
          title: 'הכלל הפשוט',
          content: {
            emoji: '💡',
            question: 'למה זה עובד ככה?',
            text: 'כשהמכנה זהה, אנחנו סופרים חלקים מאותו סוג!',
            highlight: 'מחברים רק את המונים!',
            subtext: 'המכנה נשאר אותו דבר'
          }
        },
        {
          id: 'slide_add_formula',
          type: 'visual',
          title: 'הנוסחה',
          content: {
            emoji: '📐',
            highlight: 'a/c + b/c = (a+b)/c',
            text: 'מחברים את המונים, המכנה נשאר!',
            subtext: '1/5 + 2/5 = 3/5 | 3/7 + 2/7 = 5/7'
          },
          animation: 'bounce'
        },
        {
          id: 'slide_add_examples',
          type: 'visual',
          title: 'עוד דוגמאות',
          content: {
            emoji: '✏️',
            text: '1/4 + 2/4 = 3/4',
            highlight: '2/6 + 3/6 = 5/6',
            subtext: '4/10 + 5/10 = 9/10 | 1/8 + 4/8 = 5/8'
          }
        }
      ]
    },

    // ========================================
    // שלב 2: תרגול - חיבור מכנה זהה
    // ========================================
    {
      id: 'step_6_2_practice_same',
      type: 'practice',
      title: 'תרגול חיבור',
      practiceType: 'choice',
      questions: [
        {
          id: 'q_6_2_1',
          type: 'choice',
          difficulty: 2,
          question: '1/5 + 2/5 = ?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { fraction: { n: 3, d: 5 }, text: '3/5' },
              { fraction: { n: 3, d: 10 }, text: '3/10' },
              { fraction: { n: 2, d: 5 }, text: '2/5' },
              { fraction: { n: 1, d: 5 }, text: '1/5' }
            ]
          },
          hint: 'מחברים רק את המונים!',
          explanation: '1+2=3, המכנה נשאר 5 → 3/5'
        },
        {
          id: 'q_6_2_2',
          type: 'choice',
          difficulty: 2,
          question: '2/8 + 4/8 = ?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { fraction: { n: 6, d: 16 }, text: '6/16' },
              { fraction: { n: 6, d: 8 }, text: '6/8' },
              { fraction: { n: 2, d: 8 }, text: '2/8' },
              { fraction: { n: 8, d: 8 }, text: '8/8' }
            ]
          },
          hint: '2+4=?',
          explanation: '2+4=6, המכנה 8 → 6/8'
        },
        {
          id: 'q_6_2_3',
          type: 'choice',
          difficulty: 2,
          question: '3/10 + 5/10 = ?',
          answer: {
            type: 'choice',
            correctIndex: 2,
            options: [
              { fraction: { n: 8, d: 20 }, text: '8/20' },
              { fraction: { n: 35, d: 10 }, text: '35/10' },
              { fraction: { n: 8, d: 10 }, text: '8/10' },
              { fraction: { n: 15, d: 10 }, text: '15/10' }
            ]
          },
          hint: '3+5=?',
          explanation: '3+5=8, המכנה 10 → 8/10'
        },
        {
          id: 'q_6_2_4',
          type: 'beaker',
          difficulty: 2,
          question: 'חשב: 1/6 + 3/6 = ?',
          narrative: 'מלא את השיקוי לתוצאה הנכונה',
          answer: {
            type: 'beaker',
            targetFill: { n: 4, d: 6 }
          },
          hint: '1+3=?',
          explanation: '1+3=4 → 4/6'
        }
      ],
      requiredCorrect: 3
    },

    // ========================================
    // שלב 3: למידה - תוצאה שצריך לצמצם
    // ========================================
    {
      id: 'step_6_3_reduce',
      type: 'learning',
      title: 'צמצום התוצאה',
      slides: [
        {
          id: 'slide_reduce_intro',
          type: 'story',
          title: 'לפעמים אפשר לפשט',
          content: {
            emoji: '✂️',
            text: '2/4 + 2/4 = 4/4',
            question: 'אבל מה זה 4/4?',
            subtext: 'זה שלם! אפשר לכתוב פשוט 1'
          }
        },
        {
          id: 'slide_reduce_example',
          type: 'visual',
          title: 'דוגמה נוספת',
          content: {
            emoji: '📝',
            highlight: '2/6 + 1/6 = 3/6 = 1/2',
            text: 'התוצאה 3/6 שווה לחצי!',
            subtext: 'תמיד כדאי לבדוק אם אפשר לצמצם'
          }
        },
        {
          id: 'slide_reduce_when',
          type: 'discovery',
          title: 'מתי לצמצם?',
          content: {
            emoji: '🤔',
            question: 'איך יודעים אם אפשר לצמצם?',
            text: 'אם יש מספר שמחלק גם את המונה וגם את המכנה',
            highlight: '4/8 → 4 ו-8 מתחלקים ב-4 → 1/2',
            subtext: '6/9 → מתחלקים ב-3 → 2/3'
          }
        }
      ]
    },

    // ========================================
    // שלב 4: תרגול - חיבור וצמצום
    // ========================================
    {
      id: 'step_6_4_practice_reduce',
      type: 'practice',
      title: 'חבר וצמצם',
      practiceType: 'choice',
      questions: [
        {
          id: 'q_6_4_1',
          type: 'choice',
          difficulty: 3,
          question: '1/4 + 1/4 = ? (בצורה מצומצמת)',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { fraction: { n: 1, d: 2 }, text: '1/2' },
              { fraction: { n: 2, d: 4 }, text: '2/4' },
              { fraction: { n: 2, d: 8 }, text: '2/8' }
            ]
          },
          hint: '1/4 + 1/4 = 2/4, עכשיו צמצם!',
          explanation: '2/4 = 1/2'
        },
        {
          id: 'q_6_4_2',
          type: 'choice',
          difficulty: 3,
          question: '2/6 + 1/6 = ? (בצורה מצומצמת)',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { fraction: { n: 3, d: 6 }, text: '3/6' },
              { fraction: { n: 1, d: 2 }, text: '1/2' },
              { fraction: { n: 1, d: 3 }, text: '1/3' }
            ]
          },
          hint: '2+1=3, ו-3/6 אפשר לצמצם',
          explanation: '3/6 = 1/2'
        },
        {
          id: 'q_6_4_3',
          type: 'choice',
          difficulty: 3,
          question: '3/8 + 1/8 = ? (בצורה מצומצמת)',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { fraction: { n: 1, d: 2 }, text: '1/2' },
              { fraction: { n: 4, d: 8 }, text: '4/8' },
              { fraction: { n: 2, d: 4 }, text: '2/4' }
            ]
          },
          hint: '3+1=4, ו-4/8 = ?',
          explanation: '4/8 = 1/2'
        }
      ],
      requiredCorrect: 2
    },

    // ========================================
    // שלב 5: למידה - מכנים שונים (מקרים פשוטים)
    // ========================================
    {
      id: 'step_6_5_diff_denom',
      type: 'learning',
      title: 'מכנים שונים',
      slides: [
        {
          id: 'slide_diff_intro',
          type: 'story',
          title: 'בעיה חדשה',
          content: {
            emoji: '🤯',
            text: 'מה עושים עם 1/2 + 1/4?',
            question: 'המכנים שונים!',
            subtext: 'אי אפשר לחבר חצאים ורבעים ישירות...'
          }
        },
        {
          id: 'slide_diff_solution',
          type: 'discovery',
          title: 'הפתרון',
          content: {
            emoji: '💡',
            question: 'מה עושים?',
            text: 'הופכים אותם לאותו מכנה!',
            highlight: '1/2 = 2/4',
            subtext: 'עכשיו: 2/4 + 1/4 = 3/4'
          }
        },
        {
          id: 'slide_diff_visual',
          type: 'visual',
          title: 'ויזואלי',
          content: {
            visual: {
              type: 'pizza',
              props: { slices: 4, filled: 3, showLabels: true }
            },
            highlight: '1/2 + 1/4 = 2/4 + 1/4 = 3/4',
            subtext: 'חצי = שני רבעים!'
          }
        },
        {
          id: 'slide_diff_steps',
          type: 'visual',
          title: 'השלבים',
          content: {
            emoji: '📋',
            text: '1. מצא מכנה משותף',
            highlight: '2. הרחב את השברים',
            subtext: '3. חבר את המונים'
          }
        },
        {
          id: 'slide_diff_example2',
          type: 'visual',
          title: 'דוגמה נוספת',
          content: {
            emoji: '✏️',
            text: '1/3 + 1/6 = ?',
            highlight: '1/3 = 2/6, אז: 2/6 + 1/6 = 3/6 = 1/2',
            subtext: 'שליש = שתי שישיות!'
          }
        }
      ]
    },

    // ========================================
    // שלב 6: תרגול - מכנים שונים
    // ========================================
    {
      id: 'step_6_6_practice_diff',
      type: 'practice',
      title: 'תרגול מכנים שונים',
      practiceType: 'choice',
      questions: [
        {
          id: 'q_6_6_1',
          type: 'choice',
          difficulty: 3,
          question: '1/2 + 1/4 = ?',
          answer: {
            type: 'choice',
            correctIndex: 2,
            options: [
              { fraction: { n: 2, d: 6 }, text: '2/6' },
              { fraction: { n: 1, d: 2 }, text: '1/2' },
              { fraction: { n: 3, d: 4 }, text: '3/4' },
              { fraction: { n: 2, d: 4 }, text: '2/4' }
            ]
          },
          hint: '1/2 = 2/4',
          explanation: '2/4 + 1/4 = 3/4'
        },
        {
          id: 'q_6_6_2',
          type: 'choice',
          difficulty: 3,
          question: '1/4 + 1/2 = ?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { fraction: { n: 2, d: 6 }, text: '2/6' },
              { fraction: { n: 3, d: 4 }, text: '3/4' },
              { fraction: { n: 1, d: 4 }, text: '1/4' },
              { fraction: { n: 2, d: 4 }, text: '2/4' }
            ]
          },
          hint: 'אותו חישוב כמו קודם!',
          explanation: '1/4 + 2/4 = 3/4'
        },
        {
          id: 'q_6_6_3',
          type: 'choice',
          difficulty: 4,
          question: '1/3 + 1/6 = ?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { fraction: { n: 1, d: 2 }, text: '1/2' },
              { fraction: { n: 2, d: 9 }, text: '2/9' },
              { fraction: { n: 1, d: 3 }, text: '1/3' },
              { fraction: { n: 2, d: 6 }, text: '2/6' }
            ]
          },
          hint: '1/3 = 2/6',
          explanation: '2/6 + 1/6 = 3/6 = 1/2'
        }
      ],
      requiredCorrect: 2
    },

    // ========================================
    // שלב 7: מבחן שליטה
    // ========================================
    {
      id: 'step_6_7_mastery',
      type: 'mastery',
      title: 'בדיקת הבנה',
      questions: [
        {
          id: 'mastery_6_1',
          type: 'choice',
          difficulty: 2,
          question: '2/7 + 3/7 = ?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { fraction: { n: 5, d: 7 }, text: '5/7' },
              { fraction: { n: 5, d: 14 }, text: '5/14' },
              { fraction: { n: 6, d: 7 }, text: '6/7' }
            ]
          }
        },
        {
          id: 'mastery_6_2',
          type: 'choice',
          difficulty: 2,
          question: '1/6 + 2/6 = ?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { fraction: { n: 3, d: 12 }, text: '3/12' },
              { fraction: { n: 3, d: 6 }, text: '3/6' },
              { fraction: { n: 2, d: 6 }, text: '2/6' }
            ]
          }
        },
        {
          id: 'mastery_6_3',
          type: 'choice',
          difficulty: 3,
          question: '2/8 + 2/8 = ? (מצומצם)',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { fraction: { n: 4, d: 8 }, text: '4/8' },
              { fraction: { n: 1, d: 2 }, text: '1/2' },
              { fraction: { n: 2, d: 4 }, text: '2/4' }
            ]
          }
        },
        {
          id: 'mastery_6_4',
          type: 'choice',
          difficulty: 3,
          question: '1/2 + 1/4 = ?',
          answer: {
            type: 'choice',
            correctIndex: 2,
            options: [
              { fraction: { n: 2, d: 4 }, text: '2/4' },
              { fraction: { n: 2, d: 6 }, text: '2/6' },
              { fraction: { n: 3, d: 4 }, text: '3/4' }
            ]
          }
        },
        {
          id: 'mastery_6_5',
          type: 'truefalse',
          difficulty: 2,
          question: '',
          answer: {
            type: 'truefalse',
            isTrue: true,
            statement: 'בחיבור שברים עם אותו מכנה, המכנה לא משתנה'
          }
        },
        {
          id: 'mastery_6_6',
          type: 'truefalse',
          difficulty: 3,
          question: '',
          answer: {
            type: 'truefalse',
            isTrue: true,
            statement: '1/4 + 1/4 = 1/2'
          }
        }
      ],
      passingScore: 80,
      onFail: 'review'
    }
  ],

  masterySkills: [
    'מחבר שברים עם אותו מכנה',
    'מבין שמחברים רק מונים',
    'מצמצם תוצאות',
    'מחבר שברים פשוטים עם מכנים שונים'
  ]
};
