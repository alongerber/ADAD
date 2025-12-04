import { LearningUnit } from '../../../types/curriculum';

// =============================================
// יחידה 3: שטח
// =============================================

export const unit3Area: LearningUnit = {
  id: 'unit_geo_3_area',
  number: 3,
  title: 'שטח',
  description: 'לחשב כמה מקום תופסת צורה',
  icon: '📐',

  objectives: [
    'להבין מהו שטח',
    'לחשב שטח ריבוע ומלבן',
    'להבדיל בין היקף לשטח'
  ],

  prerequisites: ['unit_geo_2_perimeter'],

  masterySkills: [
    'חישוב שטח ריבוע',
    'חישוב שטח מלבן',
    'הבחנה בין היקף לשטח'
  ],

  steps: [
    // ========================================
    // שלב 1: למידה - מהו שטח?
    // ========================================
    {
      id: 'step_geo_3_1_learn',
      type: 'learning',
      title: 'מהו שטח?',
      slides: [
        {
          id: 'slide_intro',
          type: 'story',
          title: 'לצבוע את הקיר',
          content: {
            emoji: '🎨',
            text: 'רוצים לצבוע קיר מלבני',
            subtext: 'כמה צבע צריך לקנות?',
            highlight: 'צריך לחשב את השטח!'
          },
          animation: 'fade'
        },
        {
          id: 'slide_definition',
          type: 'discovery',
          title: 'שטח = כמה מקום בפנים',
          content: {
            emoji: '🔲',
            text: 'שטח = כמה ריבועים קטנים נכנסים בצורה',
            subtext: 'מודדים ב"סנטימטר רבוע" (ס"מ²)',
            highlight: 'היקף = סביב, שטח = בפנים!'
          },
          delay: 500
        },
        {
          id: 'slide_square',
          type: 'visual',
          title: 'שטח ריבוע',
          content: {
            emoji: '⬜',
            text: 'ריבוע עם צלע 4 ס"מ',
            subtext: 'שטח = 4 × 4 = 16 ס"מ²',
            highlight: 'נוסחה: שטח = צלע × צלע'
          }
        },
        {
          id: 'slide_rectangle',
          type: 'visual',
          title: 'שטח מלבן',
          content: {
            emoji: '📋',
            text: 'מלבן: אורך 6, רוחב 4',
            subtext: 'שטח = 6 × 4 = 24 ס"מ²',
            highlight: 'נוסחה: שטח = אורך × רוחב'
          }
        },
        {
          id: 'slide_difference',
          type: 'discovery',
          title: 'היקף ≠ שטח',
          content: {
            emoji: '⚠️',
            text: 'היקף = מחברים (סביב)',
            subtext: 'שטח = מכפילים (בפנים)',
            highlight: 'אל תתבלבלו!'
          }
        },
        {
          id: 'slide_summary',
          type: 'summary',
          title: 'נוסחאות שטח',
          content: {
            emoji: '📐',
            text: 'ריבוע: צלע × צלע',
            subtext: 'מלבן: אורך × רוחב',
            highlight: 'תמיד כפל!'
          }
        }
      ]
    },

    // ========================================
    // שלב 2: תרגול - שטח ריבוע
    // ========================================
    {
      id: 'step_geo_3_2_practice_square',
      type: 'practice',
      title: 'שטח ריבוע',
      practiceType: 'choice',
      questions: [
        {
          id: 'q_area_1',
          type: 'choice',
          difficulty: 1,
          question: 'מה שטח ריבוע עם צלע 3 ס"מ?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { text: '9 ס"מ²' },
              { text: '12 ס"מ²' },
              { text: '6 ס"מ²' },
              { text: '15 ס"מ²' }
            ]
          }
        },
        {
          id: 'q_area_2',
          type: 'choice',
          difficulty: 1,
          question: 'מה שטח ריבוע עם צלע 5 ס"מ?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { text: '20 ס"מ²' },
              { text: '25 ס"מ²' },
              { text: '10 ס"מ²' },
              { text: '15 ס"מ²' }
            ]
          }
        },
        {
          id: 'q_area_3',
          type: 'truefalse',
          difficulty: 2,
          question: '',
          answer: {
            type: 'truefalse',
            isTrue: false,
            statement: 'שטח ריבוע עם צלע 4 הוא 16, והיקפו גם 16'
          }
        }
      ],
      requiredCorrect: 2
    },

    // ========================================
    // שלב 3: תרגול - שטח מלבן
    // ========================================
    {
      id: 'step_geo_3_3_practice_rect',
      type: 'practice',
      title: 'שטח מלבן',
      practiceType: 'choice',
      questions: [
        {
          id: 'q_area_4',
          type: 'choice',
          difficulty: 1,
          question: 'מה שטח מלבן עם אורך 4 ורוחב 3?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { text: '7' },
              { text: '12' },
              { text: '14' },
              { text: '24' }
            ]
          }
        },
        {
          id: 'q_area_5',
          type: 'choice',
          difficulty: 2,
          question: 'מה שטח מלבן עם אורך 8 ורוחב 5?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { text: '40' },
              { text: '26' },
              { text: '13' },
              { text: '80' }
            ]
          }
        },
        {
          id: 'q_area_6',
          type: 'choice',
          difficulty: 2,
          question: 'חדר מלבני: אורך 6 מ\', רוחב 4 מ\'. כמה מ"ר של רצפה?',
          answer: {
            type: 'choice',
            correctIndex: 2,
            options: [
              { text: '10 מ"ר' },
              { text: '20 מ"ר' },
              { text: '24 מ"ר' },
              { text: '48 מ"ר' }
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
      id: 'step_geo_3_4_mastery',
      type: 'mastery',
      title: 'מבחן שליטה - שטח',
      passingScore: 80,
      onFail: 'review',
      questions: [
        {
          id: 'q_area_m_1',
          type: 'choice',
          difficulty: 1,
          question: 'מה שטח ריבוע עם צלע 7?',
          answer: {
            type: 'choice',
            correctIndex: 2,
            options: [
              { text: '14' },
              { text: '28' },
              { text: '49' },
              { text: '21' }
            ]
          }
        },
        {
          id: 'q_area_m_2',
          type: 'choice',
          difficulty: 1,
          question: 'מה שטח מלבן עם אורך 9 ורוחב 4?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { text: '13' },
              { text: '36' },
              { text: '26' },
              { text: '45' }
            ]
          }
        },
        {
          id: 'q_area_m_3',
          type: 'choice',
          difficulty: 2,
          question: 'לריבוע עם צלע 5: מה ההבדל בין השטח להיקף?',
          answer: {
            type: 'choice',
            correctIndex: 0,
            options: [
              { text: '5 (שטח 25, היקף 20)' },
              { text: '0 (שווים)' },
              { text: '10' },
              { text: '15' }
            ]
          }
        },
        {
          id: 'q_area_m_4',
          type: 'truefalse',
          difficulty: 2,
          question: '',
          answer: {
            type: 'truefalse',
            isTrue: true,
            statement: 'שטח מלבן 6×3 שווה לשטח ריבוע עם צלע שלא קיימת כמספר שלם'
          }
        },
        {
          id: 'q_area_m_5',
          type: 'choice',
          difficulty: 2,
          question: 'גינה ריבועית עם צלע 10 מ\'. כמה דשא צריך (במ"ר)?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { text: '40 מ"ר' },
              { text: '100 מ"ר' },
              { text: '20 מ"ר' },
              { text: '1000 מ"ר' }
            ]
          }
        }
      ]
    }
  ]
};

export default unit3Area;
