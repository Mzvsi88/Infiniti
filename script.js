/* =========================================
   JAVASCRIPT EFFECTS
========================================= */

.reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s ease, transform 0.7s ease;
}

.reveal.revealed {
    opacity: 1;
    transform: translateY(0);
}

.button-clicked {
    transform: scale(0.97);
}

.infiniti-message {
    position: fixed;
    left: 50%;
    bottom: 30px;
    transform: translate(-50%, 30px);
    width: min(90%, 500px);
    padding: 15px 18px;
    border-radius: 12px;
    background: #102238;
    border: 1px solid rgba(255,255,255,0.12);
    color: white;
    font-size: 13px;
    text-align: center;
    opacity: 0;
    z-index: 9999;
    transition: 0.3s ease;
    box-shadow: 0 15px 40px rgba(0,0,0,0.3);
}

.infiniti-message.show {
    opacity: 1;
    transform: translate(-50%, 0);
}

.infiniti-message.success {
    border-color: rgba(100,230,196,0.35);
}

.infiniti-message.error {
    border-color: rgba(255,100,100,0.35);
}

.password-toggle {
    position: absolute;
    right: 10px;
    bottom: 9px;
    background: transparent;
    color: #64e6c4;
    font-size: 11px;
    font-weight: 700;
    cursor: pointer;
}