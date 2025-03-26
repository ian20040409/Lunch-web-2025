let lunchOptions = [
    "便當", "牛肉麵", "滷肉飯", "拉麵", "壽司","麵線",
    "咖哩飯", "義大利麵", "炸雞", "鍋燒意麵",
    "越南河粉", "韓式拌飯", "炒飯", "披薩", "三明治", "沙拉"
  ];
  
  function updateLunchList() {
    const listContainer = document.getElementById("lunchList");
    listContainer.innerHTML = "";
    lunchOptions.forEach(item => {
      const li = document.createElement("li");
      li.className = "list-group-item animate__animated animate__fadeInUp";
      li.textContent = item;
      listContainer.appendChild(li);
    });
  }
  
  function decideLunch() {
    if (lunchOptions.length === 0) {
      alert("目前沒有任何選項！");
      return;
    }
    const randomIndex = Math.floor(Math.random() * lunchOptions.length);
    const choice = lunchOptions[randomIndex];
    const result = document.getElementById("result");
    result.textContent = `你可以吃：${choice}`;
    result.classList.add("animate__animated", "animate__tada");
    setTimeout(() => {
      result.classList.remove("animate__animated", "animate__tada");
    }, 1000);
    addToHistory(choice);
  }
  
  function addToHistory(item) {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = item;
    document.getElementById("historyList").prepend(li);
  }
  
  function addOption() {
    const input = document.getElementById("customOption");
    const value = input.value.trim();
    if (value !== "") {
      lunchOptions.push(value);
      alert(`已新增選項：${value}`);
      input.value = "";
      updateLunchList();
    } else {
      alert("請輸入有效的餐點名稱");
    }
  }
  
  function clearHistory() {
    document.getElementById("historyList").innerHTML = "";
  }
  
  function clearWebsiteData() {
    if (confirm("確定要清除網站資料嗎？這會重置主題設定與歷史紀錄。")) {
      localStorage.clear();
      clearHistory();
      alert("網站資料已清除。");
      document.documentElement.setAttribute("data-bs-theme", "light");
      updateToggleButton("light");
    }
  }
  
  function searchFromInput() {
    const keyword = document.getElementById("searchInput").value.trim();
    if (!keyword) return;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const url = `https://www.google.com/maps/search/${encodeURIComponent(keyword)}/@${lat},${lng},15z`;
        window.open(url, '_blank');
      }, () => {
        const url = `https://www.google.com/maps/search/${encodeURIComponent(keyword)}`;
        window.open(url, '_blank');
      });
    } else {
      const url = `https://www.google.com/maps/search/${encodeURIComponent(keyword)}`;
      window.open(url, '_blank');
    }
  }
  
  function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute("data-bs-theme") || "light";
    const next = current === "light" ? "dark" : "light";
    html.setAttribute("data-bs-theme", next);
    localStorage.setItem("bs-theme", next);
    updateToggleButton(next);
  }
  
  function updateToggleButton(theme) {
    const toggleButton = document.querySelector('.theme-toggle');
    if (theme === "dark") {
      toggleButton.innerHTML = '<i class="bi bi-sun-fill"></i>';
      toggleButton.classList.remove('btn-outline-dark');
      toggleButton.classList.add('btn-outline-light');
    } else {
      toggleButton.innerHTML = '<i class="bi bi-moon-fill"></i>';
      toggleButton.classList.remove('btn-outline-light');
      toggleButton.classList.add('btn-outline-dark');
    }
  }
  
  window.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem("bs-theme") || "light";
    document.documentElement.setAttribute("data-bs-theme", saved);
    updateToggleButton(saved);
    updateLunchList();
  });