import { LearningUnit } from '../../../types/curriculum';

// =============================================
// יחידה 5: פריטה בחיסור
// כשהספרה למעלה קטנה מהספרה למטה
// =============================================

export const unit5Borrowing: LearningUnit = {
  id: 'unit_5_borrowing',
  number: 5,
  title: 'פריטה',
  description: 'מה עושים כשהספרה למעלה קטנה מזו שלמטה?',
  icon: '🔄',

  objectives: [
    'להבין מתי צריך לבצע פריטה',
    'לדעת לפרוט מעשרות, ממאות',
    'לפתור תרגילי חיסור עם פריטה'
  ],

  prerequisites: ['unit_4_subtraction'],

  steps: [
    // ========================================
    // שלב 1: למידה - מה זה פריטה?
    // ========================================
    {
      id: 'step_5_1_learn_borrowing',
      type: 'learning',
      title: 'מה זה פריטה?',
      slides: [
        {
          id: 'slide_problem',
          type: 'story',
          title: 'בעיה!',
          content: {
            emoji: '😰',
            text: 'בתרגיל 43 - 15... צריך לחסר 5 מ-3!',
            subtext: 'אבל 3 קטן מ-5! אי אפשר!',
            highlight: 'מה עושים?!'
          },
          animation: 'fade'
        },
        {
          id: 'slide_solution',
          type: 'discovery',
          title: 'הפתרון: פריטה!',
          content: {
            emoji: '💡',
            text: 'פריטה = לקחת 10 מהשכן משמאל',
            subtext: 'כמו להחליף שטר של 10 ל-10 מטבעות!',
            highlight: 'עשרה אחת = 10 יחידות'
          },
          delay: 500
        },
        {
          id: 'slide_example',
          type: 'visual',
          title: 'דוגמה: 43 - 15',
          content: {
            emoji: '✏️',
            text: 'יחידות: 3 קטן מ-5? פורטים!',
            subtext: 'לוקחים 1 מהעשרות (4→3), היחידות נהיות 13',
            highlight: '13 - 5 = 8, ואז 3 - 1 = 2. התשובה: 28'
          }
        },
        {
          id: 'slide_steps',
          type: 'visual',
          title: 'הצעדים',
          content: {
            emoji: '📝',
            text: '1. בדוק: הספרה למעלה קטנה?',
            subtext: '2. אם כן: פרוט - הורד 1 משמאל, הוסף 10',
            highlight: '3. חסר כרגיל'
          }
        },
        {
          id: 'slide_summary',
          type: 'summary',
          title: 'מה למדנו?',
          content: {
            emoji: '✨',
            text: 'כשלא מספיק - פורטים מהשכן!',
            subtext: 'מורידים 1 משמאל, מוסיפים 10 לספרה הנוכחית',
            highlight: 'פריטה = להחליף עשרה ליחידות'
          }
        }
      ]
    },

    // ========================================
    // שלב 2: תרגול - בחירה מרובה
    // ========================================
    {
      id: 'step_5_2_practice_choice',
      type: 'practice',
      title: 'תרגילים עם פריטה',
      practiceType: 'choice',
      questions: [
        {
          id: 'q_5_2_1',
          type: 'choice',
          difficulty: 2,
          question: '43 - 15 = ?',
          narrative: '3 קטן מ-5 - צריך פריטה!',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { text: '38' },
              { text: '28' },
              { text: '32' },
              { text: '18' }
            ]
          },
          hint: 'פרוט: 43 הופך ל-3 עשרות ו-13 יחידות'
        },
        {
          id: 'q_5_2_2',
          type: 'choice',
          difficulty: 2,
          question: '52 - 18 = ?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { text: '34' },
              { text: '44' },
              { text: '36' },
              { text: '46' }
            ]
          }
        },
        {
          id: 'q_5_2_3',
          type: 'choice',
          difficulty: 2,
          question: '452 - 138 = ?',
          narrative: 'שלוש ספרות עם פריטה',
          answer: {
            type: 'choice',
            correctIndex: 2,
            options: [
              { text: '324' },
              { text: '304' },
              { text: '314' },
              { text: '334' }
            ]
          },
          hint: '2 קטן מ-8 - צריך פריטה'
        },
        {
          id: 'q_5_2_4',
          type: 'choice',
          difficulty: 3,
          question: '534 - 271 = ?',
          narrative: 'שים לב: 3 קטן מ-7',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { text: '253' },
              { text: '263' },
              { text: '273' },
              { text: '243' }
            ]
          }
        }
      ]
    },

    // ========================================
    // שלב 3: תרגול - נכון/לא נכון
    // ========================================
    {
      id: 'step_5_3_practice_truefalse',
      type: 'practice',
      title: 'נכון או לא?',
      practiceType: 'truefalse',
      questions: [
        {
          id: 'q_5_3_1',
          type: 'truefalse',
          difficulty: 2,
          question: '',
          answer: {
            type: 'truefalse',
            statement: 'בתרגיל 62 - 38 צריך פריטה',
            isTrue: true
          },
          explanation: 'נכון! 2 קטן מ-8'
        },
        {
          id: 'q_5_3_2',
          type: 'truefalse',
          difficulty: 2,
          question: '',
          answer: {
            type: 'truefalse',
            statement: '75 - 42 = 33',
            isTrue: true
          }
        },
        {
          id: 'q_5_3_3',
          type: 'truefalse',
          difficulty: 2,
          question: '',
          answer: {
            type: 'truefalse',
            statement: '81 - 36 = 55',
            isTrue: false
          },
          explanation: 'לא נכון! 81-36=45'
        },
        {
          id: 'q_5_3_4',
          type: 'truefalse',
          difficulty: 3,
          question: '',
          answer: {
            type: 'truefalse',
            statement: 'בתרגיל 523 - 168 צריך פריטה פעמיים',
            isTrue: true
          },
          explanation: 'נכון! 3<8 ו-2<6'
        }
      ]
    },

    // ========================================
    // שלב 4: מבחן שליטה
    // ========================================
    {
      id: 'step_5_4_mastery',
      type: 'mastery',
      title: 'מבחן שליטה - פריטה',
      passingScore: 80,
      questions: [
        {
          id: 'q_5_4_1',
          type: 'choice',
          difficulty: 2,
          question: '61 - 27 = ?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { text: '34' },
              { text: '44' },
              { text: '36' },
              { text: '46' }
            ]
          }
        },
        {
          id: 'q_5_4_2',
          type: 'choice',
          difficulty: 2,
          question: '726 - 384 = ?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { text: '332' },
              { text: '342' },
              { text: '352' },
              { text: '442' }
            ]
          }
        },
        {
          id: 'q_5_4_3',
          type: 'truefalse',
          difficulty: 2,
          question: '',
          answer: {
            type: 'truefalse',
            statement: '503 - 127 = 376',
            isTrue: true
          }
        },
        {
          id: 'q_5_4_4',
          type: 'choice',
          difficulty: 3,
          question: '614 - 279 = ?',
          answer: {
            type: 'choice',
            correctIndex: 2,
            options: [
              { text: '345' },
              { text: '325' },
              { text: '335' },
              { text: '355' }
            ]
          }
        },
        {
          id: 'q_5_4_5',
          type: 'truefalse',
          difficulty: 3,
          question: '',
          answer: {
            type: 'truefalse',
            statement: '800 - 245 = 555',
            isTrue: true
          }
        }
      ]
    }
  ]
};

export default unit5Borrowing;
