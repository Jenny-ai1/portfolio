# 陳以安 · 太空主題個人網站

純 HTML / CSS / JS 靜態網站，不需要安裝任何工具，可直接部署到任何靜態網站空間。

## 檔案結構
- `index.html` 首頁、`portfolio.html` 作品集、`hobbies.html` 興趣愛好、`certificates.html` 證照
- `js/data.js` **所有文字內容都在這裡改**（名字、自介、經歷、作品、興趣、證照）
- `images/` 放照片、作品圖、證書圖（在 data.js 的 `img` / `photo` 填入路徑，如 `images/me.jpg`）
- `files/` 放 CV PDF（在 data.js 的 `cvPdf` 填入 `files/cv.pdf`，下載按鈕就會啟用）
- `mockups/` 原始設計檔（上線時不需要上傳）

## 在電腦上預覽
```
python -m http.server 8765
```
然後開 http://localhost:8765

## 上線（讓手機、平板、其他電腦都能開）
**最簡單：Netlify Drop**
1. 開 https://app.netlify.com/drop（需免費註冊）
2. 把整個 `personal_web` 資料夾拖進去（可先移除 `mockups` 和 zip 檔）
3. 取得網址，例如 `https://xxx.netlify.app`，任何裝置都能開

**或 GitHub Pages**：建立 repository、上傳這些檔案，到 Settings → Pages 選 main 分支即可。
