/* =========================================================
   INFINITI — MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   SUPABASE CONFIGURATION
   ========================================================= */

const SUPABASE_URL = "https://vptthbqvyunmfmvyuidi.supabase.co";

/*
   IMPORTANT:
   Keep your existing Supabase PUBLISHABLE key here.

   Do NOT use:
   - sb_secret_...
   - service_role
   - database password
*/

const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_OHkiM8zuOoasCE1IDW6eNg_-zbTa9yB";


/* =========================================================
   SUPABASE CLIENT
   ========================================================= */

let supabaseClient = null;

if (
    window.supabase &&
    SUPABASE_URL &&
    SUPABASE_PUBLISHABLE_KEY &&
    !SUPABASE_PUBLISHABLE_KEY.includes("PASTE_YOUR")
) {
    supabaseClient = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );
}


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initMobileMenu();
    initSmoothScrolling();
    initActiveNavigation();
    initScrollEffects();
    initRevealAnimations();
    initButtonEffects();
    initPasswordToggle();
    initSignup();
    initLogin();
    initContactForm();
    initAuthenticationState();
    initEscapeKey();
    initCurrentYear();

});


/* =========================================================
   MOBILE HAMBURGER MENU
   ========================================================= */

function initMobileMenu() {

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (!menuToggle || !mainNav) {
        return;
    }

    menuToggle.addEventListener("click", () => {

        const isOpen =
            mainNav.classList.toggle("active");

        menuToggle.classList.toggle(
            "active",
            isOpen
        );

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );

    });


    /* Close menu when navigation link is clicked */

    const navLinks =
        mainNav.querySelectorAll("a");

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("active");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove(
                "menu-open"
            );

        });

    });

}


/* =========================================================
   SMOOTH SCROLLING
   ========================================================= */

function initSmoothScrolling() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    links.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

}


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

function initActiveNavigation() {

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );

    if (!sections.length || !navLinks.length) {
        return;
    }

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const id =
                        entry.target.getAttribute("id");

                    navLinks.forEach((link) => {

                        link.classList.remove(
                            "active"
                        );

                        if (
                            link.getAttribute("href") ===
                            `#${id}`
                        ) {
                            link.classList.add(
                                "active"
                            );
                        }

                    });

                });

            },
            {
                threshold: 0.25,
                rootMargin: "-80px 0px -40% 0px"
            }
        );

    sections.forEach((section) => {
        observer.observe(section);
    });

}


/* =========================================================
   HEADER SCROLL EFFECT
   ========================================================= */

function initScrollEffects() {

    const header =
        document.getElementById("header");

    if (!header) {
        return;
    }

    const updateHeader = () => {

        if (window.scrollY > 40) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    };

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );

}


/* =========================================================
   REVEAL ANIMATIONS
   ========================================================= */

function initRevealAnimations() {

    const elements =
        document.querySelectorAll(
            ".service-card, .security-card, .stat, .dashboard-window, .premium-card"
        );

    if (!elements.length) {
        return;
    }

    elements.forEach((element) => {

        element.classList.add("reveal");

    });

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

    elements.forEach((element) => {
        observer.observe(element);
    });

}


/* =========================================================
   BUTTON CLICK EFFECT
   ========================================================= */

function initButtonEffects() {

    const buttons =
        document.querySelectorAll(
            ".btn"
        );

    buttons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                button.classList.add(
                    "button-clicked"
                );

                setTimeout(() => {

                    button.classList.remove(
                        "button-clicked"
                    );

                }, 250);

            }
        );

    });

}


/* =========================================================
   PASSWORD VISIBILITY
   ========================================================= */

function initPasswordToggle() {

    const passwordInputs =
        document.querySelectorAll(
            'input[type="password"]'
        );

    passwordInputs.forEach((input) => {

        /*
           This does not create a visible button.
           It simply keeps password fields compatible
           with the rest of the Infiniti interface.
        */

        input.addEventListener(
            "focus",
            () => {

                input.classList.add(
                    "password-focused"
                );

            }
        );

        input.addEventListener(
            "blur",
            () => {

                input.classList.remove(
                    "password-focused"
                );

            }
        );

    });

}


/* =========================================================
   LOGIN
   ========================================================= */

