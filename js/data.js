/* =========================================================
   網站內容資料檔 —— 只要改這個檔案就能更新網站內容
   圖片請放在 images/ 資料夾，並在 img 欄位填入路徑，例如 'images/me.jpg'
   沒有圖片時留空 ''，網站會自動顯示太空風格預設圖
   ========================================================= */

window.SITE = {
  profile: {
    name: '李佩臻',
    subtitle: '會計 × 金融 × AI 應用',
    about: '國立台北大學會計學系學生，曾於富邦人壽、昆山農商銀行與北大阿默實習商店實習，並擔任證券研究社社長。擅長運用 AI 工具（Notion、Canva、Gmail）簡化行銷與行政工作，期望在金融業結合專業知識與科技能力。',
    photo: '',              // 例如 'images/me.jpg'
    cvPdf: '',              // 例如 'files/cv.pdf'
    email: 'janepenny08@gmail.com',

    // time 欄位可填期間（例如 '2024.07 – 2024.08'），沒有就留空
    // desc 可以是一句話，或用 [ ] 列出多點
    internships: [
      { time: '', title: '富邦人壽 · 實習生', desc: ['宣傳並招集大學生參加公司活動', '與活動報名學生溝通聯繫'] },
      { time: '', title: '昆山農商銀行 · 實習', desc: ['於大廳協助分流顧客、辦理基本業務', '跟隨主管拜訪客戶，了解第一線產業情況'] },
      { time: '', title: '北大阿默實習商店 · 實習', desc: ['撰寫有溫度的文案', '設計海報（偏商務風）', '了解、操作 LINE 官方帳號'] }
    ],
    clubs: [
      { time: '', title: '證券研究社 · 社長', desc: ['使用 Notion 統籌、協調各部門（有 AI 輔助）'] },
      { time: '', title: '證券研究社 · 行銷部儲幹', desc: ['設計 FB、IG 貼文（有 AI 輔助）', '設計營服、徽章（有 AI 輔助）'] },
      { time: '', title: '好好市集社 · 公關部', desc: ['與外部廠商溝通協調'] }
    ],
    education: [
      { time: '', title: '國立台北大學 會計學系', desc: '學士' }
    ],
    aiSkills: [
      { time: '', title: 'MCP 串接（Notion、Canva、Gmail）', desc: '例：寄送 email 時，讓 AI 客製多份郵件並存在帳戶草稿，由人工確認後送出' },
      { time: '', title: '用 AI 簡化工作', desc: '例：提供內容給 AI，自動生成 FB 文案、LINE 文案、email 內容' }
    ],
    skills: ['Notion', 'Canva', 'Gmail', 'MCP', 'AI 文案生成', '社群行銷', '海報設計', 'LINE 官方帳號']
  },

  // 內頁隕石小遊戲：敲碎隕石後跳出的文字
  eggMessage: '恭喜你找到了一個彩蛋！今天將會無比順利！',

  // category 可選：AI 應用 / 設計 / 行銷 / 程式
  projects: [
    { category: 'AI 應用', year: '', title: 'AI × MCP 郵件自動化', description: '串接 Notion、Canva、Gmail，讓 AI 依收件人客製多份郵件並存成草稿，人工確認後再送出，省下大量重複撰寫時間。', tags: ['MCP', 'Gmail', 'Notion'], img: '', url: '' },
    { category: 'AI 應用', year: '', title: '一份內容，多平台文案', description: '提供活動內容給 AI，自動生成 FB 貼文、LINE 訊息與 email 三種版本的文案，讓宣傳更快、更一致。', tags: ['AI 文案', 'FB', 'LINE'], img: '', url: '' },
    { category: '設計', year: '', title: '證券研究社視覺設計', description: '擔任行銷部儲幹期間，設計社團 FB、IG 貼文，以及營服與徽章（有 AI 輔助）。', tags: ['Canva', '社群貼文', '周邊設計'], img: '', url: '' },
    { category: '行銷', year: '', title: '北大阿默實習商店行銷', description: '撰寫有溫度的商品文案、設計商務風海報，並操作 LINE 官方帳號經營顧客。', tags: ['文案', '海報', 'LINE OA'], img: '', url: '' },
    { category: '程式', year: '', title: '太空主題個人網站', description: '就是你正在看的這個網站：以 HTML、CSS、JavaScript 打造，部署在 GitHub Pages，內含隕石小遊戲。', tags: ['HTML', 'CSS', 'JavaScript'], img: '', url: 'https://github.com/Jenny-ai1/portfolio' }
  ],

  // ⚠ 以下興趣愛好仍是範例內容，請換成你自己的
  hobbies: [
    { title: '登山', fact: '已登百岳 12 座', description: '喜歡規劃路線與裝備清單，在山上學會照顧隊友、隨時調整計畫。', color: '#2ec4b6', darkColor: '#1f8f85', img: '' },
    { title: '底片攝影', fact: '拍了 40 捲底片', description: '每捲只有 36 張，讓我習慣想清楚再按下快門。', color: '#ff8a4c', darkColor: '#e0532a', img: '' },
    { title: '咖啡手沖', fact: '記錄 80 支豆子', description: '記錄每次的粉量、水溫與風味，用數據找出最喜歡的配方。', color: '#ffd23f', darkColor: '#d4a92a', img: '' }
  ],

  // category 可選：銀行 / 證券 / 保險 / 其他；year 沒有就留空
  certificates: [
    { year: '', category: '其他', name: '金融市場常識與職業道德', issuer: '台灣金融研訓院', result: '合格', img: '' },
    { year: '', category: '證券', name: '證券商業務員', issuer: '證券暨期貨市場發展基金會', result: '合格', img: '' },
    { year: '', category: '保險', name: '人身保險業務員', issuer: '中華民國人壽保險商業同業公會', result: '合格', img: '' },
    { year: '', category: '保險', name: '產物保險業務員', issuer: '中華民國產物保險商業同業公會', result: '合格', img: '' },
    { year: '', category: '銀行', name: '銀行內部控制與內部稽核', issuer: '台灣金融研訓院', result: '合格', img: '' },
    { year: '', category: '銀行', name: '衍生性金融商品銷售人員', issuer: '台灣金融研訓院', result: '合格', img: '' }
  ]
};
