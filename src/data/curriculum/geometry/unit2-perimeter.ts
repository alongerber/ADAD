import { LearningUnit } from '../../../types/curriculum';

// =============================================
// יחידה 2: היקף
// =============================================

export const unit2Perimeter: LearningUnit = {
  id: 'unit_geo_2_perimeter',
  number: 2,
  title: 'היקף',
  description: 'לחשב את סכום הצלעות של צורה',
  icon: '📏',

  objectives: [
    'להבין מהו היקף',
    'לחשב היקף של ריבוע ומלבן',
    'להשתמש בנוסחאות היקף'
  ],

  prerequisites: ['unit_geo_1_shapes'],

  masterySkills: [
    'חישוב היקף ריבוע',
    'חישוב היקף מלבן',
    'פתרון בעיות מילוליות עם היקף'
  ],

  steps: [
    // ========================================
    // שלב 1: למידה - מהו היקף?
    // ========================================
    {
      id: 'step_geo_2_1_learn',
      type: 'learning',
      title: 'מהו היקף?',
      slides: [
        {
          id: 'slide_intro',
          type: 'story',
          title: 'גדר סביב הגינה',
          content: {
            emoji: '🏡',
            text: 'רוצים לבנות גדר סביב גינה מלבנית',
            subtext: 'כמה מטרים של גדר צריך?',
            highlight: 'צריך לחשב את ההיקף!'
          },
          animation: 'fade'
        },
        {
          id: 'slide_definition',
          type: 'discovery',
          title: 'היקף = סכום הצלעות',
          content: {
            emoji: '🔄',
            text: 'היקף = אם הולכים סביב כל הצורה',
            subtext: 'כמה מטרים הלכנו בסך הכל?',
            highlight: 'פשוט מחברים את כל הצלעות!'
          },
          delay: 500
        },
        {
          id: 'slide_square',
          type: 'visual',
          title: 'היקף ריבוע',
          content: {
            emoji: '⬜',
            text: 'ריבוע עם צלע 5 ס"מ',
            subtext: 'היקף = 5 + 5 + 5 + 5 = 20',
            highlight: 'קיצור: היקף = צלע × 4'
          }
        },
        {
          id: 'slide_rectangle',
          type: 'visual',
          title: 'היקף מלבן',
          content: {
            emoji: '📋',
            text: 'מלבן: אורך 8, רוחב 3',
            subtext: 'היקף = 8 + 3 + 8 + 3 = 22',
            highlight: 'קיצור: היקף = (אורך + רוחב) × 2'
          }
        },
        {
          id: 'slide_summary',
          type: 'summary',
          title: 'נוסחאות',
          content: {
            emoji: '📐',
            text: 'ריבוע: צלע × 4',
            subtext: 'מלבן: (אורך + רוחב) × 2',
            highlight: 'או פשוט לחבר את כל הצלעות!'
          }
        }
      ]
    },

    // ========================================
    // שלב 2: תרגול - היקף ריבוע
    // ========================================
    {
      id: 'step_geo_2_2_practice_square',
      type: 'practice',
      title: 'היקף ריבוע',
      practiceType: 'choice',
      questions: [
        {
          id: 'q_per_1',
          type: 'choice',
          difficulty: 1,
          question: 'מה היקף ריבוע עם צלע 3 ס"מ?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { text: '9 ס"מ' },
              { text: '12 ס"מ' },
              { text: '6 ס"מ' },
              { text: '15 ס"מ' }
            ]
          }
        },
        {
          id: 'q_per_2',
          type: 'choice',
          difficulty: 1,
          question: 'מה היקף ריבוע עם צלע 7 ס"מ?',
          answer: {
            type: 'choice',
            correctIndex: 2,
            options: [
              { text: '14 ס"מ' },
              { text: '21 ס"מ' },
              { text: '28 ס"מ' },
              { text: '49 ס"מ' }
            ]
          }
        },
        {
          id: 'q_per_3',
          type: 'choice',
          difficulty: 2,
          question: 'היקף ריבוע הוא 20 ס"מ. מה אורך הצלע?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { text: '5 ס"מ' },
              { text: '4 ס"מ' },
              { text: '10 ס"מ' },
              { text: '80 ס"מ' }
            ]
          }
        }
      ],
      requiredCorrect: 2
    },

    // ========================================
    // שלב 3: תרגול - היקף מלבן
    // ========================================
    {
      id: 'step_geo_2_3_practice_rect',
      type: 'practice',
      title: 'היקף מלבן',
      practiceType: 'choice',
      questions: [
        {
          id: 'q_per_4',
          type: 'choice',
          difficulty: 1,
          question: 'מה היקף מלבן עם אורך 5 ורוחב 3?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { text: '8' },
              { text: '16' },
              { text: '15' },
              { text: '30' }
            ]
          }
        },
        {
          id: 'q_per_5',
          type: 'choice',
          difficulty: 2,
          question: 'מה היקף מלבן עם אורך 10 ורוחב 4?',
          answer: {
            type: 'choice',
            correctIndex: 2,
            options: [
              { text: '14' },
              { text: '40' },
              { text: '28' },
              { text: '24' }
            ]
          }
        },
        {
          id: 'q_per_6',
          type: 'choice',
          difficulty: 2,
          question: 'גינה מלבנית: אורך 12 מ\', רוחב 8 מ\'. כמה מטרים גדר צריך?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { text: '40 מ\'' },
              { text: '96 מ\'' },
              { text: '20 מ\'' },
              { text: '48 מ\'' }
            ]
          }
        }
      ],
      requiredCorrect: 2
    },

    // ========================================
    // שלב 4: מבחן שליטה
    // ========================================
    {
      id: 'step_geo_2_4_mastery',
      type: 'mastery',
      title: 'מבחן שליטה - היקף',
      passingScore: 80,
      onFail: 'review',
      questions: [
        {
          id: 'q_per_m_1',
          type: 'choice',
          difficulty: 1,
          question: 'מה היקף ריבוע עם צלע 6 ס"מ?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { text: '12 ס"מ' },
              { text: '24 ס"מ' },
              { text: '36 ס"מ' },
              { text: '18 ס"מ' }
            ]
          }
        },
        {
          id: 'q_per_m_2',
          type: 'choice',
          difficulty: 1,
          question: 'מה היקף מלבן עם אורך 7 ורוחב 3?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { text: '20' },
              { text: '21' },
              { text: '10' },
              { text: '14' }
            ]
          }
        },
        {
          id: 'q_per_m_3',
          type: 'truefalse',
          difficulty: 2,
          question: '',
          answer: {
            type: 'truefalse',
            isTrue: true,
            statement: 'היקף ריבוע עם צלע 4 שווה להיקף מלבן עם אורך 5 ורוחב 3'
          }
        },
        {
          id: 'q_per_m_4',
          type: 'choice',
          difficulty: 2,
          question: 'מגרש ריבועי עם צלע 25 מ\'. כמה מטרים גדר צריך?',
          answer: {
            type: 'choice',
            correctIndex: 2,
            options: [
              { text: '50 מ\'' },
              { text: '625 מ\'' },
              { text: '100 מ\'' },
              { text: '75 מ\'' }
            ]
          }
        },
        {
          id: 'q_per_m_5',
          type: 'choice',
          difficulty: 2,
          question: 'היקף מלבן הוא 30. האורך הוא 10. מה הרוחב?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { text: '5' },
              { text: '10' },
              { text: '20' },
              { text: '15' }
            ]
          }
        }
      ]
    }
  ]
};

export default unit2Perimeter;
