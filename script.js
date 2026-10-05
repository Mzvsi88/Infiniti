/* =========================================================
   INFINITI — JAVASCRIPT + SUPABASE
   ========================================================= */

/* =========================
   SUPABASE CONNECTION
   ========================= */

const SUPABASE_URL = "https://vptthbqvyunmfmvyuidi.supabase.co";

/*
   Paste your Supabase PUBLISHABLE key between the quotes below.

   Do NOT use:
   - sb_secret_...
   - service_role
   - database password
*/

const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_OHkiM8zuOoasCE1IDW6eNg_-zbTa9yB";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);


/* =========================
   PAGE ELEMENTS
   ========================= */

const header = document.getElementById("header");
const mainNav = document.getElementById("mainNav");

const loginForm = document.getElementById("loginForm");
const contactForm = document.getElementById("contactForm");

const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

const menuToggle =
    document.getElementById("menuToggle") ||
    document.querySelector(".menu-toggle");


/* =========================
   MOBILE MENU
   ========================= */

if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
        mainNav.classList.toggle("active");
        menuToggle.classList.toggle("active");
    });
}


/* Close mobile menu after clicking a link */

document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
        if (mainNav) {
            mainNav.classList.remove("active");
        }

        if (menuToggle) {
            menuToggle.classList.remove("active");
        }
    });
});


/* =========================
   HEADER ON SCROLL
   ========================= */

window.addEventListener("scroll", () => {
    if (!header) return;

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


/* =========================
   SMOOTH SCROLLING
   ========================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (event) {
        const targetId = this.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});


/* =========================
   ACTIVE NAVIGATION
   ========================= */

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }
    });

    document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
});


/* =========================
   SCROLL REVEAL
   ========================= */

const revealElements = document.querySelectorAll(
    ".reveal, .service-card, .security-card, .stat-card, .dashboard-card"
);

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* =========================
   BUTTON CLICK EFFECT
   ========================= */

document.querySelectorAll("button, .btn").forEach((button) => {
    button.addEventListener("click", () => {
        button.classList.add("button-clicked");

        setTimeout(() => {
            button.classList.remove("button-clicked");
        }, 150);
    });
});


/* =========================
   PASSWORD SHOW / HIDE
   ========================= */

if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", () => {
        const isPassword =
            passwordInput.getAttribute("type") === "password";

        passwordInput.setAttribute(
            "type",
            isPassword ? "text" : "password"
        );
    });
}


/* =========================
   NOTIFICATION SYSTEM
   ========================= */

function showMessage(message, type = "success") {
    const oldMessage = document.querySelector(".infiniti-message");

    if (oldMessage) {
        oldMessage.remove();
    }

    const messageBox = document.createElement("div");

    messageBox.className = `infiniti-message ${type}`;
    messageBox.textContent = message;

    document.body.appendChild(messageBox);

    setTimeout(() => {
        messageBox.classList.add("show");
    }, 10);

    setTimeout(() => {
        messageBox.classList.remove("show");

        setTimeout(() => {
            messageBox.remove();
        }, 300);
    }, 3500);
}


/* =========================
   SUPABASE LOGIN
   ========================= */

if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const emailInput =
            document.getElementById("email") ||
            loginForm.querySelector('input[type="email"]');

        const passwordField =
            document.getElementById("password") ||
            loginForm.querySelector('input[type="password"]');

        if (!emailInput || !passwordField) {
            showMessage(
                "Login fields could not be found.",
                "error"
            );
            return;
        }

        const email = emailInput.value.trim();
        const password = passwordField.value;

        if (!email || !password) {
            showMessage(
                "Please enter your email and password.",
                "error"
            );
            return;
        }

        try {
            const { data, error } =
                await supabaseClient.auth.signInWithPassword({
                    email: email,
                    password: password
                });

            if (error) {
                showMessage(error.message, "error");
                return;
            }

            showMessage(
                "Login successful. Welcome to Infiniti!",
                "success"
            );

            console.log("Logged-in user:", data.user);

        } catch (error) {
            console.error(error);

            showMessage(
                "Something went wrong while logging in.",
                "error"
            );
        }
    });
}


/* =========================
   CONTACT FORM
   ========================= */

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        showMessage(
            "Your message has been received.",
            "success"
        );

        contactForm.reset();
    });
}


/* =========================
   CHECK CURRENT USER
   ========================= */

async function checkUser() {
    try {
        const {
            data: { user }
        } = await supabaseClient.auth.getUser();

        if (user) {
            console.log("Current Infiniti user:", user.email);
        } else {
            console.log("No user currently signed in.");
        }

    } catch (error) {
        console.error("Unable to check user:", error);
    }
}

checkUser();


/* =========================
   AUTH STATE LISTENER
   ========================= */

supabaseClient.auth.onAuthStateChange(
    (event, session) => {

        console.log("Auth event:", event);

        if (session?.user) {
            console.log(
                "Authenticated:",
                session.user.email
            );
        }
    }
);


/* =========================
   ESCAPE KEY
   ========================= */

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {

        if (mainNav) {
            mainNav.classList.remove("active");
        }

        if (menuToggle) {
            menuToggle.classList.remove("active");
        }
    }
});


/* =========================
   CURRENT YEAR
   ========================= */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* =========================
   INFINITI READY
   ========================= */

console.log("Infiniti JavaScript + Supabase loaded successfully.");}