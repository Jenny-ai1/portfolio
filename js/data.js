/* =========================================================
   網站內容資料檔 —— 用 editor/ 編輯器修改，或直接改這個檔案
   圖片請放在 images/ 資料夾，並在 img / photo 欄位填入路徑，例如 'images/me.jpg'
   沒有圖片時留空 ''，網站會自動顯示太空風格預設圖
   desc 可以是一句話，或用 [ ] 列出多點；time / year 沒有就留空
   ========================================================= */

window.SITE = {
  "profile": {
    "greeting": "國立台北大學會計學系",
    "name": "李佩臻",
    "subtitle": "會計 × 金融 × AI 應用",
    "about": "我是台北大學會計系大二在學，曾於富邦人壽、昆山農商銀行與北大阿默實習商店實習，並擔任證券研究社社長。擅長運用 AI 工具（Notion、Canva、Gmail）簡化行銷與行政工作，期望在金融業結合專業知識與科技能力。",
    "photo": "images/me.jpg",
    "cvPdf": "files/cv-zh.pdf",
    "cvPdfEn": "files/cv-en.pdf",
    "email": "janepenny08@gmail.com",
    "internships": [
      {
        "time": "2025/12/5 至今",
        "title": "富邦人壽 · 實習生",
        "desc": [
          "宣傳並招集大學生參加公司活動",
          "與報名活動的學生溝通聯繫"
        ]
      },
      {
        "time": "2026/07/10-2026/08/07",
        "title": "昆山農商銀行 · 實習",
        "desc": [
          "於大廳協助分流顧客、辦理基本業務",
          "跟隨主管拜訪客戶，了解第一線產業情況"
        ]
      },
      {
        "time": "2025/09/30-2026/03/31",
        "title": "北大阿默實習商店 · 實習",
        "desc": [
          "撰寫有溫度的文案",
          "設計海報（偏商務風）",
          "了解、操作 LINE 官方帳號",
          "銷售、向客戶介紹產品"
        ]
      }
    ],
    "clubs": [
      {
        "time": "2026/07/20-2027/07/20",
        "title": "證券研究社 · 社長",
        "desc": [
          "使用 Notion 統籌、協調各部門（有 AI 輔助）"
        ]
      },
      {
        "time": "2026/01-2026/06",
        "title": "證券研究社 · 行銷部儲幹",
        "desc": [
          "設計 FB、IG 貼文（有 AI 輔助）",
          "設計營服、徽章（有 AI 輔助）"
        ]
      },
      {
        "time": "2025/09-2026/05",
        "title": "好好市集社 · 公關部",
        "desc": [
          "與外部廠商溝通協調"
        ]
      }
    ],
    "education": [
      {
        "time": "2025/09-2029/06(預計)",
        "title": "國立台北大學 會計學系",
        "desc": "學士"
      }
    ],
    "aiSkills": [
      {
        "time": "",
        "title": "MCP 串接（Notion、Canva、Gmail）",
        "desc": "例：寄送 email 時，讓 AI 客製多份郵件並存在帳戶草稿，由人工確認後送出"
      },
      {
        "time": "",
        "title": "用 AI 簡化工作",
        "desc": "例：提供內容給 AI，自動生成 FB 文案、LINE 文案、email 內容"
      }
    ],
    "skills": [
      "Notion",
      "Canva",
      "Gmail",
      "MCP",
      "AI 文案生成",
      "社群行銷",
      "海報設計",
      "LINE 官方帳號"
    ]
  },
  "eggMessage": "恭喜你找到了一個彩蛋！今天將會無比順利！",
  "projects": [
    {
      "category": "AI 應用",
      "year": "",
      "title": "AI × MCP 郵件自動化",
      "description": "用在社課的補課表單：依社員的補課申請，讓 AI 透過 MCP 串接 Gmail，整理出每堂課的補課信並存成草稿，人工確認後再送出，省下大量重複撰寫時間。",
      "tags": [
        "MCP",
        "Gmail",
        "Excel",
        "補課表單"
      ],
      "img": "",
      "url": "",
      "type": "自動化工具",
      "job": "證券研究社 · 社長",
      "items": [
        {
          "title": "社課補課表單：補課信自動化",
          "job": "證券研究社 · 社長",
          "description": "社員錯過社課時會填寫補課表單。我把申請名單交給 AI，透過 MCP 串接社團 Gmail，自動整理出每堂課的補課信並存成草稿，確認後再寄出。",
          "img": "",
          "more": [],
          "process": [],
          "url": "",
          "view": "flow",
          "flow": {
            "why": "每堂社課都有社員請假，需要寄補課資料給他們。原本要逐一查名單、按場次分好、附上影片與講義，再一封封寫信，很花時間，也容易寄錯堂或漏寄email。",
            "inputs": [
              "補課表單的申請名單（Excel）",
              "各堂課的補課影片連結",
              "各堂課的 PDF 講義"
            ],
            "aiNote": "透過 MCP 串接 Gmail",
            "outputs": [
              {
                "icon": "📋",
                "title": "依場次整理名單",
                "sub": "自動分組，不用手動篩選",
                "points": [
                  "AI 讀取補課表單的申請資料",
                  "依申請的場次把社員分組，一堂課對應一組收件人",
                  "不會漏掉人，也不會寄錯堂"
                ]
              },
              {
                "icon": "✉️",
                "title": "每堂一封補課信",
                "sub": "資料備齊，一封信就能補完課",
                "points": [
                  "放入該堂的補課影片連結與 PDF 講義",
                  "收件人放在密件副本，彼此看不到信箱"
                ]
              },
              {
                "icon": "📥",
                "title": "Gmail 草稿",
                "sub": "直接寫進信箱，不用複製貼上",
                "points": [
                  "AI 透過 MCP 串接社團 Gmail，直接建立草稿",
                  "不用一封封手動開新信、貼內容、加附件",
                  "人工確認草稿內容後才寄出"
                ]
              }
            ],
            "rules": [
              "人工把關：AI 只建立草稿，確認內容後才寄出",
              "不漏寄：事先訂好寄信規範，哪些人該寄，哪些人該寄哪份檔案......，AI 照規範產出，減少AI自行判斷，比較不用擔心會有錯漏",
              "一堂一封：依場次分開寄，每封只放該堂的資料，不會混淆"
            ],
            "impact": [
              "從逐封撰寫變成確認草稿，省下大量重複撰寫時間",
              "收件人與資料由 AI 依名單整理，減少寄錯或漏寄"
            ]
          }
        }
      ]
    },
    {
      "category": "AI 應用",
      "year": "",
      "title": "自動化宣傳",
      "description": "把活動招募的宣傳流程寫成一份給 AI 的標準指令。輸入活動資訊，就能一次產出報名表單、LINE 邀請與錄取通知信。",
      "tags": [
        "AI 文案",
        "AI表單",
        "line",
        "AI自動化"
      ],
      "img": "",
      "url": "",
      "type": "自動化工具",
      "job": "富邦人壽 · 實習生",
      "items": [
        {
          "title": "活動招募：AI 宣傳文案助手",
          "job": "富邦人壽 · 實習生",
          "description": "我把整個招募宣傳流程寫成一份給 AI 的標準指令（prompt）。之後每辦一場活動，只要提供三項資訊，就能一次拿到報名表單、LINE 邀請訊息與錄取通知信，複製就能用。",
          "img": "",
          "more": [],
          "process": [],
          "url": "",
          "view": "flow",
          "flow": {
            "why": "實習期間需要為多場活動招募參加者。每一場都要做報名表、發 LINE 邀請、寄錄取通知，內容大同小異卻得從頭寫，花時間，也容易漏掉資訊或語氣不一致。",
            "inputs": [
              "活動名稱",
              "活動 DM（文字或圖片）",
              "活動大致內容"
            ],
            "outputs": [
              {
                "icon": "📝",
                "title": "Google 報名表單",
                "sub": "自動建立，不用手動設定題目",
                "points": [
                  "AI 產出一段程式碼，貼上執行就自動建好 Google 表單",
                  "內建常用題目（姓名、聯絡方式、報名動機等），再依活動加題，例如場次、飲食限制",
                  "限登入 Google 帳號才能填寫，減少重複或亂填"
                ]
              },
              {
                "icon": "💬",
                "title": "LINE 邀請訊息",
                "sub": "寫好就能發，不用每次重想文案",
                "points": [
                  "AI 依活動內容寫好邀請訊息，複製就能直接發到群組",
                  "內含活動亮點、時間地點與報名連結，看完就能報名",
                  "分段搭配表情符號，並依時節調整開場，確保易讀、不會每份長得太像"
                ]
              },
              {
                "icon": "✉️",
                "title": "錄取通知 Email",
                "sub": "錄取後馬上通知，不用逐封撰寫",
                "points": [
                  "AI 依活動資訊寫好錄取通知信，自動存成 Gmail 草稿",
                  "固定架構，以免漏掉重要資訊",
                  "人工確認後才寄出，避免寄錯人或內容出錯"
                ]
              }
            ],
            "rules": [
              "人工把關：信件一律先存成 Gmail 草稿，確認後才寄出，避免 AI 誤寄",
              "資訊串接：表單建好後把連結貼回，AI 自動放進 LINE 訊息與 Email",
              "不亂編：缺少的時間、地點用【】標示，並列出還缺哪些資訊",
              "看得懂圖片：直接上傳活動 DM，AI 會讀出標語、時間地點與風格"
            ],
            "impact": [
              "每場活動不用再從零撰寫，備好資訊就能一次拿到三份內容",
              "表單、訊息與信件格式一致，對外溝通更統一",
              "AI 負責起草、人負責確認，兼顧速度與正確性"
            ]
          }
        }
      ]
    },
    {
      "category": "行銷",
      "year": "",
      "title": "社群貼文",
      "description": "撰寫過的社群貼文",
      "tags": [
        "文案",
        "圖片",
        "AI創作"
      ],
      "img": "",
      "url": "",
      "type": "",
      "job": "",
      "items": [
        {
          "title": "時事文：美國 CPI 超預期",
          "job": "證券研究社 · 社長",
          "description": "原文由教學長撰寫，我負責將長篇時事分析重新架構、設計成 8 頁的貼文，讓社員更容易閱讀（有 AI 輔助）。",
          "img": "images/projects/cpi-2026-10/p1.jpg",
          "more": [
            {
              "img": "images/projects/cpi-2026-10/p2.jpg"
            },
            {
              "img": "images/projects/cpi-2026-10/p3.jpg"
            },
            {
              "img": "images/projects/cpi-2026-10/p4.jpg"
            },
            {
              "img": "images/projects/cpi-2026-10/p5.jpg"
            },
            {
              "img": "images/projects/cpi-2026-10/p6.jpg"
            },
            {
              "img": "images/projects/cpi-2026-10/p7.jpg"
            },
            {
              "img": "images/projects/cpi-2026-10/p8.jpg"
            }
          ],
          "process": [],
          "url": ""
        },
        {
          "title": "2026 投資理財營：講師介紹",
          "job": "證券研究社 · 行銷部儲幹",
          "description": "",
          "img": "images/projects/finance-camp-2026-1.jpg",
          "url": "",
          "more": [
            {
              "img": "images/projects/finance-camp-2026-2.jpg"
            },
            {
              "img": "images/projects/finance-camp-2026-3.jpg"
            }
          ],
          "process": []
        },
        {
          "title": "第四堂社課：產業研究課程",
          "job": "證券研究社 · 行銷部儲幹",
          "description": "",
          "img": "images/projects/club-class-4-industry-research.jpg",
          "url": "",
          "more": [],
          "process": []
        },
        {
          "title": "第八堂社課：成果發表",
          "job": "證券研究社 · 行銷部儲幹",
          "description": "",
          "img": "images/projects/club-class-8-research-presentation.jpg",
          "url": "",
          "more": [],
          "process": []
        }
      ]
    },
    {
      "category": "行銷",
      "year": "",
      "title": "海報&文宣品設計",
      "description": "",
      "tags": [
        "AI創作",
        "海報",
        "徽章",
        "營服"
      ],
      "img": "",
      "url": "",
      "type": "",
      "job": "",
      "items": [
        {
          "title": "營服設計",
          "job": "證券研究社 · 行銷部儲幹",
          "description": "為投資理財營設計的營服(最後有做成營服)。正面左胸的主體是一個牛頭，代表牛市；上升箭頭和一組堆高的金幣，代表股票飆漲、投資人賺大錢！背面想表達的是「加入我們，在牛市裡開槓桿賺大錢！」：翹翹板就是槓桿，以小撬動大，旁邊是上漲的走勢線，呼應牛市與投資理財的主題。",
          "img": "images/projects/finance-camp-2026-tshirt.jpg",
          "more": [],
          "process": [],
          "url": ""
        },
        {
          "title": "徽章設計",
          "job": "證券研究社 · 行銷部儲幹",
          "description": "圖片的設計理念請參考營服。第一張黑底金色款有被選上，最後有實際做出此徽章。",
          "img": "images/projects/ntpu-sss-badge-gold.jpg",
          "more": [
            {
              "img": "images/projects/ntpu-sss-badge-navy.jpg"
            }
          ],
          "process": [],
          "url": ""
        },
        {
          "title": "流程圖設計",
          "job": "北大阿默實習商店 · 實習",
          "description": "跟不同廠商合作時，為方便向顧客講解該如何操作的使用說明。像是：如何兌換點數(第一張圖)、如何線上下訂單(第二張圖)。",
          "img": "images/projects/amo-numbird-stamp-card-flow.jpg",
          "more": [
            {
              "img": "images/projects/amo-nidin-online-order-flow.jpg"
            }
          ],
          "process": [],
          "url": ""
        },
        {
          "title": "海報設計",
          "job": "北大阿默實習商店 · 實習",
          "description": "宣傳商店的海報。第一張圖片是為了社區快閃宣傳。",
          "img": "images/projects/amo-fenglu-moon-poster.jpg",
          "more": [
            {
              "img": "images/projects/amo-store-poster-blue.jpg"
            }
          ],
          "process": [],
          "url": ""
        }
      ]
    },
    {
      "category": "證券",
      "type": "研究報告",
      "job": "證券研究社 · 行銷部儲幹",
      "year": "",
      "title": "產業研究",
      "description": "以營建產業為研究主題，最後選定華固建設作為研究標的。我主要負責公司面分析與財報預測。",
      "tags": [
        "股票",
        "營建業",
        "華固"
      ],
      "img": "",
      "url": "",
      "items": [
        {
          "title": "華固（2548）產業研究報告",
          "job": "證券研究社 · 行銷部儲幹",
          "description": "完整報告共 28 頁，涵蓋營建產業鏈與前景、華固公司概況、未來建案與財報預測。",
          "img": "images/projects/huaku-report/p01.jpg",
          "more": [
            {
              "img": "images/projects/huaku-report/p02.jpg"
            },
            {
              "img": "images/projects/huaku-report/p03.jpg"
            },
            {
              "img": "images/projects/huaku-report/p04.jpg"
            },
            {
              "img": "images/projects/huaku-report/p05.jpg"
            },
            {
              "img": "images/projects/huaku-report/p06.jpg"
            },
            {
              "img": "images/projects/huaku-report/p07.jpg"
            },
            {
              "img": "images/projects/huaku-report/p08.jpg"
            },
            {
              "img": "images/projects/huaku-report/p09.jpg"
            },
            {
              "img": "images/projects/huaku-report/p10.jpg"
            },
            {
              "img": "images/projects/huaku-report/p11.jpg"
            },
            {
              "img": "images/projects/huaku-report/p12.jpg"
            },
            {
              "img": "images/projects/huaku-report/p13.jpg"
            },
            {
              "img": "images/projects/huaku-report/p14.jpg"
            },
            {
              "img": "images/projects/huaku-report/p15.jpg"
            },
            {
              "img": "images/projects/huaku-report/p16.jpg"
            },
            {
              "img": "images/projects/huaku-report/p17.jpg"
            },
            {
              "img": "images/projects/huaku-report/p18.jpg"
            },
            {
              "img": "images/projects/huaku-report/p19.jpg"
            },
            {
              "img": "images/projects/huaku-report/p20.jpg"
            },
            {
              "img": "images/projects/huaku-report/p21.jpg"
            },
            {
              "img": "images/projects/huaku-report/p22.jpg"
            },
            {
              "img": "images/projects/huaku-report/p23.jpg"
            },
            {
              "img": "images/projects/huaku-report/p24.jpg"
            },
            {
              "img": "images/projects/huaku-report/p25.jpg"
            },
            {
              "img": "images/projects/huaku-report/p26.jpg"
            },
            {
              "img": "images/projects/huaku-report/p27.jpg"
            },
            {
              "img": "images/projects/huaku-report/p28.jpg"
            }
          ],
          "process": [],
          "url": "files/construction-industry-research.pdf",
          "view": "slides",
          "role": {
            "title": "我負責的部分：公司面分析與財報預估",
            "insight": "營建業的分析重點：建案能不能準時完售，並且用合理的價格完售。",
            "steps": [
              {
                "title": "公司在做什麼",
                "text": "認識華固建設的主要業務與經營模式，作為後續分析的基礎。"
              },
              {
                "title": "公司優勢",
                "text": "整理華固相較同業的競爭優勢。"
              },
              {
                "title": "未來建案盤點",
                "text": "整理每個建案的位置、預估完工時間與預計銷售額。",
                "highlight": true
              },
              {
                "title": "區域房市分析",
                "text": "華固的建案主要集中在台北與台中，因此分析兩地目前的房市景氣，判斷建案能否如預期完售。"
              },
              {
                "title": "財報預估",
                "text": "依各建案的完工時間推估營收認列，預估未來幾季的營收。",
                "tip": "營建業的會計週期較長，不必一季一季預估未來一到三年的營收。"
              }
            ],
            "reflection": [
              {
                "icon": "🎯",
                "title": "選對產業最重要",
                "text": "產業研究最重要的是選一個有未來性的產業。當時我還是新手，沒有注意到營建業是相對穩定的產業，股價不像科技股那樣有波動，增值潛力也比較有限。",
                "next": "下次想選半導體或雲端相關產業，話題度更高、資料更多，也更有未來的展望。"
              },
              {
                "icon": "🏛️",
                "title": "營建業受政策影響大",
                "text": "許多亞洲國家的民眾都很喜歡買房，政府因此常推出打房措施；這代表房市火熱，也代表整個產業容易被政策左右。",
                "next": "除了整理現行政策，之後也想分析選舉對產業的影響，以及選前選後政策可能的轉變。"
              },
              {
                "icon": "🔍",
                "title": "公司面：從供需出發",
                "text": "這次的公司面分析比較依賴供需關係來衡量。",
                "next": "之後想多運用財務指標，讓公司面的判斷更完整。"
              },
              {
                "icon": "📈",
                "title": "評價方法的反思",
                "text": "財報預估最後用的是本淨比髮估值，但河流圖上預估的倍數其實相當主觀，不一定合適。",
                "next": "之後想試試看內在價值法等其他評價方法。"
              }
            ]
          }
        }
      ]
    }
  ],
  "hobbies": [
    {
      "title": "登山",
      "fact": "",
      "description": "",
      "color": "#2ec4b6",
      "darkColor": "#1f8f85",
      "img": ""
    },
    {
      "title": "烹飪",
      "fact": "複刻網路上的甜點",
      "description": "",
      "color": "#ffd23f",
      "darkColor": "#d4a92a",
      "img": ""
    }
  ],
  "certificates": [
    {
      "year": "2025",
      "category": "其他",
      "name": "金融市場常識與職業道德",
      "issuer": "台灣金融研訓院",
      "result": "合格",
      "img": ""
    },
    {
      "year": "2026",
      "category": "證券",
      "name": "證券商業務員",
      "issuer": "證券暨期貨市場發展基金會",
      "result": "合格",
      "img": ""
    },
    {
      "year": "2026",
      "category": "保險",
      "name": "人身保險業務員",
      "issuer": "中華民國人壽保險商業同業公會",
      "result": "合格",
      "img": ""
    },
    {
      "year": "2025",
      "category": "保險",
      "name": "產物保險業務員",
      "issuer": "中華民國產物保險商業同業公會",
      "result": "合格",
      "img": ""
    },
    {
      "year": "2026",
      "category": "銀行",
      "name": "銀行內部控制與內部稽核",
      "issuer": "台灣金融研訓院",
      "result": "合格",
      "img": ""
    },
    {
      "year": "2026",
      "category": "銀行",
      "name": "衍生性金融商品銷售人員",
      "issuer": "台灣金融研訓院",
      "result": "合格",
      "img": ""
    }
  ]
};
