import { LearningUnit } from '../../../types/curriculum';

// =============================================
// יחידה 1: צורות גיאומטריות
// =============================================

export const unit1Shapes: LearningUnit = {
  id: 'unit_geo_1_shapes',
  number: 1,
  title: 'צורות גיאומטריות',
  description: 'מכירים את הריבוע, המלבן והמשולש',
  icon: '🔷',

  objectives: [
    'לזהות ריבוע, מלבן ומשולש',
    'להבין את התכונות של כל צורה',
    'להבדיל בין צורות לפי צלעות וזוויות'
  ],

  prerequisites: [],

  masterySkills: [
    'זיהוי צורות גיאומטריות',
    'הבנת תכונות הצורות',
    'השוואה בין צורות'
  ],

  steps: [
    // ========================================
    // שלב 1: למידה - הכרת הצורות
    // ========================================
    {
      id: 'step_geo_1_1_learn',
      type: 'learning',
      title: 'הכרת הצורות',
      slides: [
        {
          id: 'slide_intro',
          type: 'story',
          title: 'עולם הצורות',
          content: {
            emoji: '🌍',
            text: 'צורות נמצאות בכל מקום סביבנו!',
            subtext: 'חלון, דלת, סנדוויץ\' - הכל עשוי מצורות',
            highlight: 'בואו נלמד לזהות אותן!'
          },
          animation: 'fade'
        },
        {
          id: 'slide_square',
          type: 'visual',
          title: 'הריבוע',
          content: {
            emoji: '⬜',
            text: 'ריבוע = 4 צלעות שוות + 4 זוויות ישרות',
            subtext: 'כל הצלעות באותו אורך!',
            highlight: 'דוגמה: אריח רצפה, חלון מרובע'
          }
        },
        {
          id: 'slide_rectangle',
          type: 'visual',
          title: 'המלבן',
          content: {
            emoji: '📋',
            text: 'מלבן = 4 צלעות, 4 זוויות ישרות',
            subtext: '2 צלעות ארוכות + 2 צלעות קצרות',
            highlight: 'דוגמה: דלת, מחברת, טלפון'
          }
        },
        {
          id: 'slide_triangle',
          type: 'visual',
          title: 'המשולש',
          content: {
            emoji: '🔺',
            text: 'משולש = 3 צלעות + 3 זוויות',
            subtext: 'הצורה הכי פשוטה שיש!',
            highlight: 'דוגמה: פרוסת פיצה, סנדוויץ\' חתוך'
          }
        },
        {
          id: 'slide_summary',
          type: 'summary',
          title: 'סיכום',
          content: {
            emoji: '📝',
            text: 'ריבוע: 4 שוות | מלבן: 2+2 | משולש: 3',
            subtext: 'הסוד: לספור צלעות ולבדוק אורכים!',
            highlight: 'עכשיו אתם מומחי צורות!'
          }
        }
      ]
    },

    // ========================================
    // שלב 2: תרגול - זיהוי צורות
    // ========================================
    {
      id: 'step_geo_1_2_practice',
      type: 'practice',
      title: 'זהה את הצורה',
      practiceType: 'choice',
      questions: [
        {
          id: 'q_geo_1_1',
          type: 'choice',
          difficulty: 1,
          question: 'לאיזו צורה יש 3 צלעות?',
          answer: {
            type: 'choice',
            correctIndex: 2,
            options: [
              { text: 'ריבוע' },
              { text: 'מלבן' },
              { text: 'משולש' },
              { text: 'עיגול' }
            ]
          }
        },
        {
          id: 'q_geo_1_2',
          type: 'choice',
          difficulty: 1,
          question: 'באיזו צורה כל הצלעות שוות?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { text: 'ריבוע' },
              { text: 'מלבן' },
              { text: 'משולש' },
              { text: 'אף אחד' }
            ]
          }
        },
        {
          id: 'q_geo_1_3',
          type: 'truefalse',
          difficulty: 1,
          question: '',
          answer: {
            type: 'truefalse',
            isTrue: true,
            statement: 'למלבן יש 4 זוויות ישרות'
          }
        },
        {
          id: 'q_geo_1_4',
          type: 'truefalse',
          difficulty: 1,
          question: '',
          answer: {
            type: 'truefalse',
            isTrue: false,
            statement: 'לריבוע יש 2 צלעות ארוכות ו-2 קצרות'
          }
        }
      ],
      requiredCorrect: 3
    },

    // ========================================
    // שלב 3: מבחן שליטה
    // ========================================
    {
      id: 'step_geo_1_3_mastery',
      type: 'mastery',
      title: 'מבחן שליטה - צורות',
      passingScore: 80,
      onFail: 'review',
      questions: [
        {
          id: 'q_geo_m_1',
          type: 'choice',
          difficulty: 1,
          question: 'כמה צלעות יש לריבוע?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { text: '3' },
              { text: '4' },
              { text: '5' },
              { text: '6' }
            ]
          }
        },
        {
          id: 'q_geo_m_2',
          type: 'choice',
          difficulty: 1,
          question: 'מה ההבדל בין ריבוע למלבן?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { text: 'בריבוע כל הצלעות שוות' },
              { text: 'למלבן יותר צלעות' },
              { text: 'לריבוע אין זוויות ישרות' },
              { text: 'אין הבדל' }
            ]
          }
        },
        {
          id: 'q_geo_m_3',
          type: 'truefalse',
          difficulty: 1,
          question: '',
          answer: {
            type: 'truefalse',
            isTrue: true,
            statement: 'משולש הוא הצורה עם הכי פחות צלעות'
          }
        },
        {
          id: 'q_geo_m_4',
          type: 'choice',
          difficulty: 2,
          question: 'חלון מרובע עם כל הצלעות שוות הוא:',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { text: 'ריבוע' },
              { text: 'מלבן' },
              { text: 'משולש' },
              { text: 'עיגול' }
            ]
          }
        },
        {
          id: 'q_geo_m_5',
          type: 'choice',
          difficulty: 2,
          question: 'דף A4 הוא דוגמה ל:',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { text: 'ריבוע' },
              { text: 'מלבן' },
              { text: 'משולש' },
              { text: 'עיגול' }
            ]
          }
        }
      ]
    }
  ]
};

export default unit1Shapes;
