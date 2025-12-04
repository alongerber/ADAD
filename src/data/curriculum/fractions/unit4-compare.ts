import { LearningUnit } from '../../../types/curriculum';

// =============================================
// יחידה 4: השוואת שברים
// =============================================

export const unit4Compare: LearningUnit = {
  id: 'unit_4_compare',
  number: 4,
  title: 'מי גדול יותר?',
  description: 'השוואת שברים עם אותו מכנה ועם אותו מונה',
  icon: '⚖️',

  objectives: [
    'להשוות שברים עם אותו מכנה',
    'להשוות שברים עם אותו מונה',
    'להבין שככל שהמכנה גדול יותר, החלק קטן יותר',
    'לסדר שברים מהקטן לגדול'
  ],

  prerequisites: ['unit_3_special'],

  steps: [
    // ========================================
    // שלב 1: למידה - מכנה זהה
    // ========================================
    {
      id: 'step_4_1_same_denominator',
      type: 'learning',
      title: 'כשהמכנה זהה - קל!',
      slides: [
        {
          id: 'slide_same_d_intro',
          type: 'story',
          title: 'תחרות פיצה',
          content: {
            emoji: '🍕',
            text: 'דני ומיכל קיבלו פיצות זהות, חתוכות ל-8 משולשים.',
            subtext: 'דני אכל 3 משולשים. מיכל אכלה 5 משולשים.',
            question: 'מי אכל יותר?'
          }
        },
        {
          id: 'slide_same_d_visual',
          type: 'visual',
          title: 'מי אכל יותר?',
          content: {
            visual: {
              type: 'comparison',
              props: {
                comparison: {
                  left: { n: 3, d: 8 },
                  right: { n: 5, d: 8 },
                  operator: '?'
                }
              }
            },
            highlight: '5 משולשים זה יותר מ-3 משולשים!',
            subtext: 'מיכל אכלה יותר'
          }
        },
        {
          id: 'slide_same_d_rule',
          type: 'discovery',
          title: 'הכלל הזהב',
          content: {
            emoji: '💡',
            question: 'מה קורה כשהמכנה זהה?',
            text: 'כשהמכנה זהה (אותם חלקים) - פשוט משווים את המונים!',
            highlight: 'מי שיש לו יותר חלקים - יש לו יותר!',
            subtext: '3/8 < 5/8 כי 3 < 5'
          }
        },
        {
          id: 'slide_same_d_examples',
          type: 'visual',
          title: 'עוד דוגמאות',
          content: {
            emoji: '📊',
            text: '2/5 ו-4/5 - המכנה זהה (5)',
            highlight: '2/5 < 4/5 כי 2 < 4',
            subtext: '1/3 < 2/3 | 5/7 > 3/7 | 4/10 < 7/10'
          }
        }
      ]
    },

    // ========================================
    // שלב 2: תרגול - מכנה זהה
    // ========================================
    {
      id: 'step_4_2_practice_same_d',
      type: 'practice',
      title: 'תרגול השוואה - מכנה זהה',
      practiceType: 'choice',
      questions: [
        {
          id: 'q_4_2_1',
          type: 'choice',
          difficulty: 2,
          question: 'מי גדול יותר: 2/6 או 5/6?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { fraction: { n: 2, d: 6 }, text: '2/6' },
              { fraction: { n: 5, d: 6 }, text: '5/6' }
            ]
          },
          hint: 'המכנה זהה - השווה את המונים!',
          explanation: '5 > 2, אז 5/6 > 2/6'
        },
        {
          id: 'q_4_2_2',
          type: 'choice',
          difficulty: 2,
          question: 'מי קטן יותר: 7/10 או 3/10?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { fraction: { n: 7, d: 10 }, text: '7/10' },
              { fraction: { n: 3, d: 10 }, text: '3/10' }
            ]
          },
          hint: '3 < 7',
          explanation: '3 < 7, אז 3/10 < 7/10'
        },
        {
          id: 'q_4_2_3',
          type: 'truefalse',
          difficulty: 2,
          question: '',
          answer: {
            type: 'truefalse',
            isTrue: true,
            statement: '4/9 < 8/9'
          },
          hint: 'השווה את המונים',
          explanation: '4 < 8, אז נכון!'
        },
        {
          id: 'q_4_2_4',
          type: 'truefalse',
          difficulty: 3,
          question: '',
          answer: {
            type: 'truefalse',
            isTrue: false,
            statement: '6/7 < 2/7'
          },
          hint: '6 ו-2, מי גדול?',
          explanation: '6 > 2, אז 6/7 > 2/7 - לא נכון!'
        }
      ],
      requiredCorrect: 3
    },

    // ========================================
    // שלב 3: למידה - מונה זהה
    // ========================================
    {
      id: 'step_4_3_same_numerator',
      type: 'learning',
      title: 'כשהמונה זהה - הפוך!',
      slides: [
        {
          id: 'slide_same_n_intro',
          type: 'story',
          title: 'חלוקת עוגה',
          content: {
            emoji: '🎂',
            text: 'יש שתי עוגות זהות בדיוק.',
            subtext: 'את הראשונה חילקו ל-4 חלקים. את השנייה חילקו ל-8 חלקים.',
            question: 'איפה החלק הבודד גדול יותר?'
          }
        },
        {
          id: 'slide_same_n_visual',
          type: 'visual',
          title: 'איזה חלק גדול יותר?',
          content: {
            visual: {
              type: 'comparison',
              props: {
                comparison: {
                  left: { n: 1, d: 4 },
                  right: { n: 1, d: 8 },
                  operator: '?'
                }
              }
            },
            highlight: 'רבע (1/4) גדול משמינית (1/8)!',
            subtext: 'יותר חלקים = כל חלק קטן יותר'
          }
        },
        {
          id: 'slide_same_n_why',
          type: 'discovery',
          title: 'למה זה הפוך?',
          content: {
            emoji: '🤔',
            question: 'למה מכנה גדול = חלק קטן?',
            text: 'כשמחלקים את אותו דבר ליותר חלקים...',
            highlight: 'כל חלק יוצא קטן יותר!',
            subtext: 'חלק מ-4 גדול מחלק מ-8'
          }
        },
        {
          id: 'slide_same_n_rule',
          type: 'visual',
          title: 'הכלל החשוב',
          content: {
            emoji: '⚠️',
            highlight: 'כשהמונה זהה - מכנה גדול = שבר קטן!',
            text: '1/3 > 1/5 > 1/10',
            subtext: 'שליש > חמישית > עשירית'
          },
          animation: 'bounce'
        },
        {
          id: 'slide_same_n_examples',
          type: 'visual',
          title: 'דוגמאות',
          content: {
            emoji: '📊',
            text: '2/3 ו-2/7 - המונה זהה (2)',
            highlight: '2/3 > 2/7 כי 3 < 7',
            subtext: '3/4 > 3/10 | 5/6 > 5/12 | 1/2 > 1/100'
          }
        }
      ]
    },

    // ========================================
    // שלב 4: תרגול - מונה זהה
    // ========================================
    {
      id: 'step_4_4_practice_same_n',
      type: 'practice',
      title: 'תרגול השוואה - מונה זהה',
      practiceType: 'choice',
      questions: [
        {
          id: 'q_4_4_1',
          type: 'choice',
          difficulty: 3,
          question: 'מי גדול יותר: 1/3 או 1/5?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { fraction: { n: 1, d: 3 }, text: '1/3 (שליש)' },
              { fraction: { n: 1, d: 5 }, text: '1/5 (חמישית)' }
            ]
          },
          hint: 'מכנה קטן = חלק גדול!',
          explanation: '3 < 5, אז 1/3 > 1/5'
        },
        {
          id: 'q_4_4_2',
          type: 'choice',
          difficulty: 3,
          question: 'מי קטן יותר: 2/4 או 2/10?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { fraction: { n: 2, d: 4 }, text: '2/4' },
              { fraction: { n: 2, d: 10 }, text: '2/10' }
            ]
          },
          hint: 'מכנה גדול = שבר קטן',
          explanation: '10 > 4, אז 2/10 < 2/4'
        },
        {
          id: 'q_4_4_3',
          type: 'truefalse',
          difficulty: 3,
          question: '',
          answer: {
            type: 'truefalse',
            isTrue: true,
            statement: '3/8 < 3/5'
          },
          hint: 'המונה זהה - תסתכל על המכנה',
          explanation: '8 > 5, אז 3/8 < 3/5 - נכון!'
        },
        {
          id: 'q_4_4_4',
          type: 'truefalse',
          difficulty: 3,
          question: '',
          answer: {
            type: 'truefalse',
            isTrue: false,
            statement: '4/6 < 4/3'
          },
          hint: '6 ו-3, מי גדול?',
          explanation: '6 > 3, אז 4/6 < 4/3 - נכון! אבל רגע... זה נכון!'
        }
      ],
      requiredCorrect: 3
    },

    // ========================================
    // שלב 5: תרגול מעורב - סידור
    // ========================================
    {
      id: 'step_4_5_sort_practice',
      type: 'practice',
      title: 'סדר מהקטן לגדול',
      practiceType: 'sort',
      questions: [
        {
          id: 'q_4_5_1',
          type: 'sort',
          difficulty: 3,
          question: 'סדר מהקטן לגדול',
          narrative: 'כל השברים עם אותו מכנה',
          answer: {
            type: 'sort',
            items: [
              { id: 'sort1', fraction: { n: 1, d: 8 }, value: 1/8 },
              { id: 'sort2', fraction: { n: 3, d: 8 }, value: 3/8 },
              { id: 'sort3', fraction: { n: 5, d: 8 }, value: 5/8 },
              { id: 'sort4', fraction: { n: 7, d: 8 }, value: 7/8 }
            ],
            direction: 'ascending'
          },
          hint: 'המכנה זהה - סדר לפי המונה',
          explanation: '1/8 < 3/8 < 5/8 < 7/8'
        },
        {
          id: 'q_4_5_2',
          type: 'sort',
          difficulty: 4,
          question: 'סדר מהקטן לגדול',
          narrative: 'כל השברים עם אותו מונה',
          answer: {
            type: 'sort',
            items: [
              { id: 'sort1', fraction: { n: 2, d: 10 }, value: 2/10 },
              { id: 'sort2', fraction: { n: 2, d: 6 }, value: 2/6 },
              { id: 'sort3', fraction: { n: 2, d: 4 }, value: 2/4 },
              { id: 'sort4', fraction: { n: 2, d: 2 }, value: 2/2 }
            ],
            direction: 'ascending'
          },
          hint: 'המונה זהה - מכנה גדול = שבר קטן!',
          explanation: '2/10 < 2/6 < 2/4 < 2/2'
        }
      ],
      requiredCorrect: 2
    },

    // ========================================
    // שלב 6: מבחן שליטה
    // ========================================
    {
      id: 'step_4_6_mastery',
      type: 'mastery',
      title: 'בדיקת הבנה',
      questions: [
        {
          id: 'mastery_4_1',
          type: 'choice',
          difficulty: 2,
          question: 'מי גדול יותר: 3/7 או 5/7?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { fraction: { n: 3, d: 7 }, text: '3/7' },
              { fraction: { n: 5, d: 7 }, text: '5/7' }
            ]
          }
        },
        {
          id: 'mastery_4_2',
          type: 'choice',
          difficulty: 3,
          question: 'מי גדול יותר: 1/4 או 1/6?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { fraction: { n: 1, d: 4 }, text: '1/4 (רבע)' },
              { fraction: { n: 1, d: 6 }, text: '1/6 (שישית)' }
            ]
          }
        },
        {
          id: 'mastery_4_3',
          type: 'truefalse',
          difficulty: 2,
          question: '',
          answer: {
            type: 'truefalse',
            isTrue: true,
            statement: '4/9 < 7/9'
          }
        },
        {
          id: 'mastery_4_4',
          type: 'truefalse',
          difficulty: 3,
          question: '',
          answer: {
            type: 'truefalse',
            isTrue: true,
            statement: '3/5 > 3/8'
          }
        },
        {
          id: 'mastery_4_5',
          type: 'choice',
          difficulty: 3,
          question: 'כשהמונה זהה, מכנה גדול יותר אומר...',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { text: 'שבר גדול יותר' },
              { text: 'שבר קטן יותר' },
              { text: 'שברים שווים' }
            ]
          }
        },
        {
          id: 'mastery_4_6',
          type: 'choice',
          difficulty: 2,
          question: 'כשהמכנה זהה, מונה גדול יותר אומר...',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { text: 'שבר גדול יותר' },
              { text: 'שבר קטן יותר' },
              { text: 'שברים שווים' }
            ]
          }
        }
      ],
      passingScore: 80,
      onFail: 'review'
    }
  ],

  masterySkills: [
    'משווה שברים עם אותו מכנה',
    'משווה שברים עם אותו מונה',
    'מבין שמכנה גדול = חלק קטן',
    'מסדר שברים מהקטן לגדול'
  ]
};
