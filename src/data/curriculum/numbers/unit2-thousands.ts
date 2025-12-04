import { LearningUnit } from '../../../types/curriculum';

// =============================================
// יחידה 2: אלפים - מספרים בני 4 ספרות
// =============================================

export const unit2Thousands: LearningUnit = {
  id: 'unit_2_thousands',
  number: 2,
  title: 'אלפים',
  description: 'מספרים גדולים יותר - מאלף ועד עשרת אלפים',
  icon: '🏆',

  objectives: [
    'להכיר את מקום האלפים',
    'לקרוא ולכתוב מספרים בני 4 ספרות',
    'להבין את היחס בין אלפים, מאות, עשרות ויחידות'
  ],

  prerequisites: ['unit_1_place_value'],

  masterySkills: [
    'קריאת מספרים בני 4 ספרות',
    'כתיבת מספרים באלפים',
    'זיהוי ערך ספרה במקום האלפים'
  ],

  steps: [
    // ========================================
    // שלב 1: למידה - מקום האלפים
    // ========================================
    {
      id: 'step_2_1_learn_thousands',
      type: 'learning',
      title: 'מקום האלפים',
      slides: [
        {
          id: 'slide_story',
          type: 'story',
          title: 'משימה חדשה',
          content: {
            emoji: '🎖️',
            text: 'הצלחת במשימה הראשונה! עכשיו יש כספת יותר מאובטחת.',
            subtext: 'הקוד הפעם בן 4 ספרות!',
            highlight: 'מספרים גדולים יותר = יותר ספרות'
          },
          animation: 'fade'
        },
        {
          id: 'slide_discovery',
          type: 'discovery',
          title: 'מקום חדש: אלפים',
          content: {
            emoji: '💡',
            text: 'משמאל למאות יש מקום חדש: האלפים!',
            subtext: 'אלפים | מאות | עשרות | יחידות',
            highlight: 'אלף = 1000 = עשר מאות!'
          },
          delay: 500
        },
        {
          id: 'slide_example',
          type: 'visual',
          title: 'דוגמה: 3,256',
          content: {
            emoji: '🎯',
            text: 'שלושת אלפים מאתיים חמישים ושש',
            subtext: '3 אלפים + 2 מאות + 5 עשרות + 6 יחידות',
            highlight: '3000 + 200 + 50 + 6 = 3,256'
          }
        },
        {
          id: 'slide_special',
          type: 'discovery',
          title: 'מילים מיוחדות',
          content: {
            emoji: '📚',
            text: 'יש מילים מיוחדות לאלפים:',
            subtext: 'אלף (1), אלפיים (2), שלושת אלפים (3)...',
            highlight: 'שים לב: "אלפיים" ולא "שני אלפים"'
          }
        },
        {
          id: 'slide_summary',
          type: 'summary',
          title: 'מה למדנו?',
          content: {
            emoji: '✨',
            text: 'מספר בן 4 ספרות מתחיל באלפים.',
            subtext: 'אלף אחד = 1,000 = עשר מאות',
            highlight: 'כל מקום שווה פי 10!'
          }
        }
      ]
    },

    // ========================================
    // שלב 2: תרגול - בחירה מרובה
    // ========================================
    {
      id: 'step_2_2_practice_choice',
      type: 'practice',
      title: 'קריאת אלפים',
      practiceType: 'choice',
      questions: [
        {
          id: 'q_2_2_1',
          type: 'choice',
          difficulty: 1,
          question: 'מה המספר "אלף שמונה מאות שלושים ושש"?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { text: '1,836' },
              { text: '1,386' },
              { text: '1,863' },
              { text: '8,136' }
            ]
          },
          hint: 'אלף = 1000, שמונה מאות = 800...'
        },
        {
          id: 'q_2_2_2',
          type: 'choice',
          difficulty: 1,
          question: 'מה המספר "שלושת אלפים חמש מאות שישים ושתיים"?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { text: '3,526' },
              { text: '3,562' },
              { text: '5,362' },
              { text: '3,652' }
            ]
          },
          hint: 'שלושת אלפים = 3000'
        },
        {
          id: 'q_2_2_3',
          type: 'choice',
          difficulty: 2,
          question: 'מה המספר "אלפיים ארבע מאות"?',
          answer: {
            type: 'choice',
            correctIndex: 2,
            options: [
              { text: '2,004' },
              { text: '2,040' },
              { text: '2,400' },
              { text: '4,200' }
            ]
          },
          hint: 'אלפיים = 2000, ארבע מאות = 400. מה בעשרות וביחידות?'
        },
        {
          id: 'q_2_2_4',
          type: 'choice',
          difficulty: 2,
          question: 'במספר 5,739 כמה שווה הספרה 5?',
          answer: {
            type: 'choice',
            correctIndex: 3,
            options: [
              { text: '5' },
              { text: '50' },
              { text: '500' },
              { text: '5,000' }
            ]
          },
          hint: '5 נמצא במקום האלפים'
        }
      ]
    },

    // ========================================
    // שלב 3: תרגול - נכון/לא נכון
    // ========================================
    {
      id: 'step_2_3_practice_truefalse',
      type: 'practice',
      title: 'נכון או לא?',
      practiceType: 'truefalse',
      questions: [
        {
          id: 'q_2_3_1',
          type: 'truefalse',
          difficulty: 1,
          question: '',
          answer: {
            type: 'truefalse',
            statement: '"אלפיים" נכתב 2,000',
            isTrue: true
          }
        },
        {
          id: 'q_2_3_2',
          type: 'truefalse',
          difficulty: 2,
          question: '',
          answer: {
            type: 'truefalse',
            statement: '4,500 = ארבעת אלפים וחמש מאות',
            isTrue: true
          }
        },
        {
          id: 'q_2_3_3',
          type: 'truefalse',
          difficulty: 2,
          question: '',
          answer: {
            type: 'truefalse',
            statement: '"שבעת אלפים ומאתיים" = 7,020',
            isTrue: false
          },
          explanation: 'לא נכון! מאתיים = 200, לא 20. התשובה: 7,200'
        },
        {
          id: 'q_2_3_4',
          type: 'truefalse',
          difficulty: 2,
          question: '',
          answer: {
            type: 'truefalse',
            statement: '3,000 + 500 + 60 + 2 = 3,562',
            isTrue: true
          }
        }
      ]
    },

    // ========================================
    // שלב 4: מבחן שליטה
    // ========================================
    {
      id: 'step_2_4_mastery',
      type: 'mastery',
      title: 'מבחן שליטה - אלפים',
      passingScore: 80,
      onFail: 'review',
      questions: [
        {
          id: 'q_2_4_1',
          type: 'choice',
          difficulty: 1,
          question: 'מה המספר "ארבעת אלפים שבע מאות ושמונים"?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { text: '4,780' },
              { text: '4,708' },
              { text: '4,870' },
              { text: '7,480' }
            ]
          }
        },
        {
          id: 'q_2_4_2',
          type: 'choice',
          difficulty: 2,
          question: 'במספר 6,204 כמה שווה הספרה 2?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { text: '2' },
              { text: '200' },
              { text: '20' },
              { text: '2,000' }
            ]
          }
        },
        {
          id: 'q_2_4_3',
          type: 'truefalse',
          difficulty: 2,
          question: '',
          answer: {
            type: 'truefalse',
            statement: '"תשעת אלפים מאה וחמישים" = 9,150',
            isTrue: true
          }
        },
        {
          id: 'q_2_4_4',
          type: 'choice',
          difficulty: 2,
          question: '5,000 + 300 + 20 + 1 = ?',
          answer: {
            type: 'choice',
            correctIndex: 2,
            options: [
              { text: '5,123' },
              { text: '5,231' },
              { text: '5,321' },
              { text: '5,312' }
            ]
          }
        },
        {
          id: 'q_2_4_5',
          type: 'choice',
          difficulty: 2,
          question: 'מה המספר "אלפיים וחמש עשרה"?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { text: '2,500' },
              { text: '2,015' },
              { text: '2,150' },
              { text: '2,050' }
            ]
          }
        }
      ]
    }
  ]
};

export default unit2Thousands;
