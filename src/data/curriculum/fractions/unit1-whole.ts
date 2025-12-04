import { LearningUnit } from '../../../types/curriculum';

// =============================================
// יחידה 1: מה זה שלם?
// הבסיס לכל - לפני שמדברים על חלקים
// =============================================

export const unit1Whole: LearningUnit = {
  id: 'unit_1_whole',
  number: 1,
  title: 'מה זה שלם?',
  description: 'הבסיס לכל - להבין מה זה שלם לפני שמדברים על חלקים',
  icon: '🍕',

  objectives: [
    'להבין מה זה "שלם" - משהו שלא חסר ממנו כלום',
    'להבין שכשחותכים שלם לחלקים, עדיין יש את אותה כמות',
    'להבין למה חשוב שחלקים יהיו שווים בגודל'
  ],

  prerequisites: [], // אין - זו יחידה ראשונה

  steps: [
    // ========================================
    // שלב 1: למידה - מה זה שלם?
    // ========================================
    {
      id: 'step_1_1_learn_whole',
      type: 'learning',
      title: 'מה זה שלם?',
      slides: [
        {
          id: 'slide_story',
          type: 'story',
          title: 'סיפור הפיצה',
          content: {
            emoji: '🍕',
            text: 'היום יום הולדת! הזמנת פיצה מהמקום הכי טעים בשכונה.',
            subtext: 'הפיצה הגיעה חמה וריחנית... ממש שלמה!',
            highlight: 'שלם = הכל, בלי שחסר כלום'
          },
          animation: 'fade'
        },
        {
          id: 'slide_examples',
          type: 'visual',
          title: 'דברים שלמים',
          content: {
            text: 'הנה עוד דברים שלמים:',
            visual: {
              type: 'custom',
              props: { showLabels: true }
            },
            subtext: '🍎 תפוח שלם | 🍫 שוקולד שלם | 🥧 עוגה שלמה'
          }
        },
        {
          id: 'slide_discovery',
          type: 'discovery',
          title: 'שאלה למחשבה',
          content: {
            emoji: '🤔',
            question: 'מה קורה כשחותכים פיצה שלמה?',
            text: 'נגיד שחתכנו את הפיצה ל-4 משולשים...',
            subtext: 'האם עכשיו יש פחות פיצה?'
          },
          delay: 500
        },
        {
          id: 'slide_insight',
          type: 'visual',
          title: 'התגלית הגדולה!',
          content: {
            emoji: '💡',
            text: 'לא! יש את אותה כמות פיצה!',
            highlight: 'רק חילקנו אותה לחלקים.',
            visual: {
              type: 'pizza',
              props: { slices: 4, filled: 4, showLabels: true }
            },
            subtext: 'כל 4 המשולשים ביחד = הפיצה השלמה'
          },
          animation: 'bounce'
        },
        {
          id: 'slide_summary',
          type: 'summary',
          title: 'מה למדנו?',
          content: {
            emoji: '✨',
            text: 'שלם זה משהו שלא חסר ממנו כלום.',
            subtext: 'כשחותכים שלם לחלקים - עדיין יש את אותה כמות!',
            highlight: 'הפיצה לא נעלמה, רק התחלקה.'
          }
        }
      ]
    },

    // ========================================
    // שלב 2: תרגול - זיהוי שלמים (בחירה מרובה)
    // ========================================
    {
      id: 'step_1_2_practice_identify',
      type: 'practice',
      title: 'זיהוי שלמים',
      practiceType: 'choice',
      questions: [
        {
          id: 'q_1_2_1',
          type: 'choice',
          difficulty: 1,
          question: 'מה שלם?',
          narrative: 'מצא את הדבר שלא חסר ממנו כלום',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { visual: { type: 'pizza', props: { slices: 4, filled: 4 } }, text: 'פיצה שלמה' },
              { visual: { type: 'pizza', props: { slices: 4, filled: 2 } }, text: 'חצי פיצה' },
              { visual: { type: 'pizza', props: { slices: 4, filled: 1 } }, text: 'רבע פיצה' },
              { visual: { type: 'pizza', props: { slices: 4, filled: 3 } }, text: 'שלושה רבעים' }
            ]
          },
          hint: 'שלם = כל החלקים מלאים',
          explanation: 'פיצה שלמה = כל 4 החלקים!'
        },
        {
          id: 'q_1_2_2',
          type: 'choice',
          difficulty: 1,
          question: 'מה לא שלם?',
          narrative: 'מצא את הדבר שחסר ממנו משהו',
          answer: {
            type: 'choice',
            correctIndex: 2,
            options: [
              { visual: { type: 'pizza', props: { slices: 2, filled: 2 } }, text: 'עוגה שלמה' },
              { visual: { type: 'beaker', props: { slices: 4, filled: 4 } }, text: 'כוס מלאה' },
              { visual: { type: 'pizza', props: { slices: 4, filled: 1 } }, text: 'חתיכה אחת' },
              { visual: { type: 'chocolate', props: { slices: 4, filled: 4 } }, text: 'שוקולד שלם' }
            ]
          },
          hint: 'חפש משהו שחסר ממנו',
          explanation: 'חתיכה אחת = חסרות 3 חתיכות!'
        },
        {
          id: 'q_1_2_3',
          type: 'choice',
          difficulty: 2,
          question: 'כמה חלקים יש בפיצה שלמה אם חתכנו ל-4?',
          answer: {
            type: 'choice',
            correctIndex: 3,
            options: [
              { text: '1' },
              { text: '2' },
              { text: '3' },
              { text: '4' }
            ]
          },
          hint: 'חתכנו ל-4, אז יש...',
          explanation: 'אם חתכנו ל-4, יש 4 חלקים!'
        }
      ],
      requiredCorrect: 2
    },

    // ========================================
    // שלב 3: למידה - חלקים שווים
    // ========================================
    {
      id: 'step_1_3_learn_equal',
      type: 'learning',
      title: 'חלקים שווים',
      slides: [
        {
          id: 'slide_problem',
          type: 'story',
          title: 'בעיה במסיבה',
          content: {
            emoji: '😕',
            text: 'יש לך חבר שתמיד רוצה את החלק הגדול!',
            subtext: 'איך מחלקים בצורה הוגנת?',
            question: 'מה הפתרון?'
          }
        },
        {
          id: 'slide_unfair',
          type: 'visual',
          title: 'חלוקה לא הוגנת',
          content: {
            emoji: '❌',
            text: 'אם חותכים ככה...',
            visual: {
              type: 'custom',
              props: { showLabels: true }
            },
            subtext: 'חלק אחד גדול וחלק אחד קטן - לא הוגן!'
          }
        },
        {
          id: 'slide_fair',
          type: 'visual',
          title: 'חלוקה הוגנת!',
          content: {
            emoji: '✅',
            text: 'אבל אם חותכים ככה...',
            visual: {
              type: 'pizza',
              props: { slices: 2, filled: 2, showLabels: true }
            },
            highlight: 'שני החלקים שווים בדיוק!',
            subtext: 'עכשיו כולם מרוצים 😊'
          },
          animation: 'bounce'
        },
        {
          id: 'slide_rule',
          type: 'summary',
          title: 'הכלל החשוב',
          content: {
            emoji: '⭐',
            highlight: 'כשמחלקים לשברים - כל החלקים חייבים להיות שווים בגודל!',
            text: 'רק ככה החלוקה הוגנת.',
            subtext: 'וזה גם מה שעוזר לנו לחשב בקלות.'
          }
        }
      ]
    },

    // ========================================
    // שלב 4: תרגול - זיהוי חלוקה שווה (נכון/לא נכון)
    // ========================================
    {
      id: 'step_1_4_practice_equal',
      type: 'practice',
      title: 'חלוקה שווה',
      practiceType: 'truefalse',
      questions: [
        {
          id: 'q_1_4_1',
          type: 'truefalse',
          difficulty: 1,
          question: 'האם החלוקה הוגנת?',
          narrative: 'פיצה חתוכה ל-4 משולשים שווים',
          answer: {
            type: 'truefalse',
            isTrue: true,
            statement: 'אם כל 4 המשולשים שווים בגודל - זו חלוקה הוגנת'
          },
          hint: 'בדוק אם כל החלקים באותו גודל',
          explanation: 'נכון! כשכולם שווים - זה הוגן.'
        },
        {
          id: 'q_1_4_2',
          type: 'truefalse',
          difficulty: 1,
          question: 'האם זה נכון?',
          answer: {
            type: 'truefalse',
            isTrue: false,
            statement: 'אפשר לקרוא "חצי" לחלוקה שבה חלק אחד גדול מהשני'
          },
          hint: 'חצי אמיתי = שני חלקים שווים',
          explanation: 'לא נכון! חצי זה רק כששני החלקים שווים בדיוק.'
        },
        {
          id: 'q_1_4_3',
          type: 'truefalse',
          difficulty: 2,
          question: 'נכון או לא?',
          answer: {
            type: 'truefalse',
            isTrue: true,
            statement: 'כשחותכים עוגה ל-4 חלקים שווים, כל חלק נקרא רבע'
          },
          hint: 'רבע = 1 מתוך 4 חלקים שווים',
          explanation: 'נכון! רבע = אחד מתוך ארבעה חלקים שווים.'
        }
      ],
      requiredCorrect: 2
    },

    // ========================================
    // שלב 5: מבחן שליטה
    // ========================================
    {
      id: 'step_1_5_mastery',
      type: 'mastery',
      title: 'בדיקת הבנה',
      questions: [
        {
          id: 'mastery_1_1',
          type: 'choice',
          difficulty: 2,
          question: 'מה זה "שלם"?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { text: 'חצי מהפיצה' },
              { text: 'משהו שלא חסר ממנו כלום' },
              { text: 'רבע מהעוגה' },
              { text: 'חלק קטן' }
            ]
          }
        },
        {
          id: 'mastery_1_2',
          type: 'truefalse',
          difficulty: 2,
          question: '',
          answer: {
            type: 'truefalse',
            isTrue: true,
            statement: 'כשחותכים פיצה שלמה ל-4 חלקים, עדיין יש את אותה כמות פיצה'
          }
        },
        {
          id: 'mastery_1_3',
          type: 'choice',
          difficulty: 2,
          question: 'למה חשוב שחלקים יהיו שווים?',
          answer: {
            type: 'choice',
            correctIndex: 2,
            options: [
              { text: 'כי ככה יותר יפה' },
              { text: 'כי ככה יותר קל לחתוך' },
              { text: 'כי ככה החלוקה הוגנת' },
              { text: 'אין סיבה מיוחדת' }
            ]
          }
        },
        {
          id: 'mastery_1_4',
          type: 'truefalse',
          difficulty: 3,
          question: '',
          answer: {
            type: 'truefalse',
            isTrue: false,
            statement: 'אם חלק אחד גדול מהשני, עדיין אפשר לקרוא לזה "חצי"'
          }
        },
        {
          id: 'mastery_1_5',
          type: 'choice',
          difficulty: 3,
          question: 'פיצה חתוכה ל-4 משולשים שווים. כמה משולשים עושים פיצה שלמה?',
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
        }
      ],
      passingScore: 80,
      onFail: 'review'
    }
  ],

  masterySkills: [
    'יודע מה זה שלם',
    'מבין שחיתוך לא משנה את הכמות',
    'מבין למה חלקים צריכים להיות שווים'
  ]
};
