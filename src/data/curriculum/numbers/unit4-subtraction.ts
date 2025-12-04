import { LearningUnit } from '../../../types/curriculum';

// =============================================
// יחידה 4: חיסור במאונך - הבסיס
// =============================================

export const unit4Subtraction: LearningUnit = {
  id: 'unit_4_subtraction',
  number: 4,
  title: 'חיסור במאונך',
  description: 'לחסר ספרה ספרה - מימין לשמאל',
  icon: '➖',

  objectives: [
    'להבין את עקרון החיסור במאונך',
    'לחסר מספרים בני 2-3 ספרות ללא פריטה',
    'לסדר נכון תרגיל חיסור במאונך'
  ],

  prerequisites: ['unit_1_place_value'],

  steps: [
    // ========================================
    // שלב 1: למידה - חיסור במאונך
    // ========================================
    {
      id: 'step_4_1_learn_subtraction',
      type: 'learning',
      title: 'חיסור במאונך',
      slides: [
        {
          id: 'slide_story',
          type: 'story',
          title: 'משימה חדשה',
          content: {
            emoji: '🔓',
            text: 'הפעם הכספת דורשת לפתור תרגיל חיסור!',
            subtext: 'צריך לחסר שני מספרים כדי לקבל את הקוד.',
            highlight: 'חיסור במאונך = הדרך המהירה והקלה!'
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
            highlight: 'חשוב! המספר הגדול למעלה'
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
          id: 'slide_example',
          type: 'visual',
          title: 'דוגמה: 89 - 34',
          content: {
            emoji: '✏️',
            text: 'יחידות: 9 - 4 = 5',
            subtext: 'עשרות: 8 - 3 = 5',
            highlight: 'התשובה: 55'
          }
        },
        {
          id: 'slide_summary',
          type: 'summary',
          title: 'מה למדנו?',
          content: {
            emoji: '✨',
            text: 'חיסור במאונך: מסדרים ספרה מתחת לספרה',
            subtext: 'מתחילים מימין, חוסרים ספרה ספרה',
            highlight: 'פשוט ומדויק!'
          }
        }
      ]
    },

    // ========================================
    // שלב 2: תרגול - בחירה מרובה
    // ========================================
    {
      id: 'step_4_2_practice_choice',
      type: 'practice',
      title: 'תרגילי חיסור',
      practiceType: 'choice',
      questions: [
        {
          id: 'q_4_2_1',
          type: 'choice',
          difficulty: 1,
          question: '89 - 34 = ?',
          narrative: 'יחידות: 9-4, עשרות: 8-3',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { text: '55' },
              { text: '45' },
              { text: '65' },
              { text: '54' }
            ]
          },
          hint: 'חסר כל ספרה בנפרד'
        },
        {
          id: 'q_4_2_2',
          type: 'choice',
          difficulty: 1,
          question: '76 - 23 = ?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { text: '43' },
              { text: '53' },
              { text: '63' },
              { text: '52' }
            ]
          }
        },
        {
          id: 'q_4_2_3',
          type: 'choice',
          difficulty: 2,
          question: '567 - 234 = ?',
          narrative: 'שלוש ספרות!',
          answer: {
            type: 'choice',
            correctIndex: 2,
            options: [
              { text: '323' },
              { text: '343' },
              { text: '333' },
              { text: '313' }
            ]
          },
          hint: '7-4=3, 6-3=3, 5-2=3'
        },
        {
          id: 'q_4_2_4',
          type: 'choice',
          difficulty: 2,
          question: '985 - 423 = ?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { text: '562' },
              { text: '552' },
              { text: '572' },
              { text: '462' }
            ]
          }
        }
      ]
    },

    // ========================================
    // שלב 3: תרגול - נכון/לא נכון
    // ========================================
    {
      id: 'step_4_3_practice_truefalse',
      type: 'practice',
      title: 'נכון או לא?',
      practiceType: 'truefalse',
      questions: [
        {
          id: 'q_4_3_1',
          type: 'truefalse',
          difficulty: 1,
          question: '',
          answer: {
            type: 'truefalse',
            statement: '95 - 42 = 53',
            isTrue: true
          }
        },
        {
          id: 'q_4_3_2',
          type: 'truefalse',
          difficulty: 2,
          question: '',
          answer: {
            type: 'truefalse',
            statement: '678 - 345 = 333',
            isTrue: true
          }
        },
        {
          id: 'q_4_3_3',
          type: 'truefalse',
          difficulty: 2,
          question: '',
          answer: {
            type: 'truefalse',
            statement: '847 - 512 = 335',
            isTrue: true
          }
        },
        {
          id: 'q_4_3_4',
          type: 'truefalse',
          difficulty: 2,
          question: '',
          answer: {
            type: 'truefalse',
            statement: '999 - 111 = 898',
            isTrue: false
          },
          explanation: 'לא נכון! 999-111=888'
        }
      ]
    },

    // ========================================
    // שלב 4: מבחן שליטה
    // ========================================
    {
      id: 'step_4_4_mastery',
      type: 'mastery',
      title: 'מבחן שליטה - חיסור במאונך',
      passingScore: 80,
      questions: [
        {
          id: 'q_4_4_1',
          type: 'choice',
          difficulty: 1,
          question: '87 - 54 = ?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { text: '33' },
              { text: '43' },
              { text: '23' },
              { text: '32' }
            ]
          }
        },
        {
          id: 'q_4_4_2',
          type: 'choice',
          difficulty: 2,
          question: '496 - 123 = ?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { text: '363' },
              { text: '373' },
              { text: '383' },
              { text: '473' }
            ]
          }
        },
        {
          id: 'q_4_4_3',
          type: 'truefalse',
          difficulty: 2,
          question: '',
          answer: {
            type: 'truefalse',
            statement: '758 - 241 = 517',
            isTrue: true
          }
        },
        {
          id: 'q_4_4_4',
          type: 'choice',
          difficulty: 2,
          question: '879 - 456 = ?',
          answer: {
            type: 'choice',
            correctIndex: 2,
            options: [
              { text: '413' },
              { text: '433' },
              { text: '423' },
              { text: '443' }
            ]
          }
        },
        {
          id: 'q_4_4_5',
          type: 'truefalse',
          difficulty: 2,
          question: '',
          answer: {
            type: 'truefalse',
            statement: 'בחיסור במאונך מתחילים מהספרה השמאלית',
            isTrue: false
          },
          explanation: 'לא נכון! מתחילים מימין (יחידות)'
        }
      ]
    }
  ]
};

export default unit4Subtraction;
