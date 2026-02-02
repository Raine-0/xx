// ===============
// 你的配置区：把这里改成你们自己的信息
// ===============
const CONFIG = {
  girlfriendName: "xx",
  yourName: "（你的名字）",

  // 生日（只需要月/日即可）。脚本会自动计算“下一个生日”的倒计时。
  birthday: { month: 2, day: 24 },


  // 在一起的纪念日（只需要月/日即可）。
  anniversary: { month: 11, day: 12 },

  // 顶部小卡片
  keyword: "温柔 / 浪漫 / 只属于你",
  oneLine: "你一笑，我就觉得一切都值得。",

  // 弹窗信件内容
  letterText:
    "生日快乐！愿你每天都被温柔对待。愿你的每一个愿望，都有人认真帮你实现。",

  // 彩蛋（可选）：输入暗号才显示
  easterEgg: {
    passphrase: "我们的小暗号",
    text: "你是我最最最喜欢的人。",
  },
};

// ===============
// 工具函数
// ===============
function pad2(n) {
  return String(n).padStart(2, "0");
}

function nextBirthday(month, day) {
  const now = new Date();
  const y = now.getFullYear();
  let target = new Date(y, month - 1, day, 0, 0, 0);
  if (target.getTime() <= now.getTime()) {
    target = new Date(y + 1, month - 1, day, 0, 0, 0);
  }
  return target;
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

// ===============
// 页面初始化
// ===============
(function init() {
  setText("gfName", CONFIG.girlfriendName);
  setText("gfName2", CONFIG.girlfriendName);
  setText("titleName", CONFIG.girlfriendName);
  setText("yourName", CONFIG.yourName);
  setText("yourName2", CONFIG.yourName);
  setText("keyword", CONFIG.keyword);
  setText("oneLine", CONFIG.oneLine);
  setText("letterText", CONFIG.letterText);

  // 图片加载失败时，给一个柔和的占位效果
  document.querySelectorAll(".photo img, .note-card img").forEach((img) => {
    img.addEventListener("error", () => {
      img.style.display = "none";
      const ph = document.createElement("div");
      const isNote = img.closest(".note-card");
      ph.className = isNote ? "note-card__placeholder" : "photo__placeholder";
      ph.innerHTML = isNote ? "<span>把这张换成你们的纸条照片</span>" : "<span>把这张换成你们的照片</span>";
      img.parentElement.insertBefore(ph, img);
    });
  });
})();

// ===============
// 倒计时
// ===============
const birthdayTarget = nextBirthday(CONFIG.birthday.month, CONFIG.birthday.day);
const anniversaryTarget = nextBirthday(CONFIG.anniversary.month, CONFIG.anniversary.day);

function tick() {
  const now = new Date();
  let diff = birthdayTarget.getTime() - now.getTime();

  if (diff <= 0) {
    setText("dd", "00");
    setText("hh", "00");
    setText("mm", "00");
    setText("ss", "00");
    const subtitle = document.getElementById("subtitle");
    if (subtitle) subtitle.textContent = "生日快乐！今天的快乐都给你～ 🎂";
    return;
  }

  const sec = Math.floor(diff / 1000);
  const d = Math.floor(sec / 86400);
  const h = Math.floor((sec % 86400) / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;

  setText("dd", pad2(d));
  setText("hh", pad2(h));
  setText("mm", pad2(m));
  setText("ss", pad2(s));

  // 纪念日倒计时（显示在顶部小卡片里）
  const aNow = now;
  let aDiff = anniversaryTarget.getTime() - aNow.getTime();
  if (aDiff < 0) aDiff = 0;
  const aSec = Math.floor(aDiff / 1000);
  const ad = Math.floor(aSec / 86400);
  const ah = Math.floor((aSec % 86400) / 3600);
  const am = Math.floor((aSec % 3600) / 60);
  setText("anniLeft", `距离 ${pad2(CONFIG.anniversary.month)}.${pad2(CONFIG.anniversary.day)} 还有 ${ad} 天 ${pad2(ah)} 时 ${pad2(am)} 分`);

}

tick();
setInterval(tick, 1000);

// ===============
// 信封弹窗
// ===============
const letterModal = document.getElementById("letterModal");
const openLetterBtn = document.getElementById("openLetterBtn");
const closeLetterBtn = document.getElementById("closeLetterBtn");
const modalBackdrop = document.getElementById("modalBackdrop");

function openModal() {
  letterModal?.classList.add("is-open");
  letterModal?.setAttribute("aria-hidden", "false");
}

function closeModal() {
  letterModal?.classList.remove("is-open");
  letterModal?.setAttribute("aria-hidden", "true");
}

openLetterBtn?.addEventListener("click", openModal);
closeLetterBtn?.addEventListener("click", closeModal);
modalBackdrop?.addEventListener("click", closeModal);

// 纸条弹窗
const noteModal = document.getElementById("noteModal");
const noteBackdrop = document.getElementById("noteBackdrop");
const closeNoteBtn = document.getElementById("closeNoteBtn");
const notePreviewImg = document.getElementById("notePreviewImg");
const notePreviewCaption = document.getElementById("notePreviewCaption");

function openNoteModal(src, caption) {
  if (!noteModal || !notePreviewImg) return;
  notePreviewImg.src = src;
  notePreviewImg.alt = caption || "纸条放大预览";
  if (notePreviewCaption) notePreviewCaption.textContent = caption || "";
  noteModal.classList.add("is-open");
  noteModal.setAttribute("aria-hidden", "false");
}

function closeNoteModal() {
  noteModal?.classList.remove("is-open");
  noteModal?.setAttribute("aria-hidden", "true");
}

document.querySelectorAll(".note-card").forEach((card) => {
  card.addEventListener("click", () => {
    const img = card.querySelector("img");
    const caption = card.querySelector(".note-card__date")?.textContent || "";
    if (!img?.getAttribute("src")) return;
    card.classList.add("is-active");
    setTimeout(() => {
      openNoteModal(img.getAttribute("src"), caption);
      card.classList.remove("is-active");
    }, 220);
  });
});

noteBackdrop?.addEventListener("click", closeNoteModal);
closeNoteBtn?.addEventListener("click", closeNoteModal);
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
    closeNoteModal();
  }
});

