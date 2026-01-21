# 生日小网页（Cloudflare Pages）

这个文件夹是一个**纯静态**网页（HTML/CSS/JS），可以直接部署到 Cloudflare Pages。

## 你需要改的 3 件事

1) 打开 `script.js`，改 `CONFIG`：
- `girlfriendName`
- `yourName`
- `birthday: { month, day }`
- 信件文案、暗号彩蛋

2) 替换照片：
- 用你们自己的照片替换 `assets/photo1.jpg` ~ `assets/photo4.jpg`
- 文件名保持不变（或你自己改 `index.html` 里的引用）

3) 替换音乐（可选）：
- 用你喜欢的 `music.mp3` 替换 `assets/music.mp3`

## 本地预览

直接双击打开 `index.html` 也能看。

如果你想更像线上效果，可以用任意静态服务器：

```bash
python3 -m http.server 8080
```

然后浏览器打开 `http://localhost:8080`。
