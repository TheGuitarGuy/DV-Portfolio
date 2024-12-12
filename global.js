// Define pages for navigation
const pages = [
    { url: "/home/index.html", title: "Home" },
    { url: "/contact/index.html", title: "Contact" },
    { url: "/resume/index.html", title: "Resume" },
    { url: "/projects/index.html", title: "Projects" }
];

// Create navigation dynamically
const nav = document.createElement("nav");
const ul = document.createElement("ul");
nav.appendChild(ul);

// Generate navigation links
for (const page of pages) {
    const { url, title } = page;

    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = url;
    a.textContent = title;

    // Highlight the current page
    if (location.pathname === new URL(url, location.origin).pathname) {
        a.classList.add("current");
    }

    li.appendChild(a);
    ul.appendChild(li);
}

// Add navigation to the top of the body
document.body.prepend(nav);

// Add a theme switcher dropdown
document.body.insertAdjacentHTML(
    "afterbegin",
    `<label class="color-scheme">
        Theme:
        <select>
            <option value="light dark">Automatic</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
        </select>
    </label>`
);

// Access the theme switcher
const select = document.querySelector(".color-scheme select");

// Load saved theme preference
const savedScheme = localStorage.colorScheme || "light dark";
select.value = savedScheme;

// Apply the selected theme
function setColorScheme(scheme) {
    document.documentElement.style.setProperty("color-scheme", scheme);

    // Add data-theme attribute for custom styles
    if (scheme === "dark") {
        document.body.setAttribute("data-theme", "dark");
    } else {
        document.body.removeAttribute("data-theme");
    }
}

// Apply the saved theme on page load
setColorScheme(savedScheme);

// Save preference and update theme on change
select.addEventListener("input", (event) => {
    const scheme = event.target.value;
    setColorScheme(scheme);
    localStorage.colorScheme = scheme;
});