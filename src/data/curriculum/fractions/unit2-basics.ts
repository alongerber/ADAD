import { LearningUnit } from '../../../types/curriculum';

// =============================================
// יחידה 2: מונה ומכנה - הכרת מבנה השבר
// =============================================

export const unit2Basics: LearningUnit = {
  id: 'unit_2_basics',
  number: 2,
  title: 'מונה ומכנה',
  description: 'להבין את המבנה של שבר - מה המספר למעלה ומה המספר למטה אומרים',
  icon: '📝',

  objectives: [
    'להבין מה המכנה אומר - לכמה חלקים חילקנו',
    'להבין מה המונה אומר - כמה חלקים לקחנו',
    'לדעת לקרוא ולכתוב שברים'
  ],

  prerequisites: ['unit_1_whole'],

  steps: [
    // ========================================
    // שלב 1: למידה - המכנה
    // ========================================
    {
      id: 'step_2_1_learn_denominator',
      type: 'learning',
      title: 'המכנה',
      slides: [
        {
          id: 'slide_problem',
          type: 'story',
          title: 'איך כותבים את זה?',
          content: {
            emoji: '🍕',
            text: 'חתכת פיצה ל-4 משולשים ולקחת אחד.',
            question: 'איך נכתוב את זה במתמטיקה?',
            subtext: 'יש דרך מיוחדת!'
          }
        },
        {
          id: 'slide_intro_fraction',
          type: 'visual',
          title: 'הכירו: השבר!',
          content: {
            emoji: '✨',
            text: 'שבר נכתב עם שני מספרים:',
            visual: {
              type: 'fraction',
              props: { numerator: 1, denominator: 4, showLabels: true }
            },
            subtext: 'מספר למעלה ומספר למטה, עם קו ביניהם'
          }
        },
        {
          id: 'slide_denominator',
          type: 'discovery',
          title: 'המספר למטה',
          content: {
            emoji: '👇',
            highlight: 'המכנה = המספר למטה',
            question: 'מה הוא אומר לנו?',
            text: 'הוא אומר: לכמה חלקים שווים חילקנו את השלם?',
            visual: {
              type: 'pizza',
              props: { slices: 4, filled: 0, showLabels: true }
            },
            subtext: 'פה חילקנו ל-4, אז המכנה = 4'
          },
          animation: 'slide'
        },
        {
          id: 'slide_denominator_examples',
          type: 'visual',
          title: 'דוגמאות למכנה',
          content: {
            text: 'המכנה משתנה לפי החלוקה:',
            subtext: 'חילקנו ל-2 → מכנה 2 | חילקנו ל-4 → מכנה 4 | חילקנו ל-3 → מכנה 3'
          }
        },
        {
          id: 'slide_denominator_summary',
          type: 'summary',
          title: 'זכור!',
          content: {
            emoji: '⭐',
            highlight: 'המכנה (למטה) = לכמה חלקים חתכנו',
            text: 'אם חתכנו ל-4, המכנה הוא 4.',
            subtext: 'פשוט!'
          }
        }
      ]
    },

    // ========================================
    // שלב 2: תרגול - המכנה (הקשות)
    // ========================================
    {
      id: 'step_2_2_practice_denominator',
      type: 'practice',
      title: 'תרגול המכנה',
      practiceType: 'tap',
      questions: [
        {
          id: 'q_2_2_1',
          type: 'tap',
          difficulty: 1,
          question: 'לכמה חלקים חתוכה הפיצה?',
          narrative: 'ספור את כל החלקים',
          answer: {
            type: 'tap',
            targetCount: 4,
            totalParts: 4
          },
          hint: 'הקש על כל חלק לספור',
          explanation: 'יש 4 חלקים, אז המכנה = 4'
        },
        {
          id: 'q_2_2_2',
          type: 'tap',
          difficulty: 1,
          question: 'ספור את החלקים',
          narrative: 'כמה חלקים יש בעוגה?',
          answer: {
            type: 'tap',
            targetCount: 2,
            totalParts: 2
          },
          hint: 'הקש על כל חלק',
          explanation: 'יש 2 חלקים, אז המכנה = 2'
        }
      ],
      requiredCorrect: 2
    },

    // ========================================
    // שלב 3: למידה - המונה
    // ========================================
    {
      id: 'step_2_3_learn_numerator',
      type: 'learning',
      title: 'המונה',
      slides: [
        {
          id: 'slide_numerator_intro',
          type: 'story',
          title: 'עכשיו לוקחים חלקים',
          content: {
            emoji: '🍕',
            text: 'הפיצה חתוכה ל-4. לקחת משולש אחד.',
            question: 'איך נכתוב כמה לקחנו?',
            subtext: 'המספר למעלה יעזור!'
          }
        },
        {
          id: 'slide_numerator',
          type: 'discovery',
          title: 'המספר למעלה',
          content: {
            emoji: '👆',
            highlight: 'המונה = המספר למעלה',
            question: 'מה הוא אומר לנו?',
            text: 'הוא אומר: כמה חלקים לקחנו?',
            visual: {
              type: 'pizza',
              props: { slices: 4, filled: 1, showLabels: true }
            },
            subtext: 'לקחנו 1 חלק, אז המונה = 1'
          },
          animation: 'slide'
        },
        {
          id: 'slide_together',
          type: 'visual',
          title: 'יחד זה שבר!',
          content: {
            emoji: '🎯',
            text: 'לקחנו 1 מתוך 4 חלקים',
            visual: {
              type: 'fraction',
              props: { numerator: 1, denominator: 4, showLabels: true }
            },
            highlight: '1/4 = רבע',
            subtext: 'מונה 1 (לקחנו 1) ÷ מכנה 4 (מתוך 4)'
          },
          animation: 'bounce'
        },
        {
          id: 'slide_more_examples',
          type: 'visual',
          title: 'עוד דוגמאות',
          content: {
            text: 'אם לוקחים יותר חלקים:',
            visual: {
              type: 'pizza',
              props: { slices: 4, filled: 3, showLabels: true }
            },
            highlight: '3/4 = שלושה רבעים',
            subtext: 'לקחנו 3 (מונה) מתוך 4 (מכנה)'
          }
        },
        {
          id: 'slide_summary',
          type: 'summary',
          title: 'סיכום',
          content: {
            emoji: '📝',
            text: 'שבר = מונה/מכנה',
            highlight: 'מונה (למעלה) = כמה לקחנו',
            subtext: 'מכנה (למטה) = לכמה חלקים חתכנו'
          }
        }
      ]
    },

    // ========================================
    // שלב 4: תרגול - המונה (הקשות)
    // ========================================
    {
      id: 'step_2_4_practice_numerator',
      type: 'practice',
      title: 'תרגול המונה',
      practiceType: 'tap',
      questions: [
        {
          id: 'q_2_4_1',
          type: 'tap',
          difficulty: 1,
          question: 'הקש על החלקים שאכלו',
          narrative: 'רק החלקים הצבועים נאכלו',
          answer: {
            type: 'tap',
            targetCount: 1,
            totalParts: 4
          },
          hint: 'הקש רק על הצבועים',
          explanation: 'אכלו 1 חלק, אז המונה = 1'
        },
        {
          id: 'q_2_4_2',
          type: 'tap',
          difficulty: 2,
          question: 'סמן 3 חלקים',
          narrative: 'אתה רוצה לקחת 3 רבעים',
          answer: {
            type: 'tap',
            targetCount: 3,
            totalParts: 4
          },
          hint: 'הקש על 3 חלקים',
          explanation: '3 חלקים מתוך 4 = 3/4 = שלושה רבעים'
        }
      ],
      requiredCorrect: 2
    },

    // ========================================
    // שלב 5: תרגול - קריאת שברים (בחירה)
    // ========================================
    {
      id: 'step_2_5_practice_reading',
      type: 'practice',
      title: 'קריאת שברים',
      practiceType: 'choice',
      questions: [
        {
          id: 'q_2_5_1',
          type: 'choice',
          difficulty: 2,
          question: 'מה השבר בתמונה?',
          visual: {
            type: 'pizza',
            props: { slices: 4, filled: 1 }
          },
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { fraction: { n: 1, d: 4 }, text: 'רבע' },
              { fraction: { n: 2, d: 4 }, text: 'חצי' },
              { fraction: { n: 3, d: 4 }, text: 'שלושה רבעים' },
              { fraction: { n: 4, d: 4 }, text: 'שלם' }
            ]
          },
          hint: 'ספור כמה צבועים מתוך כמה בסך הכל',
          explanation: '1 צבוע מתוך 4 = 1/4 = רבע'
        },
        {
          id: 'q_2_5_2',
          type: 'choice',
          difficulty: 2,
          question: 'מה השבר בתמונה?',
          visual: {
            type: 'pizza',
            props: { slices: 2, filled: 1 }
          },
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { fraction: { n: 1, d: 4 }, text: 'רבע' },
              { fraction: { n: 1, d: 2 }, text: 'חצי' },
              { fraction: { n: 2, d: 2 }, text: 'שלם' },
              { fraction: { n: 2, d: 4 }, text: 'שני רבעים' }
            ]
          },
          hint: 'כמה חלקים יש בסך הכל? כמה צבועים?',
          explanation: '1 מתוך 2 = 1/2 = חצי'
        },
        {
          id: 'q_2_5_3',
          type: 'choice',
          difficulty: 3,
          question: 'איזה שבר מראה 3 חלקים מתוך 4?',
          answer: {
            type: 'choice',
            correctIndex: 2,
            options: [
              { fraction: { n: 1, d: 4 } },
              { fraction: { n: 2, d: 4 } },
              { fraction: { n: 3, d: 4 } },
              { fraction: { n: 4, d: 4 } }
            ]
          },
          hint: '3 חלקים = מונה 3, מתוך 4 = מכנה 4',
          explanation: '3 מתוך 4 = 3/4'
        }
      ],
      requiredCorrect: 2
    },

    // ========================================
    // שלב 6: תרגול - כתיבת שברים (כוסית)
    // ========================================
    {
      id: 'step_2_6_practice_writing',
      type: 'practice',
      title: 'כתיבת שברים',
      practiceType: 'beaker',
      questions: [
        {
          id: 'q_2_6_1',
          type: 'beaker',
          difficulty: 2,
          question: 'מלא רבע מהכוסית',
          narrative: 'רבע = 1/4',
          answer: {
            type: 'beaker',
            numerator: 1,
            denominator: 4
          },
          hint: 'רבע = חלק אחד מתוך 4',
          explanation: 'רבע = 1/4 = 25%'
        },
        {
          id: 'q_2_6_2',
          type: 'beaker',
          difficulty: 2,
          question: 'מלא חצי מהכוסית',
          narrative: 'חצי = 1/2',
          answer: {
            type: 'beaker',
            numerator: 1,
            denominator: 2
          },
          hint: 'חצי = באמצע',
          explanation: 'חצי = 1/2 = 50%'
        },
        {
          id: 'q_2_6_3',
          type: 'beaker',
          difficulty: 3,
          question: 'מלא שלושה רבעים',
          narrative: 'שלושה רבעים = 3/4',
          answer: {
            type: 'beaker',
            numerator: 3,
            denominator: 4
          },
          hint: '3 חלקים מתוך 4',
          explanation: 'שלושה רבעים = 3/4 = 75%'
        }
      ],
      requiredCorrect: 2
    },

    // ========================================
    // שלב 7: מבחן שליטה
    // ========================================
    {
      id: 'step_2_7_mastery',
      type: 'mastery',
      title: 'בדיקת הבנה',
      questions: [
        {
          id: 'mastery_2_1',
          type: 'choice',
          difficulty: 2,
          question: 'מה המכנה אומר?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { text: 'כמה חלקים לקחנו' },
              { text: 'לכמה חלקים חתכנו' },
              { text: 'כמה נשאר' },
              { text: 'כמה אכלנו' }
            ]
          }
        },
        {
          id: 'mastery_2_2',
          type: 'choice',
          difficulty: 2,
          question: 'מה המונה אומר?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { text: 'כמה חלקים לקחנו' },
              { text: 'לכמה חלקים חתכנו' },
              { text: 'כמה נשאר' },
              { text: 'כמה בסך הכל' }
            ]
          }
        },
        {
          id: 'mastery_2_3',
          type: 'choice',
          difficulty: 3,
          question: 'בשבר 3/4, מה המכנה?',
          answer: {
            type: 'choice',
            correctIndex: 3,
            options: [
              { text: '1' },
              { text: '2' },
              { text: '3' },
              { text: '4' }
            ]
          }
        },
        {
          id: 'mastery_2_4',
          type: 'choice',
          difficulty: 3,
          question: 'בשבר 2/4, מה המונה?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { text: '1' },
              { text: '2' },
              { text: '3' },
              { text: '4' }
            ]
          }
        },
        {
          id: 'mastery_2_5',
          type: 'truefalse',
          difficulty: 3,
          question: '',
          answer: {
            type: 'truefalse',
            isTrue: true,
            statement: 'בשבר 1/4, החלק למטה (4) אומר שחתכנו ל-4 חלקים'
          }
        }
      ],
      passingScore: 80,
      onFail: 'review'
    }
  ],

  masterySkills: [
    'יודע מה המכנה אומר',
    'יודע מה המונה אומר',
    'יכול לקרוא שבר מתמונה',
    'יכול לכתוב שבר'
  ]
};
