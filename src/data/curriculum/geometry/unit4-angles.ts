import { LearningUnit } from '../../../types/curriculum';

// =============================================
// יחידה 4: זוויות
// =============================================

export const unit4Angles: LearningUnit = {
  id: 'unit_geo_4_angles',
  number: 4,
  title: 'זוויות',
  description: 'זווית ישרה, חדה וקהה',
  icon: '📐',

  objectives: [
    'להבין מהי זווית',
    'לזהות זווית ישרה, חדה וקהה',
    'למצוא זוויות בצורות'
  ],

  prerequisites: ['unit_geo_1_shapes'],

  masterySkills: [
    'זיהוי סוגי זוויות',
    'הבנת זווית ישרה (90°)',
    'מציאת זוויות בחיי היומיום'
  ],

  steps: [
    // ========================================
    // שלב 1: למידה - מהי זווית?
    // ========================================
    {
      id: 'step_geo_4_1_learn',
      type: 'learning',
      title: 'מהי זווית?',
      slides: [
        {
          id: 'slide_intro',
          type: 'story',
          title: 'הפינה של הספר',
          content: {
            emoji: '📚',
            text: 'תסתכלו על פינת הספר שלכם',
            subtext: 'רואים איך שני הקצוות נפגשים?',
            highlight: 'זו זווית!'
          },
          animation: 'fade'
        },
        {
          id: 'slide_definition',
          type: 'discovery',
          title: 'זווית = מפגש של שני קווים',
          content: {
            emoji: '📐',
            text: 'כשני קווים נפגשים - נוצרת זווית',
            subtext: 'הזווית יכולה להיות גדולה או קטנה',
            highlight: 'מודדים זוויות במעלות (°)'
          },
          delay: 500
        },
        {
          id: 'slide_right',
          type: 'visual',
          title: 'זווית ישרה = 90°',
          content: {
            emoji: '🔲',
            text: 'זווית ישרה = בדיוק כמו פינת ריבוע',
            subtext: 'נראית כמו האות ר\' או L',
            highlight: '90 מעלות - הזווית הכי חשובה!'
          }
        },
        {
          id: 'slide_acute',
          type: 'visual',
          title: 'זווית חדה < 90°',
          content: {
            emoji: '🔺',
            text: 'זווית חדה = קטנה מזווית ישרה',
            subtext: 'יותר "סגורה", פחות פתוחה',
            highlight: 'כמו קצה של משולש מחודד'
          }
        },
        {
          id: 'slide_obtuse',
          type: 'visual',
          title: 'זווית קהה > 90°',
          content: {
            emoji: '📖',
            text: 'זווית קהה = גדולה מזווית ישרה',
            subtext: 'יותר "פתוחה"',
            highlight: 'כמו ספר פתוח רחב'
          }
        },
        {
          id: 'slide_summary',
          type: 'summary',
          title: 'שלושה סוגים',
          content: {
            emoji: '📐',
            text: 'חדה < 90° < קהה',
            subtext: 'ובאמצע: זווית ישרה = 90° בדיוק',
            highlight: 'פינות ריבוע ומלבן = זוויות ישרות!'
          }
        }
      ]
    },

    // ========================================
    // שלב 2: תרגול - זיהוי זוויות
    // ========================================
    {
      id: 'step_geo_4_2_practice',
      type: 'practice',
      title: 'זהה את הזווית',
      practiceType: 'choice',
      questions: [
        {
          id: 'q_ang_1',
          type: 'choice',
          difficulty: 1,
          question: 'פינה של ריבוע היא זווית:',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { text: 'חדה' },
              { text: 'ישרה' },
              { text: 'קהה' },
              { text: 'עגולה' }
            ]
          }
        },
        {
          id: 'q_ang_2',
          type: 'choice',
          difficulty: 1,
          question: 'זווית של 45° היא:',
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
          id: 'q_ang_3',
          type: 'choice',
          difficulty: 1,
          question: 'זווית של 120° היא:',
          answer: {
            type: 'choice',
            correctIndex: 2,
            options: [
              { text: 'חדה' },
              { text: 'ישרה' },
              { text: 'קהה' },
              { text: 'אין זווית כזו' }
            ]
          }
        },
        {
          id: 'q_ang_4',
          type: 'truefalse',
          difficulty: 2,
          question: '',
          answer: {
            type: 'truefalse',
            isTrue: true,
            statement: 'לריבוע יש 4 זוויות ישרות'
          }
        }
      ],
      requiredCorrect: 3
    },

    // ========================================
    // שלב 3: מבחן שליטה
    // ========================================
    {
      id: 'step_geo_4_3_mastery',
      type: 'mastery',
      title: 'מבחן שליטה - זוויות',
      passingScore: 80,
      questions: [
        {
          id: 'q_ang_m_1',
          type: 'choice',
          difficulty: 1,
          question: 'כמה מעלות בזווית ישרה?',
          answer: {
            type: 'choice',
            correctIndex: 2,
            options: [
              { text: '45°' },
              { text: '180°' },
              { text: '90°' },
              { text: '360°' }
            ]
          }
        },
        {
          id: 'q_ang_m_2',
          type: 'choice',
          difficulty: 1,
          question: 'זווית של 30° היא:',
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
          id: 'q_ang_m_3',
          type: 'truefalse',
          difficulty: 1,
          question: '',
          answer: {
            type: 'truefalse',
            isTrue: true,
            statement: 'כל פינות המלבן הן זוויות ישרות'
          }
        },
        {
          id: 'q_ang_m_4',
          type: 'choice',
          difficulty: 2,
          question: 'איזו זווית גדולה יותר?',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { text: 'חדה' },
              { text: 'קהה' },
              { text: 'שוות' },
              { text: 'תלוי' }
            ]
          }
        },
        {
          id: 'q_ang_m_5',
          type: 'choice',
          difficulty: 2,
          question: 'זווית של 90° בדיוק נקראת:',
          answer: {
            type: 'choice',
            correctIndex: 1,
            options: [
              { text: 'זווית חדה' },
              { text: 'זווית ישרה' },
              { text: 'זווית קהה' },
              { text: 'זווית שטוחה' }
            ]
          }
        }
      ]
    }
  ]
};

export default unit4Angles;
