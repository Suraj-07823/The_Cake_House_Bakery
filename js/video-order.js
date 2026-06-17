/**
 * Video Custom Order Handler
 * Uses MediaRecorder API to record video/audio and provides WhatsApp sharing
 */

document.addEventListener('DOMContentLoaded', () => {
    const videoPreview = document.getElementById('video-preview');
    const recordedVideo = document.getElementById('recorded-video');
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const restartBtn = document.getElementById('restart-btn');
    const sendBtn = document.getElementById('send-btn');
    const recordingIndicator = document.getElementById('recording-indicator');
    const timerDisplay = document.getElementById('timer');
    const statusMsg = document.getElementById('status-msg');

    let mediaRecorder;
    let recordedChunks = [];
    let stream;
    let timerInterval;
    let seconds = 0;

    // Initialize camera preview
    async function initCamera() {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ 
                video: true, 
                audio: true 
            });
            videoPreview.srcObject = stream;
            statusMsg.textContent = "Camera ready. Press start to record your order.";
        } catch (err) {
            console.error("Error accessing camera:", err);
            statusMsg.textContent = "Error: Could not access camera/microphone. Please ensure permissions are granted.";
            statusMsg.style.color = "#ff4d4f";
            startBtn.disabled = true;
        }
    }

    // Start Recording
    startBtn.addEventListener('click', () => {
        recordedChunks = [];
        mediaRecorder = new MediaRecorder(stream, {
            mimeType: 'video/webm;codecs=vp9,opus'
        });

        // If vp9 not supported, fallback to default
        if (!MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus')) {
            mediaRecorder = new MediaRecorder(stream);
        }

        mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
                recordedChunks.push(e.data);
            }
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            
            // UI Updates
            videoPreview.style.display = 'none';
            recordedVideo.style.display = 'block';
            recordedVideo.src = url;
            
            sendBtn.style.display = 'inline-flex';
            restartBtn.style.display = 'inline-flex';
            stopBtn.style.display = 'none';
            recordingIndicator.style.display = 'none';
            timerDisplay.style.display = 'none';
            
            statusMsg.textContent = "Recording complete! Review your video or record again. To order, click send and then attach this video in WhatsApp.";
        };

        mediaRecorder.start();
        
        // UI Updates
        startBtn.style.display = 'none';
        stopBtn.style.display = 'inline-flex';
        recordingIndicator.style.display = 'flex';
        timerDisplay.style.display = 'block';
        statusMsg.textContent = "Recording... Describe your cake clearly!";
        
        startTimer();
    });

    // Stop Recording
    stopBtn.addEventListener('click', () => {
        mediaRecorder.stop();
        stopTimer();
    });

    // Restart Recording
    restartBtn.addEventListener('click', () => {
        videoPreview.style.display = 'block';
        recordedVideo.style.display = 'none';
        recordedVideo.src = '';
        
        startBtn.style.display = 'inline-flex';
        sendBtn.style.display = 'none';
        restartBtn.style.display = 'none';
        
        statusMsg.textContent = "Camera ready. Press start to record your order.";
        seconds = 0;
        updateTimerDisplay();
    });

    // Send via WhatsApp
    sendBtn.addEventListener('click', () => {
        const message = `Hi! I've recorded a video for a custom cake order. I'm attaching the video now. Please check it and let me know the details.`;
        const encodedMessage = encodeURIComponent(message);
        
        // Use the WhatsApp number from script.js if available, else fallback
        const whatsappNum = typeof WHATSAPP_NUMBER !== 'undefined' ? WHATSAPP_NUMBER : '919822316064';
        const waLink = `https://wa.me/${whatsappNum}?text=${encodedMessage}`;
        
        // Trigger download of the video so user can attach it easily
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `cake_order_${new Date().getTime()}.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Open WhatsApp
        window.open(waLink, '_blank');
        
        statusMsg.textContent = "Video downloaded! Please attach it to the WhatsApp chat that just opened.";
    });

    // Timer Logic
    function startTimer() {
        seconds = 0;
        updateTimerDisplay();
        timerInterval = setInterval(() => {
            seconds++;
            updateTimerDisplay();
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function updateTimerDisplay() {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        timerDisplay.textContent = `${mins}:${secs}`;
    }

    // Initialize
    initCamera();
});
