import { LearningUnit } from '../../../types/curriculum';

// =============================================
// יחידה 1: ערך המקום - מאות, עשרות, יחידות
// הבסיס להבנת מספרים גדולים
// =============================================

export const unit1PlaceValue: LearningUnit = {
  id: 'unit_1_place_value',
  number: 1,
  title: 'ערך המקום',
  description: 'מאות, עשרות ויחידות - הבסיס לכתיבת כל המספרים',
  icon: '🔢',

  objectives: [
    'להבין שכל ספרה במספר יש לה משמעות לפי המקום שלה',
    'לדעת לפרק מספר למאות, עשרות ויחידות',
    'לכתוב מספרים מתוך מילים ולהפך'
  ],

  prerequisites: [],

  masterySkills: [
    'זיהוי ספרות במקום מאות, עשרות, יחידות',
    'פירוק מספרים לערכי מקום',
    'כתיבת מספרים במילים ובספרות'
  ],

  steps: [
    // ========================================
    // שלב 1: למידה - מהו ערך המקום?
    // ========================================
    {
      id: 'step_1_1_learn_place_value',
      type: 'learning',
      title: 'מהו ערך המקום?',
      slides: [
        {
          id: 'slide_story',
          type: 'story',
          title: 'הכספת הסודית',
          content: {
            emoji: '🔐',
            text: 'אתה סוכן חשאי! קיבלת משימה לפתוח כספת סודית.',
            subtext: 'הקוד לכספת הוא מספר בן 3 ספרות...',
            highlight: 'כל ספרה במקום שלה!'
          },
          animation: 'fade'
        },
        {
          id: 'slide_discovery',
          type: 'discovery',
          title: 'שלוש עמדות',
          content: {
            emoji: '💡',
            text: 'במספר בן 3 ספרות יש 3 מקומות:',
            subtext: 'מאות | עשרות | יחידות',
            highlight: 'כל מקום שווה פי 10 מהמקום שמימינו!'
          },
          delay: 500
        },
        {
          id: 'slide_example',
          type: 'visual',
          title: 'דוגמה: 425',
          content: {
            emoji: '🎯',
            text: 'ארבע מאות עשרים וחמש',
            subtext: '4 מאות + 2 עשרות + 5 יחידות',
            highlight: '400 + 20 + 5 = 425'
          }
        },
        {
          id: 'slide_trick',
          type: 'discovery',
          title: 'הטריק של הסוכן',
          content: {
            emoji: '🕵️',
            text: 'איך לקרוא מספר?',
            subtext: 'מתחילים מצד שמאל! ראשון - מאות, אחר כך עשרות, ואז יחידות.',
            highlight: 'תמיד מתחילים מהספרה הכי גדולה!'
          }
        },
        {
          id: 'slide_summary',
          type: 'summary',
          title: 'מה למדנו?',
          content: {
            emoji: '✨',
            text: 'כל ספרה במספר יש לה ערך לפי המקום שלה.',
            subtext: 'אותה ספרה יכולה לייצג 4, או 40, או 400!',
            highlight: 'המקום קובע את הערך'
          }
        }
      ]
    },

    // ========================================
    // שלב 2: תרגול - זיהוי מקומות
    // ========================================
    {
      id: 'step_1_2_practice_identify',
      type: 'practice',
      title: 'זיהוי מקומות',
      practiceType: 'choice',
      questions: [
        {
          id: 'q_1_2_1',
          type: 'choice',
          difficulty: 1,
          question: 'במספר 358, מה הספרה במקום המאות?',
          narrative: 'המאות תמיד בצד שמאל',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { text: '3' },
              { text: '5' },
              { text: '8' },
              { text: '35' }
            ]
          },
          hint: 'המאות הן הספרה הכי שמאלית במספר בן 3 ספרות',
          explanation: '3 מאות = 300'
        },
        {
          id: 'q_1_2_2',
          type: 'choice',
          difficulty: 1,
          question: 'במספר 472, מה הספרה במקום העשרות?',
          narrative: 'העשרות באמצע',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { text: '4' },
              { text: '7' },
              { text: '2' },
              { text: '47' }
            ]
          },
          hint: 'העשרות הן הספרה האמצעית',
          explanation: '7 עשרות = 70'
        },
        {
          id: 'q_1_2_3',
          type: 'choice',
          difficulty: 1,
          question: 'במספר 691, מה הספרה במקום היחידות?',
          narrative: 'היחידות בצד ימין',
          answer: {
            type: 'choice',
            correctIndex: 2,
            options: [
              { text: '6' },
              { text: '9' },
              { text: '1' },
              { text: '91' }
            ]
          },
          hint: 'היחידות הן הספרה הכי ימנית',
          explanation: '1 יחידה = 1'
        },
        {
          id: 'q_1_2_4',
          type: 'choice',
          difficulty: 2,
          question: 'כמה שווה הספרה 5 במספר 527?',
          narrative: 'הספרה 5 נמצאת במקום ה...',
          answer: {
            type: 'choice',
            correctIndex: 2,
            options: [
              { text: '5' },
              { text: '50' },
              { text: '500' },
              { text: '52' }
            ]
          },
          hint: '5 נמצאת במקום המאות',
          explanation: '5 במקום המאות = 500'
        }
      ]
    },

    // ========================================
    // שלב 3: תרגול - נכון/לא נכון
    // ========================================
    {
      id: 'step_1_3_practice_truefalse',
      type: 'practice',
      title: 'נכון או לא?',
      practiceType: 'truefalse',
      questions: [
        {
          id: 'q_1_3_1',
          type: 'truefalse',
          difficulty: 1,
          question: '',
          answer: {
            type: 'truefalse',
            statement: 'במספר 246, הספרה 4 נמצאת במקום העשרות',
            isTrue: true
          },
          explanation: 'נכון! 4 באמצע = 4 עשרות = 40'
        },
        {
          id: 'q_1_3_2',
          type: 'truefalse',
          difficulty: 1,
          question: '',
          answer: {
            type: 'truefalse',
            statement: 'במספר 815, הספרה 8 שווה 80',
            isTrue: false
          },
          explanation: 'לא נכון! 8 במקום המאות = 800'
        },
        {
          id: 'q_1_3_3',
          type: 'truefalse',
          difficulty: 2,
          question: '',
          answer: {
            type: 'truefalse',
            statement: '300 + 50 + 7 = 357',
            isTrue: true
          },
          explanation: 'נכון! 3 מאות + 5 עשרות + 7 יחידות = 357'
        },
        {
          id: 'q_1_3_4',
          type: 'truefalse',
          difficulty: 2,
          question: '',
          answer: {
            type: 'truefalse',
            statement: 'המספר "שלוש מאות ושמונים" נכתב 308',
            isTrue: false
          },
          explanation: 'לא נכון! שלוש מאות ושמונים = 380 (8 עשרות, לא 8 יחידות)'
        }
      ]
    },

    // ========================================
    // שלב 4: תרגול - התאמה
    // ========================================
    {
      id: 'step_1_4_practice_match',
      type: 'practice',
      title: 'התאמה',
      practiceType: 'match',
      questions: [
        {
          id: 'q_1_4_1',
          type: 'match',
          difficulty: 2,
          question: 'התאם בין המספר במילים לספרות',
          answer: {
            type: 'match',
            pairs: [
              { left: 'ארבע מאות עשרים וחמש', right: '425' },
              { left: 'שש מאות שבעים ושמונה', right: '678' },
              { left: 'שלוש מאות חמישים', right: '350' },
              { left: 'תשע מאות ותשע', right: '909' }
            ]
          },
          hint: 'קרא את המילים לאט ותרגם ספרה ספרה'
        }
      ]
    },

    // ========================================
    // שלב 5: מבחן שליטה
    // ========================================
    {
      id: 'step_1_5_mastery',
      type: 'mastery',
      title: 'מבחן שליטה - ערך המקום',
      passingScore: 80,
      onFail: 'review',
      questions: [
        {
          id: 'q_1_5_1',
          type: 'choice',
          difficulty: 1,
          question: 'מה המספר "חמש מאות שישים ושלוש"?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { text: '536' },
              { text: '563' },
              { text: '653' },
              { text: '365' }
            ]
          }
        },
        {
          id: 'q_1_5_2',
          type: 'choice',
          difficulty: 2,
          question: 'במספר 847, כמה שווה הספרה 4?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { text: '4' },
              { text: '40' },
              { text: '400' },
              { text: '84' }
            ]
          }
        },
        {
          id: 'q_1_5_3',
          type: 'truefalse',
          difficulty: 2,
          question: '',
          answer: {
            type: 'truefalse',
            statement: 'המספר 729 = 700 + 20 + 9',
            isTrue: true
          }
        },
        {
          id: 'q_1_5_4',
          type: 'choice',
          difficulty: 2,
          question: '200 + 60 + 4 = ?',
          answer: {
            type: 'choice',
            correctIndex: 2,
            options: [
              { text: '2064' },
              { text: '246' },
              { text: '264' },
              { text: '624' }
            ]
          }
        },
        {
          id: 'q_1_5_5',
          type: 'truefalse',
          difficulty: 2,
          question: '',
          answer: {
            type: 'truefalse',
            statement: '"שבע מאות וארבעים" נכתב 740',
            isTrue: true
          }
        }
      ]
    }
  ]
};

export default unit1PlaceValue;
