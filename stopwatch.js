$(document).ready(() => {
    // Set the date picker to current date
    const today = new Date().toISOString().substr(0, 10);
    $('#date-picker').val(today);

    let totalSeconds = 0;
    let isRunning = false;

    const updateTimeDisplay = () => {
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        $('#time-display').text(`${hours}:${minutes}:${seconds}`);
    };

    const timerPromise = () => {
        return new Promise((resolve) => {
            const intervalId = setInterval(() => {
                if (!isRunning) {
                    clearInterval(intervalId);
                    resolve();
                } else {
                    totalSeconds++;
                    updateTimeDisplay();
                }
            }, 1000);
        });
    };

    const startTimer = async () => {
        if (isRunning) return;
        isRunning = true;
        await timerPromise();
    };

    const stopTimer = () => {
        isRunning = false;
    };

    const resetTimer = async () => {
        await stopTimer();
        totalSeconds = 0;
        updateTimeDisplay();
    };

    $('#start-btn').on('click', () => {
        startTimer();
    });

    $('#stop-btn').on('click', () => {
        stopTimer();
    });

    $('#reset-btn').on('click', () => {
        resetTimer();
    });
});
