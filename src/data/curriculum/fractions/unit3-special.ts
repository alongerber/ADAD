import { LearningUnit } from '../../../types/curriculum';

// =============================================
// יחידה 3: שברים מיוחדים - חצי, רבע, שלושה רבעים
// =============================================

export const unit3Special: LearningUnit = {
  id: 'unit_3_special',
  number: 3,
  title: 'חצי, רבע, שלושה רבעים',
  description: 'שליטה מלאה בשברים הנפוצים ביותר',
  icon: '½',

  objectives: [
    'לזהות חצי בכל מצב',
    'לזהות רבע ולהבין שהוא קטן מחצי',
    'לזהות שלושה רבעים ולהבין שהוא גדול מחצי',
    'לחשב חצי ממספר'
  ],

  prerequisites: ['unit_2_basics'],

  steps: [
    // ========================================
    // שלב 1: למידה - חצי
    // ========================================
    {
      id: 'step_3_1_learn_half',
      type: 'learning',
      title: 'חצי - השבר הכי חשוב',
      slides: [
        {
          id: 'slide_half_intro',
          type: 'story',
          title: 'חצי בכל מקום',
          content: {
            emoji: '½',
            text: 'חצי זה השבר הכי נפוץ בחיים!',
            subtext: 'חצי שעה, חצי כוס, חצי מהכסף...',
            highlight: 'בואו נבין אותו לעומק'
          }
        },
        {
          id: 'slide_half_visual',
          type: 'visual',
          title: 'מה זה חצי?',
          content: {
            visual: {
              type: 'pizza',
              props: { slices: 2, filled: 1, showLabels: true }
            },
            highlight: 'חצי = חילקנו ל-2 חלקים שווים ולקחנו 1',
            subtext: '1/2 = אחד מתוך שניים'
          }
        },
        {
          id: 'slide_half_examples',
          type: 'discovery',
          title: 'חצי מכל דבר',
          content: {
            emoji: '🤔',
            question: 'מה זה חצי מ-10 עוגיות?',
            text: 'אם יש 10 עוגיות ומחלקים ל-2...',
            subtext: 'כל חצי = 5 עוגיות!'
          },
          delay: 500
        },
        {
          id: 'slide_half_calculate',
          type: 'visual',
          title: 'איך מחשבים חצי?',
          content: {
            emoji: '💡',
            highlight: 'חצי = לחלק ב-2',
            text: 'חצי מ-10 = 10 ÷ 2 = 5',
            subtext: 'חצי מ-8 = 8 ÷ 2 = 4 | חצי מ-6 = 6 ÷ 2 = 3'
          }
        }
      ]
    },

    // ========================================
    // שלב 2: תרגול - חצי (בחירה + הקשות)
    // ========================================
    {
      id: 'step_3_2_practice_half',
      type: 'practice',
      title: 'תרגול חצי',
      practiceType: 'choice',
      questions: [
        {
          id: 'q_3_2_1',
          type: 'choice',
          difficulty: 2,
          question: 'חצי מ-8 זה...',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { text: '2' },
              { text: '4' },
              { text: '6' },
              { text: '8' }
            ]
          },
          hint: '8 ÷ 2 = ?',
          explanation: '8 ÷ 2 = 4'
        },
        {
          id: 'q_3_2_2',
          type: 'choice',
          difficulty: 2,
          question: 'חצי מ-6 זה...',
          answer: {
            type: 'choice',
            correctIndex: 2,
            options: [
              { text: '2' },
              { text: '4' },
              { text: '3' },
              { text: '1' }
            ]
          },
          hint: '6 ÷ 2 = ?',
          explanation: '6 ÷ 2 = 3'
        },
        {
          id: 'q_3_2_3',
          type: 'choice',
          difficulty: 3,
          question: 'איזו תמונה מראה חצי?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { visual: { type: 'pizza', props: { slices: 4, filled: 1 } } },
              { visual: { type: 'pizza', props: { slices: 4, filled: 2 } } },
              { visual: { type: 'pizza', props: { slices: 4, filled: 3 } } },
              { visual: { type: 'pizza', props: { slices: 4, filled: 4 } } }
            ]
          },
          hint: 'חצי = חצי מהחלקים מלאים',
          explanation: '2 מתוך 4 = חצי!'
        }
      ],
      requiredCorrect: 2
    },

    // ========================================
    // שלב 3: למידה - רבע
    // ========================================
    {
      id: 'step_3_3_learn_quarter',
      type: 'learning',
      title: 'רבע - קטן מחצי',
      slides: [
        {
          id: 'slide_quarter_intro',
          type: 'story',
          title: 'הכירו: רבע',
          content: {
            emoji: '¼',
            text: 'פיצה חתוכה ל-4 משולשים.',
            question: 'כמה זה משולש אחד?',
            subtext: 'זה רבע!'
          }
        },
        {
          id: 'slide_quarter_visual',
          type: 'visual',
          title: 'מה זה רבע?',
          content: {
            visual: {
              type: 'pizza',
              props: { slices: 4, filled: 1, showLabels: true }
            },
            highlight: 'רבע = חילקנו ל-4 חלקים ולקחנו 1',
            subtext: '1/4 = אחד מתוך ארבעה'
          }
        },
        {
          id: 'slide_quarter_vs_half',
          type: 'discovery',
          title: 'רבע מול חצי',
          content: {
            emoji: '🤔',
            question: 'מי גדול יותר: רבע או חצי?',
            visual: {
              type: 'comparison',
              props: {
                comparison: {
                  left: { n: 1, d: 2 },
                  right: { n: 1, d: 4 },
                  operator: '?'
                }
              }
            },
            subtext: 'תסתכל על התמונות...'
          }
        },
        {
          id: 'slide_quarter_smaller',
          type: 'visual',
          title: 'רבע קטן מחצי!',
          content: {
            emoji: '💡',
            highlight: 'ככל שמחלקים ליותר חלקים - כל חלק קטן יותר!',
            text: 'חילקנו ל-4 במקום ל-2, אז כל חלק קטן יותר.',
            subtext: '½ > ¼'
          },
          animation: 'bounce'
        }
      ]
    },

    // ========================================
    // שלב 4: תרגול - רבע (הקשות)
    // ========================================
    {
      id: 'step_3_4_practice_quarter',
      type: 'practice',
      title: 'תרגול רבע',
      practiceType: 'tap',
      questions: [
        {
          id: 'q_3_4_1',
          type: 'tap',
          difficulty: 2,
          question: 'הקש על רבע מהפיצה',
          narrative: 'רבע = חלק אחד מתוך 4',
          answer: {
            type: 'tap',
            targetCount: 1,
            totalParts: 4
          },
          hint: 'רבע = חלק 1',
          explanation: 'חלק 1 מתוך 4 = רבע = 1/4'
        },
        {
          id: 'q_3_4_2',
          type: 'tap',
          difficulty: 2,
          question: 'הקש על 2 רבעים',
          narrative: 'שני רבעים = חצי!',
          answer: {
            type: 'tap',
            targetCount: 2,
            totalParts: 4
          },
          hint: '2 חלקים מתוך 4',
          explanation: '2 רבעים = 2/4 = חצי!'
        }
      ],
      requiredCorrect: 2
    },

    // ========================================
    // שלב 5: למידה - שלושה רבעים
    // ========================================
    {
      id: 'step_3_5_learn_three_quarters',
      type: 'learning',
      title: 'שלושה רבעים',
      slides: [
        {
          id: 'slide_3q_intro',
          type: 'story',
          title: 'כמעט שלם!',
          content: {
            emoji: '¾',
            text: 'יש פיצה עם 4 משולשים.',
            question: 'אם אכלת 3 - כמה זה?',
            subtext: 'זה שלושה רבעים!'
          }
        },
        {
          id: 'slide_3q_visual',
          type: 'visual',
          title: 'שלושה רבעים',
          content: {
            visual: {
              type: 'pizza',
              props: { slices: 4, filled: 3, showLabels: true }
            },
            highlight: '3/4 = שלושה רבעים = 3 מתוך 4',
            subtext: 'כמעט שלם - חסר רק רבע אחד!'
          }
        },
        {
          id: 'slide_3q_comparison',
          type: 'discovery',
          title: 'גדול מחצי!',
          content: {
            emoji: '💡',
            question: 'שלושה רבעים גדול או קטן מחצי?',
            text: 'חצי = 2 רבעים. שלושה רבעים = 3 רבעים.',
            highlight: '3 > 2, אז ¾ > ½',
            subtext: 'שלושה רבעים גדול מחצי!'
          }
        }
      ]
    },

    // ========================================
    // שלב 6: תרגול מעורב (התאמה)
    // ========================================
    {
      id: 'step_3_6_practice_match',
      type: 'practice',
      title: 'התאמת שברים',
      practiceType: 'match',
      questions: [
        {
          id: 'q_3_6_1',
          type: 'match',
          difficulty: 3,
          question: 'התאם כל שבר לתמונה שלו',
          answer: {
            type: 'match',
            pairs: [
              {
                left: { n: 1, d: 2 },
                right: { type: 'pizza', props: { slices: 4, filled: 2 } }
              },
              {
                left: { n: 1, d: 4 },
                right: { type: 'pizza', props: { slices: 4, filled: 1 } }
              },
              {
                left: { n: 3, d: 4 },
                right: { type: 'pizza', props: { slices: 4, filled: 3 } }
              }
            ]
          },
          hint: 'ספור את החלקים הצבועים',
          explanation: 'חצי=2/4, רבע=1/4, שלושה רבעים=3/4'
        }
      ],
      requiredCorrect: 1
    },

    // ========================================
    // שלב 7: מבחן שליטה
    // ========================================
    {
      id: 'step_3_7_mastery',
      type: 'mastery',
      title: 'בדיקת הבנה',
      questions: [
        {
          id: 'mastery_3_1',
          type: 'choice',
          difficulty: 2,
          question: 'חצי מ-10 זה...',
          answer: {
            type: 'choice',
            correctIndex: 2,
            options: [
              { text: '2' },
              { text: '3' },
              { text: '5' },
              { text: '10' }
            ]
          }
        },
        {
          id: 'mastery_3_2',
          type: 'truefalse',
          difficulty: 2,
          question: '',
          answer: {
            type: 'truefalse',
            isTrue: true,
            statement: 'רבע קטן מחצי'
          }
        },
        {
          id: 'mastery_3_3',
          type: 'truefalse',
          difficulty: 2,
          question: '',
          answer: {
            type: 'truefalse',
            isTrue: true,
            statement: 'שלושה רבעים גדול מחצי'
          }
        },
        {
          id: 'mastery_3_4',
          type: 'choice',
          difficulty: 3,
          question: 'מה גדול יותר?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { fraction: { n: 1, d: 4 }, text: 'רבע' },
              { fraction: { n: 3, d: 4 }, text: 'שלושה רבעים' }
            ]
          }
        },
        {
          id: 'mastery_3_5',
          type: 'choice',
          difficulty: 3,
          question: '2 רבעים שווה ל...',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { text: 'חצי' },
              { text: 'רבע' },
              { text: 'שלושה רבעים' },
              { text: 'שלם' }
            ]
          }
        }
      ],
      passingScore: 80,
      onFail: 'review'
    }
  ],

  masterySkills: [
    'מזהה חצי בכל מצב',
    'מחשב חצי ממספר',
    'יודע שרבע קטן מחצי',
    'יודע שתלושה רבעים גדול מחצי',
    'יודע ש-2 רבעים = חצי'
  ]
};
