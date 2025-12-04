import { LearningUnit } from '../../../types/curriculum';

// =============================================
// יחידה 5: מבחן סיכום - גיאומטריה
// =============================================

export const unit5Mastery: LearningUnit = {
  id: 'unit_geo_5_mastery',
  number: 5,
  title: 'מבחן סיכום',
  description: 'בדיקת שליטה בכל הנושאים',
  icon: '🏆',

  objectives: [
    'להוכיח שליטה בצורות',
    'להוכיח שליטה בהיקף ושטח',
    'להוכיח שליטה בזוויות'
  ],

  prerequisites: ['unit_geo_1_shapes', 'unit_geo_2_perimeter', 'unit_geo_3_area', 'unit_geo_4_angles'],

  masterySkills: [
    'שליטה מלאה בגיאומטריה של כיתה ד\'',
    'פתרון בעיות מילוליות',
    'יישום ידע בסיטואציות מעשיות'
  ],

  steps: [
    // ========================================
    // שלב 1: חזרה קצרה
    // ========================================
    {
      id: 'step_geo_5_1_review',
      type: 'learning',
      title: 'חזרה לפני המבחן',
      slides: [
        {
          id: 'slide_intro',
          type: 'story',
          title: 'מבחן הסיום!',
          content: {
            emoji: '🎯',
            text: 'הגיע הזמן להוכיח שאתם מומחי גיאומטריה!',
            subtext: 'בואו נזכר במה שלמדנו',
            highlight: '80% להצלחה!'
          },
          animation: 'fade'
        },
        {
          id: 'slide_shapes',
          type: 'summary',
          title: 'צורות',
          content: {
            emoji: '🔷',
            text: 'ריבוע: 4 צלעות שוות | מלבן: 2+2 | משולש: 3',
            subtext: 'כל הצורות האלה הן מצולעים',
            highlight: 'זוכרים את התכונות!'
          }
        },
        {
          id: 'slide_perimeter',
          type: 'summary',
          title: 'היקף',
          content: {
            emoji: '📏',
            text: 'היקף = סכום כל הצלעות',
            subtext: 'ריבוע: צלע×4 | מלבן: (א+ר)×2',
            highlight: 'הולכים סביב הצורה!'
          }
        },
        {
          id: 'slide_area',
          type: 'summary',
          title: 'שטח',
          content: {
            emoji: '📐',
            text: 'שטח = כמה מקום בפנים',
            subtext: 'ריבוע: צלע×צלע | מלבן: אורך×רוחב',
            highlight: 'כפל, לא חיבור!'
          }
        },
        {
          id: 'slide_angles',
          type: 'summary',
          title: 'זוויות',
          content: {
            emoji: '📐',
            text: 'חדה < 90° < קהה',
            subtext: 'זווית ישרה = 90° בדיוק',
            highlight: 'פינות ריבוע = זוויות ישרות'
          }
        },
        {
          id: 'slide_ready',
          type: 'story',
          title: 'מוכנים?',
          content: {
            emoji: '💪',
            text: 'אתם יודעים את הכל!',
            subtext: 'קראו בזהירות ואל תמהרו',
            highlight: 'בהצלחה!'
          }
        }
      ]
    },

    // ========================================
    // שלב 2: מבחן סיכום
    // ========================================
    {
      id: 'step_geo_5_2_final',
      type: 'mastery',
      title: 'מבחן סיכום - גיאומטריה',
      passingScore: 80,
      questions: [
        // צורות
        {
          id: 'q_final_1',
          type: 'choice',
          difficulty: 1,
          question: 'לאיזו צורה כל הצלעות שוות?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { text: 'ריבוע' },
              { text: 'מלבן' },
              { text: 'משולש' },
              { text: 'כולם' }
            ]
          }
        },
        {
          id: 'q_final_2',
          type: 'choice',
          difficulty: 1,
          question: 'כמה צלעות יש למלבן?',
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
        // היקף
        {
          id: 'q_final_3',
          type: 'choice',
          difficulty: 1,
          question: 'מה היקף ריבוע עם צלע 8?',
          answer: {
            type: 'choice',
            correctIndex: 2,
            options: [
              { text: '16' },
              { text: '64' },
              { text: '32' },
              { text: '24' }
            ]
          }
        },
        {
          id: 'q_final_4',
          type: 'choice',
          difficulty: 2,
          question: 'מה היקף מלבן עם אורך 10 ורוחב 6?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { text: '16' },
              { text: '32' },
              { text: '60' },
              { text: '26' }
            ]
          }
        },
        // שטח
        {
          id: 'q_final_5',
          type: 'choice',
          difficulty: 1,
          question: 'מה שטח ריבוע עם צלע 6?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { text: '36' },
              { text: '24' },
              { text: '12' },
              { text: '42' }
            ]
          }
        },
        {
          id: 'q_final_6',
          type: 'choice',
          difficulty: 2,
          question: 'מה שטח מלבן עם אורך 7 ורוחב 5?',
          answer: {
            type: 'choice',
            correctIndex: 2,
            options: [
              { text: '12' },
              { text: '24' },
              { text: '35' },
              { text: '70' }
            ]
          }
        },
        // זוויות
        {
          id: 'q_final_7',
          type: 'choice',
          difficulty: 1,
          question: 'זווית של 60° היא:',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { text: 'חדה' },
              { text: 'ישרה' },
              { text: 'קהה' },
              { text: 'שטוחה' }
            ]
          }
        },
        {
          id: 'q_final_8',
          type: 'truefalse',
          difficulty: 1,
          question: '',
          answer: {
            type: 'truefalse',
            isTrue: true,
            statement: 'זווית ישרה היא 90 מעלות'
          }
        },
        // שילוב
        {
          id: 'q_final_9',
          type: 'choice',
          difficulty: 2,
          question: 'גינה ריבועית עם צלע 5 מ\'. כמה מ"ר דשא צריך?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { text: '20 מ"ר' },
              { text: '25 מ"ר' },
              { text: '10 מ"ר' },
              { text: '50 מ"ר' }
            ]
          }
        },
        {
          id: 'q_final_10',
          type: 'choice',
          difficulty: 2,
          question: 'חדר מלבני 4×3 מ\'. כמה מטרים פנלים להיקף?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { text: '14 מ\'' },
              { text: '12 מ\'' },
              { text: '7 מ\'' },
              { text: '24 מ\'' }
            ]
          }
        }
      ]
    }
  ]
};

export default unit5Mastery;
