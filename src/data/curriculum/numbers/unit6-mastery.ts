import { LearningUnit } from '../../../types/curriculum';

// =============================================
// יחידה 6: מבחן כללי - מספרים וחיסור
// סיכום כל מה שלמדנו
// =============================================

export const unit6Mastery: LearningUnit = {
  id: 'unit_6_mastery',
  number: 6,
  title: 'מבחן סיכום',
  description: 'בואו נבדוק שאתה שולט בכל החומר!',
  icon: '🏆',

  objectives: [
    'להוכיח שליטה בכתיבת מספרים',
    'להוכיח שליטה בחיסור עם ובלי פריטה',
    'לעבור את מבחן הסיכום ב-80% לפחות'
  ],

  prerequisites: ['unit_5_borrowing'],

  steps: [
    // ========================================
    // שלב 1: חזרה קצרה
    // ========================================
    {
      id: 'step_6_1_review',
      type: 'learning',
      title: 'חזרה לפני המבחן',
      slides: [
        {
          id: 'slide_intro',
          type: 'story',
          title: 'הגענו לסוף!',
          content: {
            emoji: '🎓',
            text: 'עברת את כל היחידות!',
            subtext: 'עכשיו בוא נבדוק שאתה באמת שולט בחומר.',
            highlight: 'מבחן סיכום - 10 שאלות'
          },
          animation: 'fade'
        },
        {
          id: 'slide_review1',
          type: 'visual',
          title: 'זכור: ערך המקום',
          content: {
            emoji: '🔢',
            text: 'כל ספרה יש לה ערך לפי המקום שלה',
            subtext: 'אלפים | מאות | עשרות | יחידות',
            highlight: '5 במאות = 500, 5 בעשרות = 50'
          }
        },
        {
          id: 'slide_review2',
          type: 'visual',
          title: 'זכור: מלכודות האפס',
          content: {
            emoji: '🕳️',
            text: 'האפס הוא שומר מקום!',
            subtext: '"שלושת אלפים וחמישים" = 3,050 (לא 350!)',
            highlight: 'בלי האפס - המספר משתנה'
          }
        },
        {
          id: 'slide_review3',
          type: 'visual',
          title: 'זכור: חיסור ופריטה',
          content: {
            emoji: '➖',
            text: 'חיסור: מימין לשמאל, ספרה ספרה',
            subtext: 'אם הספרה למעלה קטנה - פורטים מהשכן!',
            highlight: 'פריטה = להחליף 10 מהשכן'
          }
        },
        {
          id: 'slide_ready',
          type: 'summary',
          title: 'מוכן?',
          content: {
            emoji: '💪',
            text: 'בהצלחה במבחן!',
            subtext: 'צריך 80% לפחות כדי לעבור.',
            highlight: 'אתה יכול!'
          }
        }
      ]
    },

    // ========================================
    // שלב 2: מבחן סיכום כללי
    // ========================================
    {
      id: 'step_6_2_final_exam',
      type: 'mastery',
      title: 'מבחן סיכום - מספרים וחיסור',
      passingScore: 80,
      questions: [
        // שאלות על כתיבת מספרים
        {
          id: 'q_6_2_1',
          type: 'choice',
          difficulty: 1,
          question: 'מה המספר "שבע מאות שלושים וארבע"?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { text: '734' },
              { text: '743' },
              { text: '374' },
              { text: '473' }
            ]
          }
        },
        {
          id: 'q_6_2_2',
          type: 'choice',
          difficulty: 2,
          question: 'מה המספר "ארבעת אלפים שש מאות ושבע עשרה"?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { text: '4,607' },
              { text: '4,617' },
              { text: '4,670' },
              { text: '6,417' }
            ]
          }
        },
        {
          id: 'q_6_2_3',
          type: 'choice',
          difficulty: 2,
          question: 'מה המספר "שמונת אלפים וששים"?',
          narrative: 'זהירות - מלכודת אפס!',
          answer: {
            type: 'choice',
            correctIndex: 2,
            options: [
              { text: '8,600' },
              { text: '8,006' },
              { text: '8,060' },
              { text: '860' }
            ]
          }
        },
        {
          id: 'q_6_2_4',
          type: 'truefalse',
          difficulty: 2,
          question: '',
          answer: {
            type: 'truefalse',
            statement: '"עשרים אלף ושלוש מאות" = 20,300',
            isTrue: true
          }
        },
        // שאלות על ערך המקום
        {
          id: 'q_6_2_5',
          type: 'choice',
          difficulty: 2,
          question: 'במספר 5,824 כמה שווה הספרה 8?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { text: '8' },
              { text: '800' },
              { text: '80' },
              { text: '8,000' }
            ]
          }
        },
        // שאלות על חיסור פשוט
        {
          id: 'q_6_2_6',
          type: 'choice',
          difficulty: 1,
          question: '98 - 45 = ?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { text: '53' },
              { text: '43' },
              { text: '63' },
              { text: '57' }
            ]
          }
        },
        {
          id: 'q_6_2_7',
          type: 'choice',
          difficulty: 2,
          question: '876 - 543 = ?',
          answer: {
            type: 'choice',
            correctIndex: 2,
            options: [
              { text: '323' },
              { text: '343' },
              { text: '333' },
              { text: '313' }
            ]
          }
        },
        // שאלות על פריטה
        {
          id: 'q_6_2_8',
          type: 'choice',
          difficulty: 2,
          question: '72 - 38 = ?',
          narrative: 'שים לב: 2 קטן מ-8',
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
          id: 'q_6_2_9',
          type: 'choice',
          difficulty: 3,
          question: '503 - 247 = ?',
          narrative: 'יש אפס בעשרות!',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { text: '246' },
              { text: '256' },
              { text: '266' },
              { text: '356' }
            ]
          }
        },
        {
          id: 'q_6_2_10',
          type: 'truefalse',
          difficulty: 3,
          question: '',
          answer: {
            type: 'truefalse',
            statement: '1,000 - 456 = 544',
            isTrue: true
          }
        }
      ]
    },

    // ========================================
    // שלב 3: סיום וחגיגה
    // ========================================
    {
      id: 'step_6_3_celebration',
      type: 'learning',
      title: 'סיימת!',
      slides: [
        {
          id: 'slide_congrats',
          type: 'story',
          title: '🎉 מזל טוב! 🎉',
          content: {
            emoji: '🏆',
            text: 'סיימת את כל מודול המספרים והחיסור!',
            subtext: 'אתה עכשיו מומחה בכתיבת מספרים ובחיסור במאונך!',
            highlight: 'כל הכבוד!'
          },
          animation: 'bounce'
        },
        {
          id: 'slide_skills',
          type: 'visual',
          title: 'מה למדת?',
          content: {
            emoji: '✅',
            text: 'ערך המקום • אלפים • מלכודות האפס',
            subtext: 'חיסור במאונך • פריטה',
            highlight: 'כל הכלים לפתור תרגילי חיסור!'
          }
        },
        {
          id: 'slide_next',
          type: 'summary',
          title: 'מה עכשיו?',
          content: {
            emoji: '🚀',
            text: 'אפשר להמשיך לתרגל בחדר הכספת!',
            subtext: 'שם יש עוד המון אתגרים מגניבים.',
            highlight: 'המשך ללמוד ולהתאמן!'
          }
        }
      ]
    }
  ]
};

export default unit6Mastery;
