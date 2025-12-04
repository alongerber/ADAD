import { LearningUnit } from '../../../types/curriculum';

// =============================================
// יחידה: חיבור במאונך
// =============================================

export const unitAddition: LearningUnit = {
  id: 'unit_addition',
  number: 4,  // יעודכן בהתאם למיקום במערך
  title: 'חיבור במאונך',
  description: 'לחבר ספרה ספרה - מימין לשמאל',
  icon: '➕',

  objectives: [
    'להבין את עקרון החיבור במאונך',
    'לחבר מספרים בני 2-3 ספרות בלי המרה',
    'לחבר מספרים עם המרה לעשרת הבאה'
  ],

  prerequisites: ['unit_1_place_value'],

  masterySkills: [
    'חיבור במאונך של מספרים דו-ספרתיים',
    'חיבור עם המרה',
    'בדיקת תוצאות חיבור'
  ],

  steps: [
    // ========================================
    // שלב 1: למידה - חיבור במאונך בסיסי
    // ========================================
    {
      id: 'step_add_1_learn_basic',
      type: 'learning',
      title: 'חיבור במאונך',
      slides: [
        {
          id: 'slide_story',
          type: 'story',
          title: 'משימה חדשה',
          content: {
            emoji: '🔐',
            text: 'הכספת דורשת לפתור תרגיל חיבור!',
            subtext: 'צריך לחבר שני מספרים כדי לקבל את הקוד.',
            highlight: 'חיבור במאונך = הדרך הקלה והמהירה!'
          },
          animation: 'fade'
        },
        {
          id: 'slide_setup',
          type: 'visual',
          title: 'איך מסדרים?',
          content: {
            emoji: '📐',
            text: 'שמים מספר מתחת לשני - ספרות זו מתחת לזו',
            subtext: 'מאות מתחת למאות, עשרות מתחת לעשרות...',
            highlight: 'ספרה מתחת לספרה!'
          }
        },
        {
          id: 'slide_direction',
          type: 'discovery',
          title: 'מאיפה מתחילים?',
          content: {
            emoji: '👉',
            text: 'תמיד מתחילים מימין!',
            subtext: 'קודם יחידות, אחר כך עשרות, ואז מאות',
            highlight: 'מימין לשמאל!'
          },
          delay: 500
        },
        {
          id: 'slide_example1',
          type: 'visual',
          title: 'דוגמה: 23 + 45',
          content: {
            emoji: '✏️',
            text: 'יחידות: 3 + 5 = 8',
            subtext: 'עשרות: 2 + 4 = 6',
            highlight: 'התשובה: 68'
          }
        },
        {
          id: 'slide_summary1',
          type: 'summary',
          title: 'מה למדנו?',
          content: {
            emoji: '✨',
            text: 'חיבור במאונך: מסדרים ספרה מתחת לספרה',
            subtext: 'מתחילים מימין, מחברים ספרה ספרה',
            highlight: 'פשוט ומדויק!'
          }
        }
      ]
    },

    // ========================================
    // שלב 2: תרגול בסיסי
    // ========================================
    {
      id: 'step_add_2_practice_basic',
      type: 'practice',
      title: 'תרגילי חיבור',
      practiceType: 'choice',
      questions: [
        {
          id: 'q_add_2_1',
          type: 'choice',
          difficulty: 1,
          question: '24 + 35 = ?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { text: '59' },
              { text: '69' },
              { text: '58' },
              { text: '49' }
            ]
          }
        },
        {
          id: 'q_add_2_2',
          type: 'choice',
          difficulty: 1,
          question: '42 + 36 = ?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { text: '68' },
              { text: '78' },
              { text: '76' },
              { text: '88' }
            ]
          }
        },
        {
          id: 'q_add_2_3',
          type: 'choice',
          difficulty: 1,
          question: '53 + 24 = ?',
          answer: {
            type: 'choice',
            correctIndex: 2,
            options: [
              { text: '67' },
              { text: '87' },
              { text: '77' },
              { text: '57' }
            ]
          }
        },
        {
          id: 'q_add_2_4',
          type: 'choice',
          difficulty: 1,
          question: '121 + 456 = ?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { text: '577' },
              { text: '567' },
              { text: '587' },
              { text: '677' }
            ]
          }
        }
      ],
      requiredCorrect: 3
    },

    // ========================================
    // שלב 3: למידה - חיבור עם המרה
    // ========================================
    {
      id: 'step_add_3_learn_carry',
      type: 'learning',
      title: 'חיבור עם המרה',
      slides: [
        {
          id: 'slide_problem',
          type: 'story',
          title: 'מה קורה כשיש יותר מ-9?',
          content: {
            emoji: '🤔',
            text: '27 + 35 - בואו נראה מה קורה',
            subtext: 'יחידות: 7 + 5 = 12',
            highlight: '12 זה יותר מ-9! מה עושים?'
          },
          animation: 'fade'
        },
        {
          id: 'slide_carry',
          type: 'discovery',
          title: 'המרה!',
          content: {
            emoji: '💡',
            text: '12 = 1 עשרת + 2 יחידות',
            subtext: 'כותבים 2 ביחידות, ומעבירים 1 לעשרות',
            highlight: 'ה-1 "עולה" לטור הבא!'
          },
          delay: 500
        },
        {
          id: 'slide_continue',
          type: 'visual',
          title: 'ממשיכים עם העשרות',
          content: {
            emoji: '✏️',
            text: 'עשרות: 2 + 3 + 1 = 6',
            subtext: 'לא שוכחים את ה-1 שהמרנו!',
            highlight: 'התשובה: 62'
          }
        },
        {
          id: 'slide_example2',
          type: 'visual',
          title: 'דוגמה נוספת: 48 + 25',
          content: {
            emoji: '📝',
            text: 'יחידות: 8 + 5 = 13 → כותבים 3, ממירים 1',
            subtext: 'עשרות: 4 + 2 + 1 = 7',
            highlight: 'התשובה: 73'
          }
        },
        {
          id: 'slide_summary2',
          type: 'summary',
          title: 'כלל ההמרה',
          content: {
            emoji: '⭐',
            text: 'כשהסכום גדול מ-9:',
            subtext: 'כותבים רק את הספרה האחרונה, וממירים 1 לטור הבא',
            highlight: 'זה נקרא "המרה" או "נשא"!'
          }
        }
      ]
    },

    // ========================================
    // שלב 4: תרגול עם המרה
    // ========================================
    {
      id: 'step_add_4_practice_carry',
      type: 'practice',
      title: 'תרגילי חיבור עם המרה',
      practiceType: 'choice',
      questions: [
        {
          id: 'q_add_4_1',
          type: 'choice',
          difficulty: 2,
          question: '27 + 35 = ?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { text: '52' },
              { text: '62' },
              { text: '72' },
              { text: '63' }
            ]
          }
        },
        {
          id: 'q_add_4_2',
          type: 'choice',
          difficulty: 2,
          question: '48 + 36 = ?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { text: '84' },
              { text: '74' },
              { text: '94' },
              { text: '85' }
            ]
          }
        },
        {
          id: 'q_add_4_3',
          type: 'choice',
          difficulty: 2,
          question: '156 + 87 = ?',
          answer: {
            type: 'choice',
            correctIndex: 2,
            options: [
              { text: '233' },
              { text: '234' },
              { text: '243' },
              { text: '253' }
            ]
          }
        },
        {
          id: 'q_add_4_4',
          type: 'choice',
          difficulty: 2,
          question: '375 + 248 = ?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { text: '623' },
              { text: '613' },
              { text: '633' },
              { text: '523' }
            ]
          }
        },
        {
          id: 'q_add_4_5',
          type: 'truefalse',
          difficulty: 2,
          question: '',
          answer: {
            type: 'truefalse',
            isTrue: false,
            statement: '65 + 78 = 133'
          }
        }
      ],
      requiredCorrect: 4
    },

    // ========================================
    // שלב 5: מבחן שליטה
    // ========================================
    {
      id: 'step_add_5_mastery',
      type: 'mastery',
      title: 'מבחן שליטה - חיבור במאונך',
      passingScore: 80,
      onFail: 'review',
      questions: [
        {
          id: 'q_add_5_1',
          type: 'choice',
          difficulty: 1,
          question: '34 + 52 = ?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { text: '86' },
              { text: '76' },
              { text: '96' },
              { text: '85' }
            ]
          }
        },
        {
          id: 'q_add_5_2',
          type: 'choice',
          difficulty: 2,
          question: '47 + 38 = ?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { text: '75' },
              { text: '85' },
              { text: '95' },
              { text: '84' }
            ]
          }
        },
        {
          id: 'q_add_5_3',
          type: 'choice',
          difficulty: 2,
          question: '256 + 187 = ?',
          answer: {
            type: 'choice',
            correctIndex: 2,
            options: [
              { text: '433' },
              { text: '343' },
              { text: '443' },
              { text: '453' }
            ]
          }
        },
        {
          id: 'q_add_5_4',
          type: 'truefalse',
          difficulty: 2,
          question: '',
          answer: {
            type: 'truefalse',
            isTrue: true,
            statement: '129 + 345 = 474'
          }
        },
        {
          id: 'q_add_5_5',
          type: 'choice',
          difficulty: 2,
          question: '599 + 234 = ?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { text: '833' },
              { text: '823' },
              { text: '843' },
              { text: '733' }
            ]
          }
        }
      ]
    }
  ]
};

export default unitAddition;
