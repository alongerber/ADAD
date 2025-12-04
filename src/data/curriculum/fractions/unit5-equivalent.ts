import { LearningUnit } from '../../../types/curriculum';

// =============================================
// יחידה 5: שברים שווים (שקילות)
// =============================================

export const unit5Equivalent: LearningUnit = {
  id: 'unit_5_equivalent',
  number: 5,
  title: 'שברים שווים',
  description: 'לזהות וליצור שברים שווים בערכם',
  icon: '🟰',

  objectives: [
    'להבין ששברים שונים יכולים להיות שווים',
    'למצוא שברים שווים על ידי הכפלה',
    'למצוא שברים שווים על ידי חילוק (צמצום)',
    'לזהות שברים שווים מתוך קבוצה'
  ],

  prerequisites: ['unit_4_compare'],

  steps: [
    // ========================================
    // שלב 1: למידה - גילוי שברים שווים
    // ========================================
    {
      id: 'step_5_1_discover',
      type: 'learning',
      title: 'שברים שנראים שונים אבל שווים!',
      slides: [
        {
          id: 'slide_equiv_intro',
          type: 'story',
          title: 'תעלומת הפיצות',
          content: {
            emoji: '🔍',
            text: 'דני ומיכל הזמינו פיצות זהות בגודלן.',
            subtext: 'הפיצה של דני חתוכה ל-2, הוא אכל 1. הפיצה של מיכל חתוכה ל-4, היא אכלה 2.',
            question: 'מי אכל יותר?'
          }
        },
        {
          id: 'slide_equiv_visual',
          type: 'visual',
          title: 'בואו נראה',
          content: {
            visual: {
              type: 'comparison',
              props: {
                comparison: {
                  left: { n: 1, d: 2 },
                  right: { n: 2, d: 4 },
                  operator: '='
                }
              }
            },
            highlight: 'הם אכלו בדיוק אותו דבר!',
            subtext: '1/2 = 2/4 (חצי = שני רבעים)'
          }
        },
        {
          id: 'slide_equiv_discovery',
          type: 'discovery',
          title: 'תגלית!',
          content: {
            emoji: '💡',
            question: 'איך יכול להיות ששברים שונים שווים?',
            text: 'כששני שברים מייצגים את אותה כמות - הם שווים!',
            highlight: 'נראים שונה, שווים בערך!',
            subtext: 'חצי = 2 רבעים = 4 שמיניות'
          }
        },
        {
          id: 'slide_equiv_examples',
          type: 'visual',
          title: 'דוגמאות לשברים שווים',
          content: {
            emoji: '🎯',
            highlight: '1/2 = 2/4 = 3/6 = 4/8 = 5/10',
            text: 'כולם שווים לחצי!',
            subtext: '1/3 = 2/6 = 3/9 | 1/4 = 2/8 | 2/3 = 4/6'
          }
        }
      ]
    },

    // ========================================
    // שלב 2: תרגול - זיהוי שברים שווים
    // ========================================
    {
      id: 'step_5_2_identify',
      type: 'practice',
      title: 'זהה שברים שווים',
      practiceType: 'choice',
      questions: [
        {
          id: 'q_5_2_1',
          type: 'choice',
          difficulty: 2,
          question: 'איזה שבר שווה ל-1/2?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { fraction: { n: 1, d: 4 }, text: '1/4' },
              { fraction: { n: 2, d: 4 }, text: '2/4' },
              { fraction: { n: 3, d: 4 }, text: '3/4' }
            ]
          },
          hint: 'חצי = חצי מהחלקים',
          explanation: '2/4 = 1/2 (שני רבעים = חצי)'
        },
        {
          id: 'q_5_2_2',
          type: 'choice',
          difficulty: 2,
          question: 'איזה שבר שווה ל-1/3?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { fraction: { n: 2, d: 6 }, text: '2/6' },
              { fraction: { n: 2, d: 3 }, text: '2/3' },
              { fraction: { n: 1, d: 6 }, text: '1/6' }
            ]
          },
          hint: 'שליש = כמה שישיות?',
          explanation: '2/6 = 1/3'
        },
        {
          id: 'q_5_2_3',
          type: 'truefalse',
          difficulty: 2,
          question: '',
          answer: {
            type: 'truefalse',
            isTrue: true,
            statement: '3/6 = 1/2'
          },
          hint: 'כמה זה 3 מתוך 6?',
          explanation: '3/6 = חצי = 1/2 - נכון!'
        },
        {
          id: 'q_5_2_4',
          type: 'truefalse',
          difficulty: 3,
          question: '',
          answer: {
            type: 'truefalse',
            isTrue: false,
            statement: '2/5 = 4/8'
          },
          hint: '4/8 = חצי. האם 2/5 = חצי?',
          explanation: '4/8 = 1/2, אבל 2/5 לא שווה לחצי - לא נכון!'
        }
      ],
      requiredCorrect: 3
    },

    // ========================================
    // שלב 3: למידה - הכפלה (הרחבה)
    // ========================================
    {
      id: 'step_5_3_multiply',
      type: 'learning',
      title: 'הטריק להרחבת שברים',
      slides: [
        {
          id: 'slide_mult_intro',
          type: 'story',
          title: 'הכלל הסודי',
          content: {
            emoji: '🔮',
            text: 'רוצה ליצור שבר שווה?',
            question: 'יש טריק קסום!',
            subtext: 'מכפילים את המונה ואת המכנה באותו מספר!'
          }
        },
        {
          id: 'slide_mult_demo',
          type: 'visual',
          title: 'איך זה עובד?',
          content: {
            emoji: '✖️',
            highlight: '1/2 × 2/2 = 2/4',
            text: 'הכפלנו גם 1 וגם 2 ב-2',
            subtext: '1×2=2, 2×2=4 → 2/4'
          }
        },
        {
          id: 'slide_mult_why',
          type: 'discovery',
          title: 'למה זה עובד?',
          content: {
            emoji: '🤔',
            question: 'למה אפשר להכפיל ב-2/2?',
            text: '2/2 = 1 (שלם). כפל ב-1 לא משנה את הערך!',
            highlight: '3/3 = 4/4 = 5/5 = 1',
            subtext: 'אז אנחנו פשוט כופלים ב-1'
          }
        },
        {
          id: 'slide_mult_practice',
          type: 'visual',
          title: 'עוד דוגמאות',
          content: {
            emoji: '📝',
            text: '1/3 × 2/2 = 2/6',
            highlight: '2/5 × 3/3 = 6/15',
            subtext: '3/4 × 2/2 = 6/8 | 1/4 × 4/4 = 4/16'
          }
        }
      ]
    },

    // ========================================
    // שלב 4: תרגול - יצירת שברים שווים
    // ========================================
    {
      id: 'step_5_4_create',
      type: 'practice',
      title: 'צור שברים שווים',
      practiceType: 'choice',
      questions: [
        {
          id: 'q_5_4_1',
          type: 'choice',
          difficulty: 3,
          question: '1/4 × 2/2 = ?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { fraction: { n: 1, d: 8 }, text: '1/8' },
              { fraction: { n: 2, d: 8 }, text: '2/8' },
              { fraction: { n: 3, d: 8 }, text: '3/8' },
              { fraction: { n: 2, d: 4 }, text: '2/4' }
            ]
          },
          hint: '1×2=? 4×2=?',
          explanation: '1×2=2, 4×2=8 → 2/8'
        },
        {
          id: 'q_5_4_2',
          type: 'choice',
          difficulty: 3,
          question: '2/3 × 3/3 = ?',
          answer: {
            type: 'choice',
            correctIndex: 2,
            options: [
              { fraction: { n: 2, d: 9 }, text: '2/9' },
              { fraction: { n: 5, d: 9 }, text: '5/9' },
              { fraction: { n: 6, d: 9 }, text: '6/9' },
              { fraction: { n: 6, d: 6 }, text: '6/6' }
            ]
          },
          hint: '2×3=? 3×3=?',
          explanation: '2×3=6, 3×3=9 → 6/9'
        },
        {
          id: 'q_5_4_3',
          type: 'choice',
          difficulty: 3,
          question: 'מצא שבר שווה ל-3/5 עם מכנה 10',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { fraction: { n: 6, d: 10 }, text: '6/10' },
              { fraction: { n: 3, d: 10 }, text: '3/10' },
              { fraction: { n: 5, d: 10 }, text: '5/10' },
              { fraction: { n: 8, d: 10 }, text: '8/10' }
            ]
          },
          hint: '5×2=10, אז גם 3×2=?',
          explanation: '3/5 × 2/2 = 6/10'
        }
      ],
      requiredCorrect: 2
    },

    // ========================================
    // שלב 5: למידה - צמצום
    // ========================================
    {
      id: 'step_5_5_reduce',
      type: 'learning',
      title: 'צמצום שברים',
      slides: [
        {
          id: 'slide_reduce_intro',
          type: 'story',
          title: 'ההפך מהרחבה',
          content: {
            emoji: '➗',
            text: 'לפעמים שבר נראה מסובך, אבל אפשר לפשט אותו!',
            question: 'איך?',
            subtext: 'מחלקים את המונה והמכנה באותו מספר!'
          }
        },
        {
          id: 'slide_reduce_demo',
          type: 'visual',
          title: 'דוגמה',
          content: {
            emoji: '✂️',
            highlight: '4/8 ÷ 4/4 = 1/2',
            text: 'חילקנו גם 4 וגם 8 ב-4',
            subtext: '4÷4=1, 8÷4=2 → 1/2'
          }
        },
        {
          id: 'slide_reduce_find',
          type: 'discovery',
          title: 'איך מוצאים במה לחלק?',
          content: {
            emoji: '🔎',
            question: 'מחפשים מספר שמחלק את שניהם!',
            text: '6/9 - גם 6 וגם 9 מתחלקים ב-3',
            highlight: '6÷3=2, 9÷3=3 → 2/3',
            subtext: '6/9 = 2/3'
          }
        },
        {
          id: 'slide_reduce_examples',
          type: 'visual',
          title: 'תרגול מהיר',
          content: {
            emoji: '📝',
            text: '2/4 ÷ 2 = 1/2',
            highlight: '6/8 ÷ 2 = 3/4',
            subtext: '9/12 ÷ 3 = 3/4 | 10/15 ÷ 5 = 2/3'
          }
        }
      ]
    },

    // ========================================
    // שלב 6: תרגול - התאמת שברים שווים
    // ========================================
    {
      id: 'step_5_6_match',
      type: 'practice',
      title: 'התאם שברים שווים',
      practiceType: 'match',
      questions: [
        {
          id: 'q_5_6_1',
          type: 'match',
          difficulty: 3,
          question: 'חבר בין שברים שווים',
          answer: {
            type: 'match',
            pairs: [
              {
                left: { n: 1, d: 2 },
                right: { n: 3, d: 6 }
              },
              {
                left: { n: 1, d: 3 },
                right: { n: 2, d: 6 }
              },
              {
                left: { n: 2, d: 3 },
                right: { n: 4, d: 6 }
              }
            ]
          },
          hint: 'צמצם או הרחב כדי למצוא התאמה',
          explanation: '1/2=3/6, 1/3=2/6, 2/3=4/6'
        }
      ],
      requiredCorrect: 1
    },

    // ========================================
    // שלב 7: מבחן שליטה
    // ========================================
    {
      id: 'step_5_7_mastery',
      type: 'mastery',
      title: 'בדיקת הבנה',
      questions: [
        {
          id: 'mastery_5_1',
          type: 'choice',
          difficulty: 2,
          question: 'איזה שבר שווה ל-1/2?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { fraction: { n: 1, d: 4 }, text: '1/4' },
              { fraction: { n: 3, d: 6 }, text: '3/6' },
              { fraction: { n: 2, d: 3 }, text: '2/3' }
            ]
          }
        },
        {
          id: 'mastery_5_2',
          type: 'choice',
          difficulty: 3,
          question: '2/4 × 2/2 = ?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { fraction: { n: 4, d: 8 }, text: '4/8' },
              { fraction: { n: 2, d: 8 }, text: '2/8' },
              { fraction: { n: 4, d: 4 }, text: '4/4' }
            ]
          }
        },
        {
          id: 'mastery_5_3',
          type: 'choice',
          difficulty: 3,
          question: 'צמצם: 6/8 = ?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { fraction: { n: 2, d: 4 }, text: '2/4' },
              { fraction: { n: 3, d: 4 }, text: '3/4' },
              { fraction: { n: 1, d: 2 }, text: '1/2' }
            ]
          }
        },
        {
          id: 'mastery_5_4',
          type: 'truefalse',
          difficulty: 2,
          question: '',
          answer: {
            type: 'truefalse',
            isTrue: true,
            statement: '2/6 = 1/3'
          }
        },
        {
          id: 'mastery_5_5',
          type: 'truefalse',
          difficulty: 3,
          question: '',
          answer: {
            type: 'truefalse',
            isTrue: false,
            statement: '3/5 = 6/8'
          }
        },
        {
          id: 'mastery_5_6',
          type: 'choice',
          difficulty: 3,
          question: 'מצא שבר שווה ל-1/4 עם מכנה 12',
          answer: {
            type: 'choice',
            correctIndex: 2,
            options: [
              { fraction: { n: 1, d: 12 }, text: '1/12' },
              { fraction: { n: 2, d: 12 }, text: '2/12' },
              { fraction: { n: 3, d: 12 }, text: '3/12' },
              { fraction: { n: 4, d: 12 }, text: '4/12' }
            ]
          }
        }
      ],
      passingScore: 80,
      onFail: 'review'
    }
  ],

  masterySkills: [
    'מזהה שברים שווים',
    'יוצר שברים שווים על ידי הכפלה',
    'מצמצם שברים',
    'מבין ש-2/2, 3/3 וכו׳ שווים ל-1'
  ]
};