// ===============
// 音乐按钮
// ===============
const bgm = document.getElementById("bgm");
const toggleMusicBtn = document.getElementById("toggleMusicBtn");

async function toggleMusic() {
  if (!bgm || !toggleMusicBtn) return;

  try {
    if (bgm.paused) {
      await bgm.play();
      toggleMusicBtn.textContent = "暂停音乐";
      toggleMusicBtn.setAttribute("aria-pressed", "true");
    } else {
      bgm.pause();
      toggleMusicBtn.textContent = "播放音乐";
      toggleMusicBtn.setAttribute("aria-pressed", "false");
    }
  } catch (err) {
    // 移动端/浏览器常见限制：必须由用户手势触发才能播放
    alert("浏览器限制了自动播放：请再点一次“播放音乐”。\n（如果还不行，确认 assets/music.mp3 存在且格式正确）");
    console.warn(err);
  }
}

toggleMusicBtn?.addEventListener("click", toggleMusic);

// ===============
// 彩蛋
// ===============
const passInput = document.getElementById("passInput");
const passBtn = document.getElementById("passBtn");
const easter = document.getElementById("easter");
const easterText = document.getElementById("easterText");

function unlock() {
  const got = (passInput?.value || "").trim();
  if (!got) return;

  if (got === CONFIG.easterEgg.passphrase) {
    if (easterText) easterText.textContent = CONFIG.easterEgg.text;
    easter?.removeAttribute("hidden");
    passInput.value = "";
  } else {
    alert("暗号不对哦～（提示：你们之间的那句）");
  }
}

passBtn?.addEventListener("click", unlock);
passInput?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") unlock();
});
