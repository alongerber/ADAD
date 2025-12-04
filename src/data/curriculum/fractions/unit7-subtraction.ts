import { LearningUnit } from '../../../types/curriculum';

// =============================================
// יחידה 7: חיסור שברים
// =============================================

export const unit7Subtraction: LearningUnit = {
  id: 'unit_7_subtraction',
  number: 7,
  title: 'חיסור שברים',
  description: 'חיסור שברים עם אותו מכנה ועם מכנים שונים',
  icon: '➖',

  objectives: [
    'לחסר שברים עם אותו מכנה',
    'להבין למה מחסרים רק את המונים',
    'לחסר שברים עם מכנים שונים (פשוטים)',
    'לפתור בעיות מילוליות עם חיסור שברים'
  ],

  prerequisites: ['unit_6_addition'],

  steps: [
    // ========================================
    // שלב 1: למידה - חיסור עם אותו מכנה
    // ========================================
    {
      id: 'step_7_1_same_denom',
      type: 'learning',
      title: 'חיסור שברים - כמו חיבור!',
      slides: [
        {
          id: 'slide_sub_intro',
          type: 'story',
          title: 'הפיצה שנאכלה',
          content: {
            emoji: '🍕',
            text: 'הייתה פיצה שלמה, חתוכה ל-8 משולשים.',
            subtext: 'אכלו 3 משולשים.',
            question: 'כמה נשאר?'
          }
        },
        {
          id: 'slide_sub_visual',
          type: 'visual',
          title: 'בואו נחשב',
          content: {
            visual: {
              type: 'pizza',
              props: { slices: 8, filled: 5, showLabels: true }
            },
            highlight: '8/8 - 3/8 = 5/8',
            subtext: 'היו 8, אכלו 3, נשארו 5'
          }
        },
        {
          id: 'slide_sub_rule',
          type: 'discovery',
          title: 'הכלל המוכר',
          content: {
            emoji: '💡',
            question: 'שמת לב? זה בדיוק כמו חיבור!',
            text: 'כשהמכנה זהה - מחסרים רק את המונים!',
            highlight: 'המכנה נשאר אותו דבר',
            subtext: '5/8 - 2/8 = 3/8'
          }
        },
        {
          id: 'slide_sub_formula',
          type: 'visual',
          title: 'הנוסחה',
          content: {
            emoji: '📐',
            highlight: 'a/c - b/c = (a-b)/c',
            text: 'מחסרים את המונים, המכנה נשאר!',
            subtext: '7/9 - 4/9 = 3/9 | 5/6 - 2/6 = 3/6'
          },
          animation: 'bounce'
        },
        {
          id: 'slide_sub_examples',
          type: 'visual',
          title: 'דוגמאות',
          content: {
            emoji: '✏️',
            text: '4/5 - 1/5 = 3/5',
            highlight: '6/7 - 2/7 = 4/7',
            subtext: '9/10 - 3/10 = 6/10 | 7/8 - 5/8 = 2/8'
          }
        }
      ]
    },

    // ========================================
    // שלב 2: תרגול - חיסור מכנה זהה
    // ========================================
    {
      id: 'step_7_2_practice_same',
      type: 'practice',
      title: 'תרגול חיסור',
      practiceType: 'choice',
      questions: [
        {
          id: 'q_7_2_1',
          type: 'choice',
          difficulty: 2,
          question: '4/5 - 2/5 = ?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { fraction: { n: 2, d: 10 }, text: '2/10' },
              { fraction: { n: 2, d: 5 }, text: '2/5' },
              { fraction: { n: 6, d: 5 }, text: '6/5' },
              { fraction: { n: 1, d: 5 }, text: '1/5' }
            ]
          },
          hint: '4-2=?',
          explanation: '4-2=2, המכנה נשאר 5 → 2/5'
        },
        {
          id: 'q_7_2_2',
          type: 'choice',
          difficulty: 2,
          question: '7/8 - 3/8 = ?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { fraction: { n: 4, d: 8 }, text: '4/8' },
              { fraction: { n: 4, d: 16 }, text: '4/16' },
              { fraction: { n: 10, d: 8 }, text: '10/8' },
              { fraction: { n: 3, d: 8 }, text: '3/8' }
            ]
          },
          hint: '7-3=?',
          explanation: '7-3=4 → 4/8'
        },
        {
          id: 'q_7_2_3',
          type: 'choice',
          difficulty: 2,
          question: '5/6 - 1/6 = ?',
          answer: {
            type: 'choice',
            correctIndex: 2,
            options: [
              { fraction: { n: 6, d: 6 }, text: '6/6' },
              { fraction: { n: 4, d: 12 }, text: '4/12' },
              { fraction: { n: 4, d: 6 }, text: '4/6' },
              { fraction: { n: 5, d: 6 }, text: '5/6' }
            ]
          },
          hint: '5-1=?',
          explanation: '5-1=4 → 4/6'
        },
        {
          id: 'q_7_2_4',
          type: 'beaker',
          difficulty: 2,
          question: 'חשב: 5/8 - 2/8 = ?',
          narrative: 'מלא את השיקוי לתוצאה הנכונה',
          answer: {
            type: 'beaker',
            targetFill: { n: 3, d: 8 }
          },
          hint: '5-2=?',
          explanation: '5-2=3 → 3/8'
        }
      ],
      requiredCorrect: 3
    },

    // ========================================
    // שלב 3: למידה - חיסור עם צמצום
    // ========================================
    {
      id: 'step_7_3_reduce',
      type: 'learning',
      title: 'חיסור וצמצום',
      slides: [
        {
          id: 'slide_sub_reduce_intro',
          type: 'story',
          title: 'גם בחיסור!',
          content: {
            emoji: '✂️',
            text: '6/8 - 2/8 = 4/8',
            question: 'אבל אפשר לצמצם!',
            subtext: '4/8 = 1/2'
          }
        },
        {
          id: 'slide_sub_reduce_example',
          type: 'visual',
          title: 'דוגמה',
          content: {
            emoji: '📝',
            highlight: '5/6 - 2/6 = 3/6 = 1/2',
            text: 'חישבנו 5-2=3, וצמצמנו 3/6',
            subtext: 'תמיד כדאי לבדוק!'
          }
        },
        {
          id: 'slide_sub_reduce_more',
          type: 'visual',
          title: 'עוד דוגמאות',
          content: {
            emoji: '✏️',
            text: '4/4 - 2/4 = 2/4 = 1/2',
            highlight: '8/10 - 4/10 = 4/10 = 2/5',
            subtext: '6/9 - 3/9 = 3/9 = 1/3'
          }
        }
      ]
    },

    // ========================================
    // שלב 4: תרגול - חיסור וצמצום
    // ========================================
    {
      id: 'step_7_4_practice_reduce',
      type: 'practice',
      title: 'חסר וצמצם',
      practiceType: 'choice',
      questions: [
        {
          id: 'q_7_4_1',
          type: 'choice',
          difficulty: 3,
          question: '3/4 - 1/4 = ? (מצומצם)',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { fraction: { n: 1, d: 2 }, text: '1/2' },
              { fraction: { n: 2, d: 4 }, text: '2/4' },
              { fraction: { n: 1, d: 4 }, text: '1/4' }
            ]
          },
          hint: '3-1=2, ו-2/4 = ?',
          explanation: '2/4 = 1/2'
        },
        {
          id: 'q_7_4_2',
          type: 'choice',
          difficulty: 3,
          question: '5/6 - 2/6 = ? (מצומצם)',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { fraction: { n: 3, d: 6 }, text: '3/6' },
              { fraction: { n: 1, d: 2 }, text: '1/2' },
              { fraction: { n: 1, d: 3 }, text: '1/3' }
            ]
          },
          hint: '5-2=3, צמצם 3/6',
          explanation: '3/6 = 1/2'
        },
        {
          id: 'q_7_4_3',
          type: 'choice',
          difficulty: 3,
          question: '7/8 - 3/8 = ? (מצומצם)',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { fraction: { n: 1, d: 2 }, text: '1/2' },
              { fraction: { n: 4, d: 8 }, text: '4/8' },
              { fraction: { n: 2, d: 4 }, text: '2/4' }
            ]
          },
          hint: '7-3=4, צמצם 4/8',
          explanation: '4/8 = 1/2'
        }
      ],
      requiredCorrect: 2
    },

    // ========================================
    // שלב 5: למידה - מכנים שונים
    // ========================================
    {
      id: 'step_7_5_diff_denom',
      type: 'learning',
      title: 'מכנים שונים בחיסור',
      slides: [
        {
          id: 'slide_sub_diff_intro',
          type: 'story',
          title: 'אותו טריק!',
          content: {
            emoji: '🎯',
            text: 'מה עושים עם 3/4 - 1/2?',
            question: 'נזכר מה עשינו בחיבור?',
            subtext: 'הופכים לאותו מכנה!'
          }
        },
        {
          id: 'slide_sub_diff_solution',
          type: 'discovery',
          title: 'הפתרון',
          content: {
            emoji: '💡',
            text: '1/2 = 2/4',
            highlight: '3/4 - 2/4 = 1/4',
            subtext: 'המרנו חצי לשני רבעים!'
          }
        },
        {
          id: 'slide_sub_diff_example2',
          type: 'visual',
          title: 'דוגמה נוספת',
          content: {
            emoji: '✏️',
            text: '5/6 - 1/3 = ?',
            highlight: '1/3 = 2/6, אז: 5/6 - 2/6 = 3/6 = 1/2',
            subtext: 'שליש = שתי שישיות'
          }
        },
        {
          id: 'slide_sub_diff_steps',
          type: 'visual',
          title: 'השלבים',
          content: {
            emoji: '📋',
            text: '1. מצא מכנה משותף',
            highlight: '2. הרחב את השברים',
            subtext: '3. חסר את המונים'
          }
        }
      ]
    },

    // ========================================
    // שלב 6: תרגול - מכנים שונים
    // ========================================
    {
      id: 'step_7_6_practice_diff',
      type: 'practice',
      title: 'תרגול מכנים שונים',
      practiceType: 'choice',
      questions: [
        {
          id: 'q_7_6_1',
          type: 'choice',
          difficulty: 3,
          question: '3/4 - 1/2 = ?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { fraction: { n: 1, d: 4 }, text: '1/4' },
              { fraction: { n: 2, d: 4 }, text: '2/4' },
              { fraction: { n: 1, d: 2 }, text: '1/2' },
              { fraction: { n: 2, d: 2 }, text: '2/2' }
            ]
          },
          hint: '1/2 = 2/4',
          explanation: '3/4 - 2/4 = 1/4'
        },
        {
          id: 'q_7_6_2',
          type: 'choice',
          difficulty: 3,
          question: '1/2 - 1/4 = ?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { fraction: { n: 0, d: 4 }, text: '0' },
              { fraction: { n: 1, d: 4 }, text: '1/4' },
              { fraction: { n: 2, d: 4 }, text: '2/4' },
              { fraction: { n: 3, d: 4 }, text: '3/4' }
            ]
          },
          hint: '1/2 = 2/4',
          explanation: '2/4 - 1/4 = 1/4'
        },
        {
          id: 'q_7_6_3',
          type: 'choice',
          difficulty: 4,
          question: '2/3 - 1/6 = ?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { fraction: { n: 1, d: 2 }, text: '1/2' },
              { fraction: { n: 1, d: 6 }, text: '1/6' },
              { fraction: { n: 3, d: 6 }, text: '3/6' },
              { fraction: { n: 1, d: 3 }, text: '1/3' }
            ]
          },
          hint: '2/3 = 4/6',
          explanation: '4/6 - 1/6 = 3/6 = 1/2'
        }
      ],
      requiredCorrect: 2
    },

    // ========================================
    // שלב 7: תרגול - בעיות מילוליות
    // ========================================
    {
      id: 'step_7_7_word_problems',
      type: 'practice',
      title: 'בעיות מילוליות',
      practiceType: 'choice',
      questions: [
        {
          id: 'q_7_7_1',
          type: 'choice',
          difficulty: 3,
          question: 'דני אכל 3/8 מהעוגה. מיכל אכלה 2/8. כמה יותר אכל דני?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { fraction: { n: 5, d: 8 }, text: '5/8' },
              { fraction: { n: 1, d: 8 }, text: '1/8' },
              { fraction: { n: 2, d: 8 }, text: '2/8' },
              { fraction: { n: 1, d: 4 }, text: '1/4' }
            ]
          },
          hint: 'כמה יותר = חיסור!',
          explanation: '3/8 - 2/8 = 1/8'
        },
        {
          id: 'q_7_7_2',
          type: 'choice',
          difficulty: 3,
          question: 'היו 5/6 מהפיצה. אכלו 2/6. כמה נשאר?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { fraction: { n: 1, d: 2 }, text: '1/2' },
              { fraction: { n: 3, d: 6 }, text: '3/6' },
              { fraction: { n: 7, d: 6 }, text: '7/6' },
              { fraction: { n: 2, d: 6 }, text: '2/6' }
            ]
          },
          hint: '5-2=3, וצמצם',
          explanation: '5/6 - 2/6 = 3/6 = 1/2'
        }
      ],
      requiredCorrect: 2
    },

    // ========================================
    // שלב 8: מבחן שליטה
    // ========================================
    {
      id: 'step_7_8_mastery',
      type: 'mastery',
      title: 'בדיקת הבנה',
      questions: [
        {
          id: 'mastery_7_1',
          type: 'choice',
          difficulty: 2,
          question: '5/7 - 2/7 = ?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { fraction: { n: 3, d: 7 }, text: '3/7' },
              { fraction: { n: 3, d: 14 }, text: '3/14' },
              { fraction: { n: 7, d: 7 }, text: '7/7' }
            ]
          }
        },
        {
          id: 'mastery_7_2',
          type: 'choice',
          difficulty: 2,
          question: '6/8 - 2/8 = ?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { fraction: { n: 8, d: 8 }, text: '8/8' },
              { fraction: { n: 4, d: 8 }, text: '4/8' },
              { fraction: { n: 4, d: 16 }, text: '4/16' }
            ]
          }
        },
        {
          id: 'mastery_7_3',
          type: 'choice',
          difficulty: 3,
          question: '4/6 - 1/6 = ? (מצומצם)',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { fraction: { n: 3, d: 6 }, text: '3/6' },
              { fraction: { n: 1, d: 2 }, text: '1/2' },
              { fraction: { n: 1, d: 3 }, text: '1/3' }
            ]
          }
        },
        {
          id: 'mastery_7_4',
          type: 'choice',
          difficulty: 3,
          question: '3/4 - 1/2 = ?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { fraction: { n: 1, d: 4 }, text: '1/4' },
              { fraction: { n: 2, d: 4 }, text: '2/4' },
              { fraction: { n: 1, d: 2 }, text: '1/2' }
            ]
          }
        },
        {
          id: 'mastery_7_5',
          type: 'truefalse',
          difficulty: 2,
          question: '',
          answer: {
            type: 'truefalse',
            isTrue: true,
            statement: 'בחיסור שברים עם אותו מכנה, המכנה לא משתנה'
          }
        },
        {
          id: 'mastery_7_6',
          type: 'truefalse',
          difficulty: 3,
          question: '',
          answer: {
            type: 'truefalse',
            isTrue: true,
            statement: '1/2 - 1/4 = 1/4'
          }
        }
      ],
      passingScore: 80,
      onFail: 'review'
    }
  ],

  masterySkills: [
    'מחסר שברים עם אותו מכנה',
    'מצמצם תוצאות חיסור',
    'מחסר שברים פשוטים עם מכנים שונים',
    'פותר בעיות מילוליות עם חיסור'
  ]
};
