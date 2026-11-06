/* =========================================================
   網站內容資料檔 —— 只要改這個檔案就能更新網站內容
   圖片請放在 images/ 資料夾，並在 img 欄位填入路徑，例如 'images/me.jpg'
   沒有圖片時留空 ''，網站會自動顯示太空風格預設圖
   ========================================================= */

window.SITE = {
  profile: {
    name: '陳以安',
    subtitle: '財務金融 × 行銷設計 × 程式',
    about: '財務金融學系畢業，具備會計實務、行銷設計與程式開發經驗。擅長以數據整理問題、以設計溝通想法，期望在金融業發揮跨領域能力。',
    photo: '',              // 例如 'images/me.jpg'
    cvPdf: '',              // 例如 'files/cv.pdf'
    email: 'yian.chen@email.com',
    experience: [
      { time: '2024.07 – 現在', title: '○○商業銀行 · 儲備幹部', desc: '輪調授信、理財與數位金融部門' },
      { time: '2023.07 – 2023.08', title: '○○會計師事務所 · 審計實習生', desc: '協助 5 家客戶期中查核與底稿整理' },
      { time: '2022.02 – 2022.06', title: '○○生活品牌 · 行銷設計實習', desc: '負責社群視覺與檔期活動素材' }
    ],
    education: [
      { time: '2020 – 2024', title: '國立○○大學 財務金融學系', desc: '學士 · 輔修資訊管理' },
      { time: '2017 – 2020', title: '○○高級中學', desc: '數理資優班' }
    ],
    skills: ['Excel / VBA', 'Power BI', 'Python', 'SQL', 'Figma', 'Illustrator', 'TOEIC 880']
  },

  // category 可選：金融 / 程式 / 數據 / 設計
  projects: [
    { category: '金融', year: '2024', title: '半導體個股估值模型', description: '以 DCF 與同業比較法評估三檔半導體個股，整理敏感度分析與投資建議報告。', tags: ['Excel', 'DCF', '財報分析'], img: '', url: '' },
    { category: '程式', year: '2024', title: '授信月報自動化', description: '用 Python 串接 SQL 資料庫自動產出授信月報，製作時間由 2 天縮短為 1 小時。', tags: ['Python', 'SQL', 'pandas'], img: '', url: '' },
    { category: '數據', year: '2023', title: '信用卡消費儀表板', description: '整理 12 個月刷卡資料，以 Power BI 呈現客群輪廓與消費趨勢。', tags: ['Power BI', '資料視覺化'], img: '', url: '' },
    { category: '設計', year: '2022', title: '生活品牌檔期視覺', description: '負責母親節檔期社群貼文與 EDM 視覺，貼文互動率較前檔提升 35%。', tags: ['Figma', 'Illustrator', '社群行銷'], img: '', url: '' }
  ],

  hobbies: [
    { title: '登山', fact: '已登百岳 12 座', description: '喜歡規劃路線與裝備清單，在山上學會照顧隊友、隨時調整計畫。', color: '#2ec4b6', darkColor: '#1f8f85', img: '' },
    { title: '底片攝影', fact: '拍了 40 捲底片', description: '每捲只有 36 張，讓我習慣想清楚再按下快門。', color: '#ff8a4c', darkColor: '#e0532a', img: '' },
    { title: '咖啡手沖', fact: '記錄 80 支豆子', description: '記錄每次的粉量、水溫與風味，用數據找出最喜歡的配方。', color: '#ffd23f', darkColor: '#d4a92a', img: '' }
  ],

  // category 可選：銀行 / 證券 / 保險 / 其他
  certificates: [
    { year: '2024', category: '銀行', name: '信託業業務人員', issuer: '台灣金融研訓院', result: '合格', img: '' },
    { year: '2024', category: '銀行', name: '初階授信人員', issuer: '台灣金融研訓院', result: '合格', img: '' },
    { year: '2023', category: '銀行', name: '理財規劃人員', issuer: '台灣金融研訓院', result: '合格', img: '' },
    { year: '2023', category: '銀行', name: '初階外匯人員', issuer: '台灣金融研訓院', result: '合格', img: '' },
    { year: '2024', category: '證券', name: '證券商高級業務員', issuer: '臺灣證券交易所', result: '合格', img: '' },
    { year: '2023', category: '證券', name: '證券投資信託及顧問業務員', issuer: '中華民國證券投資信託暨顧問商業同業公會', result: '合格', img: '' },
    { year: '2024', category: '保險', name: '人身保險業務員', issuer: '中華民國人壽保險商業同業公會', result: '合格', img: '' },
    { year: '2024', category: '保險', name: '投資型保險商品業務員', issuer: '中華民國人壽保險商業同業公會', result: '合格', img: '' },
    { year: '2023', category: '保險', name: '財產保險業務員', issuer: '中華民國產物保險商業同業公會', result: '合格', img: '' },
    { year: '2023', category: '其他', name: 'TOEIC 多益測驗', issuer: 'ETS', result: '880 分', img: '' }
  ]
};
