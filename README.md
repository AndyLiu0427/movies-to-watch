# Movies to watch
demo: https://movies-to-watch-vfie.vercel.app/
## 簡介
這個專案使用了 TMDB API 和 Firebase 來提供電影數據和後端服務。請按照以下步驟設置環境變數以便專案正常運行。

## 環境變數設置

請在專案根目錄下創建一個 `.env.local` 文件，並添加以下內容：

```shell
NEXT_PUBLIC_TMDB_API_KEY=你的TMDB API金鑰
NEXT_PUBLIC_TMDB_API_TOKEN=你的TMDB API令牌

NEXT_PUBLIC_FIREBASE_API_KEY=你的Firebase API金鑰
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=你的Firebase Auth Domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=你的Firebase Project ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=你的Firebase Storage Bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=你的Firebase Messaging Sender ID
NEXT_PUBLIC_FIREBASE_APP_ID=你的Firebase App ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=你的Firebase Measurement ID
```
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 獲取 TMDB API 金鑰和令牌
 1. 註冊並登錄 TMDB.
 2. 前往 API 頁面。
 3. 創建一個新的 API 金鑰和令牌，並將它們填入 .env.local 文件中的 NEXT_PUBLIC_TMDB_API_KEY 和 NEXT_PUBLIC_TMDB_API_TOKEN。

## 獲取 Firebase 配置
 1. 註冊並登錄 Firebase.
 2. 創建一個新的專案或使用現有專案。
 3. 前往專案設置頁面，找到 Firebase SDK 配置，並將相應的值填入 .env.local 文件中的對應字段。

## 啟動專案
設置好環境變數後，可以使用以下命令啟動專案：
```shell
npm install
npm run dev
```

這將啟動開發伺服器，在瀏覽器中訪問 http://localhost:3000 查看專案。