function initLogin() {

    const loginForm =
        document.getElementById(
            "loginForm"
        );

    if (!loginForm) {
        return;
    }

    loginForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            if (!supabaseClient) {

                showMessage(
                    "Supabase is not configured correctly.",
                    "error"
                );

                return;
            }


            const emailInput =
                document.getElementById(
                    "email"
                );

            const passwordInput =
                document.getElementById(
                    "password"
                );


            if (
                !emailInput ||
                !passwordInput
            ) {

                showMessage(
                    "Login fields could not be found.",
                    "error"
                );

                return;

            }


            const email =
                emailInput.value.trim();

            const password =
                passwordInput.value;


            if (!email || !password) {

                showMessage(
                    "Please enter your email and password.",
                    "error"
                );

                return;

            }


            const submitButton =
                loginForm.querySelector(
                    'button[type="submit"]'
                );


            setButtonLoading(
                submitButton,
                true,
                "Signing in..."
            );


            try {

                const {
                    data,
                    error
                } =
                    await supabaseClient.auth
                        .signInWithPassword({
                            email,
                            password
                        });


                if (error) {

                    showMessage(
                        error.message,
                        "error"
                    );

                    return;

                }


                console.log(
                    "Logged in user:",
                    data.user
                );


                showMessage(
                    "Welcome back to Infiniti.",
                    "success"
                );


                loginForm.reset();


                /*
                   Give the user a moment to see
                   the success message.
                */

                setTimeout(() => {

                    window.location.hash =
                        "home";

                }, 1200);


            } catch (error) {

                console.error(
                    "Login error:",
                    error
                );

                showMessage(
                    "Something went wrong while signing in.",
                    "error"
                );

            } finally {

                setButtonLoading(
                    submitButton,
                    false,
                    "Sign in"
                );

            }

        }
    );

}


/* =========================================================
   SIGN UP
   ========================================================= */

function initSignup() {

    const signupForm =
        document.getElementById(
            "signupForm"
        );

    if (!signupForm) {
        return;
    }


    signupForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            if (!supabaseClient) {

                showMessage(
                    "Supabase is not configured correctly.",
                    "error"
                );

                return;

            }


            const nameInput =
                document.getElementById(
                    "signupName"
                );

            const emailInput =
                document.getElementById(
                    "signupEmail"
                );

            const passwordInput =
                document.getElementById(
                    "signupPassword"
                );


            if (
                !nameInput ||
                !emailInput ||
                !passwordInput
            ) {

                showMessage(
                    "Sign-up fields could not be found.",
                    "error"
                );

                return;

            }


            const fullName =
                nameInput.value.trim();

            const email =
                emailInput.value.trim();

            const password =
                passwordInput.value;


            if (
                !fullName ||
                !email ||
                !password
            ) {

                showMessage(
                    "Please complete all sign-up fields.",
                    "error"
                );

                return;

            }


            if (password.length < 6) {

                showMessage(
                    "Your password must be at least 6 characters.",
                    "error"
                );

                return;

            }


            const submitButton =
                signupForm.querySelector(
                    'button[type="submit"]'
                );


            setButtonLoading(
                submitButton,
                true,
                "Creating account..."
            );


            try {

                const {
                    data,
                    error
                } =
                    await supabaseClient.auth
                        .signUp({

                            email,
                            password,

                            options: {

                                data: {
                                    full_name:
                                        fullName
                                }

                            }

                        });


                if (error) {

                    console.error(
                        "Signup error:",
                        error
                    );

                    showMessage(
                        error.message,
                        "error"
                    );

                    return;

                }


                console.log(
                    "Signup response:",
                    data
                );


                /*
                   If email confirmation is enabled
                   in Supabase, the user will receive
                   a confirmation email.
                */

                if (
                    data.user &&
                    data.user.identities &&
                    data.user.identities.length === 0
                ) {

                    showMessage(
                        "An account with this email may already exist.",
                        "error"
                    );

                    return;

                }


                /*
                   Create/update the user's profile
                   when a session is immediately available.
                */

                if (data.user && data.session) {

                    await createProfile(
                        data.user,
                        fullName
                    );

                }


                signupForm.reset();


                if (!data.session) {

                    showMessage(
                        "Account created. Please check your email to confirm your account.",
                        "success"
                    );

                } else {

                    showMessage(
                        "Account created successfully. Welcome to Infiniti.",
                        "success"
                    );

                }


                setTimeout(() => {

                    window.location.hash =
                        "login";

                }, 1800);


            } catch (error) {

                console.error(
                    "Signup error:",
                    error
                );

                showMessage(
                    "Something went wrong while creating your account.",
                    "error"
                );

            } finally {

                setButtonLoading(
                    submitButton,
                    false,
                    "Create account"
                );

            }

        }
    );

}


/* =========================================================
   CREATE PROFILE
   ========================================================= */

async function createProfile(
    user,
    fullName
) {

    if (!supabaseClient || !user) {
        return;
    }


    try {

        const {
            error
        } =
            await supabaseClient
                .from("profiles")
                .upsert({

                    id: user.id,

                    full_name:
                        fullName

                });


        if (error) {

            console.error(
                "Profile creation error:",
                error
            );

        }

    } catch (error) {

        console.error(
            "Profile error:",
            error
        );

    }

}


/* =========================================================
   AUTHENTICATION STATE
   ========================================================= */

