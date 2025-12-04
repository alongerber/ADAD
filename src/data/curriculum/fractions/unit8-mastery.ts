import { LearningUnit } from '../../../types/curriculum';

// =============================================
// יחידה 8: אתגרים ומבחן סיכום
// =============================================

export const unit8Mastery: LearningUnit = {
  id: 'unit_8_mastery',
  number: 8,
  title: 'מבחן סיום - מאסטר שברים!',
  description: 'סיכום כל החומר ומבחן מקיף',
  icon: '🏆',

  objectives: [
    'לסכם את כל מה שלמדנו',
    'להוכיח שליטה מלאה בשברים',
    'לפתור בעיות מורכבות',
    'להפוך למאסטר שברים!'
  ],

  prerequisites: ['unit_7_subtraction'],

  steps: [
    // ========================================
    // שלב 1: חזרה מהירה
    // ========================================
    {
      id: 'step_8_1_review',
      type: 'learning',
      title: 'חזרה על הכל',
      slides: [
        {
          id: 'slide_review_intro',
          type: 'story',
          title: 'מוכנים למבחן?',
          content: {
            emoji: '🎯',
            text: 'עברת דרך ארוכה!',
            subtext: 'למדת הכל על שברים לכיתה ד׳',
            question: 'בוא נחזור על הנקודות החשובות'
          }
        },
        {
          id: 'slide_review_basics',
          type: 'visual',
          title: 'שבר = חלק משלם',
          content: {
            emoji: '🍕',
            highlight: 'מונה / מכנה',
            text: 'המכנה: לכמה חלקים חילקנו',
            subtext: 'המונה: כמה חלקים לקחנו'
          }
        },
        {
          id: 'slide_review_special',
          type: 'visual',
          title: 'שברים מיוחדים',
          content: {
            emoji: '⭐',
            text: '½ חצי | ¼ רבע | ¾ שלושה רבעים',
            highlight: 'חצי מ-10 = 5 (מחלקים ב-2)',
            subtext: '2 רבעים = חצי'
          }
        },
        {
          id: 'slide_review_compare',
          type: 'visual',
          title: 'השוואת שברים',
          content: {
            emoji: '⚖️',
            text: 'מכנה זהה? → מונה גדול = שבר גדול',
            highlight: 'מונה זהה? → מכנה גדול = שבר קטן!',
            subtext: '3/5 > 2/5 | 1/3 > 1/5'
          }
        },
        {
          id: 'slide_review_equivalent',
          type: 'visual',
          title: 'שברים שווים',
          content: {
            emoji: '🟰',
            text: '1/2 = 2/4 = 3/6 = 4/8',
            highlight: 'הכפלה: a/b × n/n = an/bn',
            subtext: 'צמצום: חלוקה באותו מספר'
          }
        },
        {
          id: 'slide_review_operations',
          type: 'visual',
          title: 'חיבור וחיסור',
          content: {
            emoji: '➕➖',
            text: 'אותו מכנה: מחבר/מחסר רק מונים!',
            highlight: 'מכנה שונה: הופך לאותו מכנה קודם',
            subtext: '2/5 + 1/5 = 3/5 | 1/2 + 1/4 = 3/4'
          }
        },
        {
          id: 'slide_review_ready',
          type: 'story',
          title: 'מוכן?',
          content: {
            emoji: '💪',
            text: 'עכשיו הגיע הזמן להוכיח!',
            question: 'המבחן הסופי מחכה',
            subtext: '80% להצלחה - אתה יכול!'
          }
        }
      ]
    },

    // ========================================
    // שלב 2: אתגר חימום
    // ========================================
    {
      id: 'step_8_2_warmup',
      type: 'practice',
      title: 'אתגר חימום',
      practiceType: 'choice',
      questions: [
        {
          id: 'q_8_2_1',
          type: 'choice',
          difficulty: 2,
          question: 'מה המונה בשבר 3/7?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { text: '3' },
              { text: '7' },
              { text: '10' },
              { text: '21' }
            ]
          },
          hint: 'המונה למעלה',
          explanation: 'המונה הוא המספר למעלה - 3'
        },
        {
          id: 'q_8_2_2',
          type: 'choice',
          difficulty: 2,
          question: 'חצי מ-12 זה...',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { text: '4' },
              { text: '6' },
              { text: '8' },
              { text: '12' }
            ]
          },
          hint: '12 ÷ 2 = ?',
          explanation: '12 ÷ 2 = 6'
        },
        {
          id: 'q_8_2_3',
          type: 'truefalse',
          difficulty: 2,
          question: '',
          answer: {
            type: 'truefalse',
            isTrue: true,
            statement: '2/4 = 1/2'
          },
          hint: 'צמצם 2/4',
          explanation: '2/4 ÷ 2 = 1/2 - נכון!'
        }
      ],
      requiredCorrect: 2
    },

    // ========================================
    // שלב 3: אתגר השוואה
    // ========================================
    {
      id: 'step_8_3_compare_challenge',
      type: 'practice',
      title: 'אתגר השוואה',
      practiceType: 'sort',
      questions: [
        {
          id: 'q_8_3_1',
          type: 'sort',
          difficulty: 4,
          question: 'סדר מהקטן לגדול',
          narrative: 'שים לב - יש גם מכנים שונים!',
          answer: {
            type: 'sort',
            items: [
              { id: 'sort1', fraction: { n: 1, d: 4 }, value: 0.25 },
              { id: 'sort2', fraction: { n: 1, d: 2 }, value: 0.5 },
              { id: 'sort3', fraction: { n: 3, d: 4 }, value: 0.75 },
              { id: 'sort4', fraction: { n: 1, d: 1 }, text: '1 (שלם)', value: 1 }
            ],
            direction: 'ascending'
          },
          hint: '1/4 = רבע, 1/2 = חצי, 3/4 = שלושה רבעים',
          explanation: 'רבע < חצי < שלושה רבעים < שלם'
        }
      ],
      requiredCorrect: 1
    },

    // ========================================
    // שלב 4: אתגר פעולות
    // ========================================
    {
      id: 'step_8_4_operations_challenge',
      type: 'practice',
      title: 'אתגר חישובים',
      practiceType: 'choice',
      questions: [
        {
          id: 'q_8_4_1',
          type: 'choice',
          difficulty: 3,
          question: '1/3 + 1/3 + 1/3 = ?',
          answer: {
            type: 'choice',
            correctIndex: 2,
            options: [
              { fraction: { n: 3, d: 9 }, text: '3/9' },
              { fraction: { n: 1, d: 3 }, text: '1/3' },
              { fraction: { n: 3, d: 3 }, text: '3/3 = 1' },
              { fraction: { n: 1, d: 9 }, text: '1/9' }
            ]
          },
          hint: '1+1+1 = 3',
          explanation: '1/3 + 1/3 + 1/3 = 3/3 = שלם!'
        },
        {
          id: 'q_8_4_2',
          type: 'choice',
          difficulty: 4,
          question: '1/2 + 1/4 + 1/4 = ?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { fraction: { n: 4, d: 4 }, text: '4/4 = 1' },
              { fraction: { n: 3, d: 4 }, text: '3/4' },
              { fraction: { n: 2, d: 4 }, text: '2/4' },
              { fraction: { n: 3, d: 10 }, text: '3/10' }
            ]
          },
          hint: '1/2 = 2/4',
          explanation: '2/4 + 1/4 + 1/4 = 4/4 = שלם!'
        },
        {
          id: 'q_8_4_3',
          type: 'choice',
          difficulty: 4,
          question: '7/8 - 3/8 - 2/8 = ?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { fraction: { n: 1, d: 8 }, text: '1/8' },
              { fraction: { n: 2, d: 8 }, text: '2/8 = 1/4' },
              { fraction: { n: 4, d: 8 }, text: '4/8' },
              { fraction: { n: 12, d: 8 }, text: '12/8' }
            ]
          },
          hint: '7-3-2 = ?',
          explanation: '7-3-2 = 2, אז 2/8 = 1/4'
        }
      ],
      requiredCorrect: 2
    },

    // ========================================
    // שלב 5: אתגר בעיות מילוליות
    // ========================================
    {
      id: 'step_8_5_word_problems',
      type: 'practice',
      title: 'בעיות מילוליות',
      practiceType: 'choice',
      questions: [
        {
          id: 'q_8_5_1',
          type: 'choice',
          difficulty: 3,
          question: 'רינה קראה 1/4 מהספר ביום שני ועוד 2/4 ביום שלישי. כמה קראה בסך הכל?',
          answer: {
            type: 'choice',
            correctIndex: 2,
            options: [
              { fraction: { n: 3, d: 8 }, text: '3/8' },
              { fraction: { n: 2, d: 4 }, text: '2/4' },
              { fraction: { n: 3, d: 4 }, text: '3/4' },
              { fraction: { n: 1, d: 4 }, text: '1/4' }
            ]
          },
          hint: '1/4 + 2/4 = ?',
          explanation: '1/4 + 2/4 = 3/4 מהספר'
        },
        {
          id: 'q_8_5_2',
          type: 'choice',
          difficulty: 3,
          question: 'היו 5/6 עוגה. אכלו 2/6. כמה נשאר?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { fraction: { n: 1, d: 2 }, text: '1/2' },
              { fraction: { n: 3, d: 6 }, text: '3/6' },
              { fraction: { n: 7, d: 6 }, text: '7/6' },
              { fraction: { n: 3, d: 12 }, text: '3/12' }
            ]
          },
          hint: '5-2 = 3, וצמצם 3/6',
          explanation: '5/6 - 2/6 = 3/6 = 1/2'
        },
        {
          id: 'q_8_5_3',
          type: 'choice',
          difficulty: 4,
          question: 'יוסי אכל חצי פיצה. דני אכל רבע מאותה פיצה. כמה נשאר?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { fraction: { n: 1, d: 2 }, text: '1/2' },
              { fraction: { n: 1, d: 4 }, text: '1/4' },
              { fraction: { n: 3, d: 4 }, text: '3/4' },
              { fraction: { n: 2, d: 4 }, text: '2/4' }
            ]
          },
          hint: 'היה שלם (4/4). אכלו 2/4 + 1/4',
          explanation: '4/4 - 2/4 - 1/4 = 1/4'
        }
      ],
      requiredCorrect: 2
    },

    // ========================================
    // שלב 6: מבחן סופי מקיף
    // ========================================
    {
      id: 'step_8_6_final_exam',
      type: 'mastery',
      title: 'מבחן סופי - מאסטר שברים!',
      questions: [
        // יסודות
        {
          id: 'final_1',
          type: 'choice',
          difficulty: 2,
          question: 'בשבר 5/9, מה המכנה?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { text: '5' },
              { text: '9' },
              { text: '14' },
              { text: '45' }
            ]
          }
        },
        // חצי ממספר
        {
          id: 'final_2',
          type: 'choice',
          difficulty: 2,
          question: 'חצי מ-16 זה...',
          answer: {
            type: 'choice',
            correctIndex: 2,
            options: [
              { text: '4' },
              { text: '6' },
              { text: '8' },
              { text: '16' }
            ]
          }
        },
        // השוואה מכנה זהה
        {
          id: 'final_3',
          type: 'choice',
          difficulty: 2,
          question: 'מי גדול יותר: 3/10 או 7/10?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { fraction: { n: 3, d: 10 }, text: '3/10' },
              { fraction: { n: 7, d: 10 }, text: '7/10' }
            ]
          }
        },
        // השוואה מונה זהה
        {
          id: 'final_4',
          type: 'choice',
          difficulty: 3,
          question: 'מי גדול יותר: 2/5 או 2/8?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { fraction: { n: 2, d: 5 }, text: '2/5' },
              { fraction: { n: 2, d: 8 }, text: '2/8' }
            ]
          }
        },
        // שברים שווים
        {
          id: 'final_5',
          type: 'choice',
          difficulty: 3,
          question: 'איזה שבר שווה ל-1/2?',
          answer: {
            type: 'choice',
            correctIndex: 2,
            options: [
              { fraction: { n: 1, d: 4 }, text: '1/4' },
              { fraction: { n: 2, d: 3 }, text: '2/3' },
              { fraction: { n: 4, d: 8 }, text: '4/8' },
              { fraction: { n: 3, d: 4 }, text: '3/4' }
            ]
          }
        },
        // צמצום
        {
          id: 'final_6',
          type: 'choice',
          difficulty: 3,
          question: 'צמצם: 6/9 = ?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { fraction: { n: 3, d: 9 }, text: '3/9' },
              { fraction: { n: 2, d: 3 }, text: '2/3' },
              { fraction: { n: 1, d: 3 }, text: '1/3' },
              { fraction: { n: 6, d: 3 }, text: '6/3' }
            ]
          }
        },
        // חיבור פשוט
        {
          id: 'final_7',
          type: 'choice',
          difficulty: 2,
          question: '2/9 + 4/9 = ?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { fraction: { n: 6, d: 9 }, text: '6/9' },
              { fraction: { n: 6, d: 18 }, text: '6/18' },
              { fraction: { n: 8, d: 9 }, text: '8/9' },
              { fraction: { n: 2, d: 9 }, text: '2/9' }
            ]
          }
        },
        // חיסור פשוט
        {
          id: 'final_8',
          type: 'choice',
          difficulty: 2,
          question: '5/7 - 2/7 = ?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { fraction: { n: 7, d: 7 }, text: '7/7' },
              { fraction: { n: 3, d: 7 }, text: '3/7' },
              { fraction: { n: 3, d: 14 }, text: '3/14' },
              { fraction: { n: 2, d: 7 }, text: '2/7' }
            ]
          }
        },
        // חיבור מכנים שונים
        {
          id: 'final_9',
          type: 'choice',
          difficulty: 4,
          question: '1/2 + 1/4 = ?',
          answer: {
            type: 'choice',
            correctIndex: 2,
            options: [
              { fraction: { n: 2, d: 6 }, text: '2/6' },
              { fraction: { n: 1, d: 3 }, text: '1/3' },
              { fraction: { n: 3, d: 4 }, text: '3/4' },
              { fraction: { n: 2, d: 4 }, text: '2/4' }
            ]
          }
        },
        // חיסור מכנים שונים
        {
          id: 'final_10',
          type: 'choice',
          difficulty: 4,
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
          }
        },
        // נכון/לא נכון
        {
          id: 'final_11',
          type: 'truefalse',
          difficulty: 2,
          question: '',
          answer: {
            type: 'truefalse',
            isTrue: true,
            statement: 'רבע קטן מחצי'
          }
        },
        // נכון/לא נכון מתקדם
        {
          id: 'final_12',
          type: 'truefalse',
          difficulty: 3,
          question: '',
          answer: {
            type: 'truefalse',
            isTrue: true,
            statement: '1/4 + 1/4 + 1/4 + 1/4 = 1'
          }
        }
      ],
      passingScore: 80,
      onFail: 'review'
    }
  ],

  masterySkills: [
    'שולט בכל החומר של שברים לכיתה ד׳',
    'מבין מונה ומכנה',
    'משווה שברים בכל מצב',
    'מזהה שברים שווים',
    'מחבר ומחסר שברים',
    'פותר בעיות מילוליות'
  ]
};
