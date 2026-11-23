
document.addEventListener("DOMContentLoaded", function () {
    const html = document.documentElement;
    const themeToggle = document.getElementById("themeToggle");

    // DARK MODE
    function applyTheme(theme) {
        html.setAttribute("data-theme", theme);

        if (themeToggle) {
            themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
            themeToggle.setAttribute(
                "aria-label",
                theme === "dark" ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"
            );
        }

        try {
            localStorage.setItem("portfolio-theme", theme);
        } catch (error) {
            // Website vẫn đổi giao diện nếu trình duyệt chặn localStorage.
        }
    }

    // Đọc giao diện đã lưu
    let savedTheme = "light";

    try {
        savedTheme = localStorage.getItem("portfolio-theme") || "light";
    } catch (error) {
        savedTheme = "light";
    }

    applyTheme(savedTheme === "dark" ? "dark" : "light");

    // Bấm nút đổi giao diện
    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            const currentTheme = html.getAttribute("data-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            applyTheme(newTheme);
        });
    }

    // MENU MOBILE
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            const isOpen = navLinks.classList.toggle("open");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.textContent = isOpen ? "✕" : "☰";
        });

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.textContent = "☰";
            });
        });
    }

    // ANIMATION KHI CUỘN TRANG
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(function (entries, currentObserver) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    currentObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        revealElements.forEach(function (element) {
            observer.observe(element);
        });
    } else {
        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });
    }

    // NĂM TỰ ĐỘNG
    document.querySelectorAll(".year").forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });
});