async function initAuthenticationState() {

    if (!supabaseClient) {
        return;
    }


    try {

        const {
            data,
            error
        } =
            await supabaseClient.auth
                .getSession();


        if (error) {

            console.error(
                "Session error:",
                error
            );

            return;

        }


        if (data.session) {

            console.log(
                "Current user:",
                data.session.user
            );

        }


        /*
           Listen for login/logout/signup changes.
        */

        supabaseClient.auth
            .onAuthStateChange(
                (event, session) => {

                    console.log(
                        "Auth event:",
                        event
                    );


                    if (
                        event === "SIGNED_IN" &&
                        session
                    ) {

                        console.log(
                            "User signed in:",
                            session.user
                        );

                    }


                    if (
                        event === "SIGNED_OUT"
                    ) {

                        console.log(
                            "User signed out."
                        );

                    }

                }
            );


    } catch (error) {

        console.error(
            "Authentication initialization error:",
            error
        );

    }

}


/* =========================================================
   LOGOUT FUNCTION
   ========================================================= */

async function logoutUser() {

    if (!supabaseClient) {
        return;
    }


    try {

        const {
            error
        } =
            await supabaseClient.auth
                .signOut();


        if (error) {

            showMessage(
                error.message,
                "error"
            );

            return;

        }


        showMessage(
            "You have been signed out.",
            "success"
        );


    } catch (error) {

        console.error(
            "Logout error:",
            error
        );

        showMessage(
            "Unable to sign out right now.",
            "error"
        );

    }

}


/* =========================================================
   CONTACT FORM
   ========================================================= */

function initContactForm() {

    const contactForm =
        document.getElementById(
            "contactForm"
        );

    if (!contactForm) {
        return;
    }


    contactForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const name =
                document.getElementById(
                    "name"
                )?.value.trim();


            const email =
                document.getElementById(
                    "contactEmail"
                )?.value.trim();


            const message =
                document.getElementById(
                    "message"
                )?.value.trim();


            if (
                !name ||
                !email ||
                !message
            ) {

                showMessage(
                    "Please complete all contact fields.",
                    "error"
                );

                return;

            }


            /*
               Demo contact behaviour.

               We are not storing contact messages
               in Supabase yet.
            */

            console.log(
                "Contact message:",
                {
                    name,
                    email,
                    message
                }
            );


            showMessage(
                "Your message has been received.",
                "success"
            );


            contactForm.reset();

        }
    );

}


/* =========================================================
   MESSAGE / NOTIFICATION SYSTEM
   ========================================================= */

function showMessage(
    message,
    type = "info"
) {

    /*
       Remove existing notification.
    */

    const existing =
        document.querySelector(
            ".infiniti-message"
        );

    if (existing) {
        existing.remove();
    }


    const notification =
        document.createElement(
            "div"
        );


    notification.className =
        `infiniti-message ${type}`;


    notification.textContent =
        message;


    notification.setAttribute(
        "role",
        "alert"
    );


    document.body.appendChild(
        notification
    );


    requestAnimationFrame(() => {

        notification.classList.add(
            "show"
        );

    });


    setTimeout(() => {

        notification.classList.remove(
            "show"
        );


        setTimeout(() => {

            notification.remove();

        }, 300);


    }, 4500);

}


/* =========================================================
   BUTTON LOADING STATE
   ========================================================= */

function setButtonLoading(
    button,
    loading,
    text
) {

    if (!button) {
        return;
    }


    if (loading) {

        button.dataset.originalText =
            button.textContent.trim();

        button.disabled = true;

        button.textContent = text;

        button.classList.add(
            "loading"
        );

    } else {

        button.disabled = false;

        button.textContent =
            text ||
            button.dataset.originalText ||
            "Submit";

        button.classList.remove(
            "loading"
        );

    }

}


/* =========================================================
   ESCAPE KEY
   ========================================================= */

function initEscapeKey() {

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key !== "Escape"
            ) {

                return;

            }


            const menuToggle =
                document.getElementById(
                    "menuToggle"
                );

            const mainNav =
                document.getElementById(
                    "mainNav"
                );


            if (
                menuToggle &&
                mainNav
            ) {

                mainNav.classList.remove(
                    "active"
                );

                menuToggle.classList.remove(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove(
                    "menu-open"
                );

            }

        }
    );

}


/* =========================================================
   CURRENT YEAR
   ========================================================= */

function initCurrentYear() {

    const yearElements =
        document.querySelectorAll(
            "#year"
        );


    yearElements.forEach(
        (element) => {

            element.textContent =
                new Date()
                    .getFullYear();

        }
    );

}


/* =========================================================
   CONSOLE MESSAGE
   ========================================================= */

console.log(
    "∞ Infiniti loaded successfully."
);console.log("Infiniti JavaScript + Supabase loaded successfully.");}