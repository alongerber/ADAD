import { LearningUnit } from '../../../types/curriculum';

// =============================================
// יחידה 3: מלכודות האפס
// הספרה הכי מסובכת - האפס!
// =============================================

export const unit3ZeroTraps: LearningUnit = {
  id: 'unit_3_zero_traps',
  number: 3,
  title: 'מלכודות האפס',
  description: 'הספרה הכי מסובכת - לדעת מתי לשים אפס ומתי לא',
  icon: '🕳️',

  objectives: [
    'להבין מתי צריך לכתוב אפס במספר',
    'לזהות את "מלכודות האפס" - מקומות שאנשים שוכחים אפס',
    'לכתוב נכון מספרים עם אפסים באמצע או בסוף'
  ],

  prerequisites: ['unit_2_thousands'],

  masterySkills: [
    'זיהוי מתי צריך אפס שומר מקום',
    'כתיבת מספרים עם אפסים באמצע',
    'הימנעות ממלכודות האפס'
  ],

  steps: [
    // ========================================
    // שלב 1: למידה - מה תפקיד האפס?
    // ========================================
    {
      id: 'step_3_1_learn_zero',
      type: 'learning',
      title: 'תפקיד האפס',
      slides: [
        {
          id: 'slide_story',
          type: 'story',
          title: 'המלכודת',
          content: {
            emoji: '⚠️',
            text: 'יש מלכודת מסוכנת בכתיבת מספרים...',
            subtext: 'הרבה ילדים נופלים בה!',
            highlight: 'המלכודת היא: האפס'
          },
          animation: 'fade'
        },
        {
          id: 'slide_problem',
          type: 'discovery',
          title: 'הבעיה',
          content: {
            emoji: '🤔',
            text: 'איך כותבים "שלושת אלפים וחמישים"?',
            subtext: 'רגע... אין מאות! מה עושים?',
            highlight: 'שלושת אלפים = 3000, חמישים = 50'
          },
          delay: 500
        },
        {
          id: 'slide_solution',
          type: 'visual',
          title: 'הפתרון: שומר מקום!',
          content: {
            emoji: '💡',
            text: 'האפס הוא שומר מקום!',
            subtext: 'כשאין מאות - שמים 0 במקום המאות',
            highlight: '3,050 ← שלושת אלפים וחמישים'
          }
        },
        {
          id: 'slide_examples',
          type: 'visual',
          title: 'עוד דוגמאות',
          content: {
            emoji: '📝',
            text: 'אפסים באמצע ובסוף:',
            subtext: 'אלפיים ושבע = 2,007 | עשרת אלפים = 10,000',
            highlight: 'בלי האפס - המספר ישתנה!'
          }
        },
        {
          id: 'slide_warning',
          type: 'discovery',
          title: 'המלכודת הגדולה',
          content: {
            emoji: '🚨',
            text: 'טעות נפוצה: לשכוח את האפס!',
            subtext: '"אלפיים ושבע" ← לא 27, לא 207, אלא 2,007!',
            highlight: 'תמיד לספור את הספרות!'
          }
        },
        {
          id: 'slide_summary',
          type: 'summary',
          title: 'מה למדנו?',
          content: {
            emoji: '✨',
            text: 'האפס הוא שומר מקום.',
            subtext: 'כשאין מאות/עשרות/יחידות - שמים 0',
            highlight: 'בלי האפס המספר ייראה אחרת!'
          }
        }
      ]
    },

    // ========================================
    // שלב 2: תרגול - בחירה מרובה
    // ========================================
    {
      id: 'step_3_2_practice_choice',
      type: 'practice',
      title: 'מלכודות האפס',
      practiceType: 'choice',
      questions: [
        {
          id: 'q_3_2_1',
          type: 'choice',
          difficulty: 2,
          question: 'מה המספר "שלושת אלפים וחמישים"?',
          narrative: 'שים לב: אין מאות!',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { text: '3,500' },
              { text: '3,050' },
              { text: '350' },
              { text: '3,005' }
            ]
          },
          hint: '3 אלפים + 0 מאות + 5 עשרות + 0 יחידות'
        },
        {
          id: 'q_3_2_2',
          type: 'choice',
          difficulty: 2,
          question: 'מה המספר "אלפיים ושבע"?',
          narrative: 'שים לב: אין מאות ואין עשרות!',
          answer: {
            type: 'choice',
            correctIndex: 2,
            options: [
              { text: '2,700' },
              { text: '2,070' },
              { text: '2,007' },
              { text: '207' }
            ]
          },
          hint: '2 אלפים + 0 מאות + 0 עשרות + 7 יחידות'
        },
        {
          id: 'q_3_2_3',
          type: 'choice',
          difficulty: 3,
          question: 'מה המספר "ארבעים אלף וארבע"?',
          narrative: 'מספר גדול עם הרבה אפסים!',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { text: '40,004' },
              { text: '40,040' },
              { text: '40,400' },
              { text: '4,004' }
            ]
          },
          hint: '40 אלף = 40,000 + 4 = ?'
        },
        {
          id: 'q_3_2_4',
          type: 'choice',
          difficulty: 3,
          question: 'מה המספר "עשרת אלפים ומאה"?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { text: '10,001' },
              { text: '10,100' },
              { text: '10,010' },
              { text: '1,100' }
            ]
          },
          hint: '10,000 + 100 = ?'
        }
      ]
    },

    // ========================================
    // שלב 3: תרגול - נכון/לא נכון
    // ========================================
    {
      id: 'step_3_3_practice_truefalse',
      type: 'practice',
      title: 'נכון או לא?',
      practiceType: 'truefalse',
      questions: [
        {
          id: 'q_3_3_1',
          type: 'truefalse',
          difficulty: 2,
          question: '',
          answer: {
            type: 'truefalse',
            statement: '"חמישים אלף ושלוש מאות" = 50,300',
            isTrue: true
          }
        },
        {
          id: 'q_3_3_2',
          type: 'truefalse',
          difficulty: 2,
          question: '',
          answer: {
            type: 'truefalse',
            statement: '"שישים ואחד אלף ושבע עשרה" = 61,017',
            isTrue: true
          }
        },
        {
          id: 'q_3_3_3',
          type: 'truefalse',
          difficulty: 3,
          question: '',
          answer: {
            type: 'truefalse',
            statement: '"חמשת אלפים ושמונה" = 5,800',
            isTrue: false
          },
          explanation: 'לא נכון! "ושמונה" = 8, לא 800. התשובה: 5,008'
        },
        {
          id: 'q_3_3_4',
          type: 'truefalse',
          difficulty: 3,
          question: '',
          answer: {
            type: 'truefalse',
            statement: 'במספר 7,040 יש אפס במקום המאות',
            isTrue: true
          }
        }
      ]
    },

    // ========================================
    // שלב 4: מבחן שליטה
    // ========================================
    {
      id: 'step_3_4_mastery',
      type: 'mastery',
      title: 'מבחן שליטה - מלכודות האפס',
      passingScore: 80,
      onFail: 'review',
      questions: [
        {
          id: 'q_3_4_1',
          type: 'choice',
          difficulty: 2,
          question: 'מה המספר "ששת אלפים ועשרים"?',
          answer: {
            type: 'choice',
            correctIndex: 2,
            options: [
              { text: '6,200' },
              { text: '6,002' },
              { text: '6,020' },
              { text: '620' }
            ]
          }
        },
        {
          id: 'q_3_4_2',
          type: 'truefalse',
          difficulty: 2,
          question: '',
          answer: {
            type: 'truefalse',
            statement: '"תשעת אלפים ושלוש" = 9,003',
            isTrue: true
          }
        },
        {
          id: 'q_3_4_3',
          type: 'choice',
          difficulty: 3,
          question: 'מה המספר "שלושים אלף ושבע מאות"?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { text: '30,700' },
              { text: '30,070' },
              { text: '30,007' },
              { text: '3,700' }
            ]
          }
        },
        {
          id: 'q_3_4_4',
          type: 'truefalse',
          difficulty: 3,
          question: '',
          answer: {
            type: 'truefalse',
            statement: '"ארבעים וחמישה אלף ומאתיים" = 45,200',
            isTrue: true
          }
        },
        {
          id: 'q_3_4_5',
          type: 'choice',
          difficulty: 3,
          question: 'כמה אפסים יש במספר "עשרים אלף ושישים"?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { text: '1' },
              { text: '2' },
              { text: '3' },
              { text: '4' }
            ]
          },
          explanation: '20,060 - יש אפס במאות ואפס ביחידות'
        }
      ]
    }
  ]
};

export default unit3ZeroTraps;
