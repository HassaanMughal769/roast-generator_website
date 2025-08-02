document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const startScreen = document.getElementById("start-screen");
  const mainUI = document.getElementById("main-ui");
  const categoryTabs = document.getElementById("category-tabs");
  const categoryDescription = document.getElementById("category-description");
  const generateBtn = document.getElementById("generate-btn");
  const userInput = document.getElementById("user-input");
  const outputBox = document.getElementById("output-box");

  const categories = [
    { name: "Savage", desc: "Bilkul ultimate savage roasts" },
    { name: "Sarcastic", desc: "Teekhi aur chalaki se bhari baatein" },
    { name: "Friendly", desc: "Halki-phulki funny roasts" },
    { name: "Dark", desc: "Dark aur thodi heavy roasts" },
    { name: "Insulting", desc: "Direct insult, no mercy" },
    { name: "Witty", desc: "Aqalmandi aur hazir jawab style" },
    { name: "Desi", desc: "Pakistani andaaz mai roast" },
    { name: "Bollywood", desc: "Film style taanay" },
    { name: "Toxic", desc: "Poison level hard roasts" },
    { name: "Classic", desc: "Old-school traditional style" },
    { name: "Funky", desc: "Thodi crazy aur creative style" },
    { name: "Rap Style", desc: "Jaise diss track ho" },
    { name: "Emotional", desc: "Dil pe lage, magar roast ho" },
  ];

  // Load categories
  let selectedCategory = null;
  categories.forEach((cat) => {
    const tab = document.createElement("div");
    tab.className = "tab";
    tab.innerText = cat.name;
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach(t => t.classList.remove("selected"));
      tab.classList.add("selected");
      categoryDescription.innerText = cat.desc;
      selectedCategory = cat.name;
    });
    categoryTabs.appendChild(tab);
  });

  // Start button click
  startBtn.addEventListener("click", () => {
    startScreen.classList.add("hidden");
    mainUI.classList.remove("hidden");
  });

  // Generate roast
  generateBtn.addEventListener("click", async () => {
    const prompt = userInput.value.trim();
    if (!prompt || !selectedCategory) {
      outputBox.innerText = "Pehlay prompt likho aur category select karo!";
      return;
    }

    outputBox.innerText = "⏳ Generating roast...";

    try {
      const res = await fetch("/generate_roast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt, category: selectedCategory })
      });

      const data = await res.json();
      if (data.roast) {
        outputBox.innerText = data.roast;
      } else {
        outputBox.innerText = "⚠ Kuch error aa gaya. Server check karo.";
      }
    } catch (err) {
      outputBox.innerText = "❌ Server se connect nahi ho paya.";
      console.error(err);
    }
  });
});