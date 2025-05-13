document.addEventListener("DOMContentLoaded", () => {
  // スムーススクロールの実装
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  for (const link of scrollLinks) {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // アニメーション効果
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        }
      }
    },
    { threshold: 0.1 }
  );

  const animatedElements = document.querySelectorAll(".feature-card, .step");
  for (const el of animatedElements) {
    observer.observe(el);
  }
});
