
function isTouchScreen() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

if ( isTouchScreen() && window.innerWidth <= 800) {
    alert("Versão mobile está incompleta");
}


function createStars() {
    const starsContainer = document.getElementById('stars-container');
    const starCount = 100;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        starsContainer.appendChild(star);
    }
}


function makeWindowsDraggable() {
    const windows = document.querySelectorAll('.window, .error-window');

    windows.forEach(window => {
        const header = window.querySelector('.window-header, .error-header');
        let isDragging = false;
        let offsetX, offsetY;

        header.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - window.getBoundingClientRect().left;
            offsetY = e.clientY - window.getBoundingClientRect().top;
            window.style.zIndex = getHighestZIndex() + 1;

          
            window.classList.add('dragging');
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;

          
            const maxX = window.parentElement.clientWidth - window.offsetWidth;
            const maxY = window.parentElement.clientHeight - window.offsetHeight;

            window.style.left = `${Math.max(0, Math.min(x, maxX))}px`;
            window.style.top = `${Math.max(0, Math.min(y, maxY))}px`;
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            window.classList.remove('dragging');
        });
    });
}


function getHighestZIndex() {
    const windows = document.querySelectorAll('.window, .error-window');
    let highest = 10; 

    windows.forEach(window => {
        const zIndex = parseInt(window.style.zIndex || 10);
        if (zIndex > highest) highest = zIndex;
    });

    return highest;
}


function initButtons() {
    
    const closeButtons = document.querySelectorAll('.window-button:last-child');
    closeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const windowId = this.getAttribute('data-window');
            const windowElement = document.getElementById(windowId);
            if (windowElement) {
                windowElement.style.display = 'none';
            }
        });
    });

 
    document.getElementById('ok-button').addEventListener('click', function () {
        document.getElementById('error-window').style.display = 'none';
    });

    document.getElementById('cancel-button').addEventListener('click', function () {
        document.getElementById('error-window').style.display = 'none';
    });

    
    const paintColors = document.querySelectorAll('.paint-color');
    paintColors.forEach(color => {
        color.addEventListener('click', function () {
          
            paintColors.forEach(c => c.style.border = '1px inset #808080');
            
            this.style.border = '2px solid white';
        });
    });
}


function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();

   
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}`;
}


function animateProgressBar() {
    const progressFill = document.getElementById('progress-fill');
    let width = 70; 
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            progressFill.style.backgroundColor = '#00ff00';
            document.querySelector('.progress-label').textContent = 'Loaded! 100%';
        } else {
            width += 1;
            progressFill.style.width = width + '%';
            document.querySelector('.progress-label').textContent = `Loading... ${width}%`;
        }
    }, 300);
}


function initRandomPopups() {
    const popups = document.querySelectorAll('.random-popup');

  
    popups.forEach(popup => {
        popup.addEventListener('click', function () {
            this.style.display = 'none';
        });
    });

    setInterval(() => {
        if (Math.random() > 0.9) { 
            createRandomPopup();
        }
    }, 10000); 
}


function createRandomPopup() {
    const messages = [
        "💻 You've got mail!",
        "⚠️ Your computer might be at risk!",
        "🔄 Updates available",
        "💿 Free CD-ROM offer!",
        "🌟 Congratulations! You're the 1,000,000th visitor!",
        "🔥 Hot singles in your area",
        "📊 Memory usage: 89%",
        "🚀 Boost your internet speed now!",
        "🔊 Click to claim your free ringtone"
    ];

    const popup = document.createElement('div');
    popup.className = 'random-popup';
    popup.textContent = messages[Math.floor(Math.random() * messages.length)];




    popup.style.top = `${Math.random() * 70}%`;
    popup.style.left = `${Math.random() * 70}%`;


    popup.addEventListener('click', function () {
        this.style.display = 'none';
    });

    document.querySelector('.container').appendChild(popup);

    
    setTimeout(() => {
        popup.style.display = 'none';
    }, 15000);
}







function initStartMenu() {
    const startButton = document.getElementById('start-button');
    let startMenuOpen = false;
    let startMenu = null;

    startButton.addEventListener('click', function () {
        if (startMenuOpen) {
            startMenu.remove();
            startMenuOpen = false;
            return;
        }

        
        startMenu = document.createElement('div');
        startMenu.style.position = 'absolute';
        startMenu.style.bottom = '40px';
        startMenu.style.left = '0';
        startMenu.style.width = '200px';
        startMenu.style.backgroundColor = '#c0c0c0';
        startMenu.style.border = '2px outset #ffffff';
        startMenu.style.boxShadow = '5px 5px 10px rgba(0, 0, 0, 0.5)';
        startMenu.style.zIndex = '1001';

       
        const menuItems = [
            { text: "📝 Notepad", action: () => alert("Notepad not available") },
            { text: "🧮 Calculator", action: () => alert("Calculator not available") },
            { text: "🌐 Internet Explorer", action: () => alert("Internet Explorer not available") },
            { text: "📂 My Documents", action: () => alert("My Documents not available") },
            { text: "🖼️ My Pictures", action: () => window.location.href = "https://www.instagram.com/rapburad/" },
            { text: "🎵 My Music", action: () => window.location.href = "https://open.spotify.com/user/vwmi5n4th8rh3nin3cspw95u1" },
            { text: "❓ Help", action: () => helpPopup() },
            { text: "🔄 Restart", action: () => location.reload() },
            { text: "⏻ Shut Down", action: () => document.body.innerHTML = "<div style='height:100vh;width:100%;display:flex;justify-content:center;align-items:center;background-color:black;color:white;font-family:monospace;'>It is now safe to turn off your computer.</div>" }
        ];

        menuItems.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.textContent = item.text;
            menuItem.style.padding = '8px 15px';
            menuItem.style.borderBottom = '1px solid #adadad';
            menuItem.style.cursor = 'pointer';
            menuItem.style.transition = 'all 0.2s';

            menuItem.addEventListener('mouseover', function () {
                this.style.backgroundColor = '#000080';
                this.style.color = 'white';
            });

            menuItem.addEventListener('mouseout', function () {
                this.style.backgroundColor = 'transparent';
                this.style.color = 'black';
            });

            menuItem.addEventListener('click', item.action);

            startMenu.appendChild(menuItem);
        });

        document.querySelector('.container').appendChild(startMenu);
        startMenuOpen = true;
    });

   
    document.addEventListener('click', function (e) {
        if (startMenuOpen && e.target !== startButton && !startMenu.contains(e.target)) {
            startMenu.remove();
            startMenuOpen = false;
        }
    });
}







setTimeout(() => {
    const browserWarning = document.createElement('div');
    browserWarning.className = 'error-window';
    browserWarning.style.top = '40%';
    browserWarning.style.left = '50%';
    browserWarning.style.transform = 'translate(-50%, -50%)';
    browserWarning.style.zIndex = '2000';

    browserWarning.innerHTML = `
    <div class="error-header">Browser Warning</div>
    <div class="error-body">
        <div class="error-icon">⚠️</div>
        <div>This page is optimized for Netscape Navigator 4.0 and Internet Explorer 5.0 at 800x600 resolution. Your experience may vary.</div>
    </div>
    <div class="error-buttons">
        <button class="error-button" id="browser-ok">OK</button>
    </div>
`;

    document.body.appendChild(browserWarning);

    document.getElementById('browser-ok').addEventListener('click', function () {
        browserWarning.remove();
    });
    makeWindowsDraggable()

}, 5000);



function helpPopup() {
    const helpPopup = document.createElement('div');
    helpPopup.className = 'error-window';
    helpPopup.style.top = '50%';
    helpPopup.style.left = '25%';
    helpPopup.style.transform = 'translate(-50%, -50%)';
    helpPopup.style.zIndex = '2000';

    helpPopup.innerHTML = `
    <div class="error-header">Help Popup</div>
    <div class="error-body">
        <div class="error-icon">❓</div>
<div>
  <p>Precisa de ajuda? Entre em contato:</p>
  
  <a href="mailto:contato@raphaelburad.com.br">contato@raphaelburad.com.br</a>
</div>
    </div>
    <div class="error-buttons">
        <button class="error-button" id="helpPopup-ok">OK</button>
    </div>
`;

    document.body.appendChild(helpPopup);

    document.getElementById('helpPopup-ok').addEventListener('click', function () {
        helpPopup.remove();
    });
    makeWindowsDraggable()
}




function initPaintFunctionality() {
    const paintCanvas = document.createElement('canvas');
    const paintWindow = document.querySelector('#paint-window .window-body div:first-child');

   
    paintCanvas.width = paintWindow.offsetWidth;
    paintCanvas.height = paintWindow.offsetHeight;
    paintCanvas.style.position = 'absolute';
    paintCanvas.style.top = '0';
    paintCanvas.style.left = '0';

    paintWindow.appendChild(paintCanvas);
    paintCanvas.style.cursor = 'crosshair';

    const ctx = paintCanvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#000000'; 

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

   
    const colorPalette = document.createElement('div');
    colorPalette.style.display = 'flex';
    colorPalette.style.flexWrap = 'wrap';
    colorPalette.style.padding = '2px';
    colorPalette.style.backgroundColor = '#c0c0c0';
    colorPalette.style.borderTop = '1px solid #808080';

    const colors = [
        '#000000', '#7f7f7f', '#880015', '#ed1c24', '#ff7f27', '#fff200',
        '#22b14c', '#00a2e8', '#3f48cc', '#a349a4', '#ffffff', '#c3c3c3'
    ];

    colors.forEach(color => {
        const colorBox = document.createElement('div');
        colorBox.style.width = '16px';
        colorBox.style.height = '16px';
        colorBox.style.margin = '2px';
        colorBox.style.backgroundColor = color;
        colorBox.style.border = '1px outset #808080';
        colorBox.style.cursor = 'pointer';

        colorBox.addEventListener('click', () => {
            ctx.strokeStyle = color;
          
            document.querySelectorAll('#paint-window .color-box').forEach(box => {
                box.style.border = '1px outset #808080';
            });
            colorBox.style.border = '1px inset #808080';
        });

        colorBox.classList.add('color-box');
        colorPalette.appendChild(colorBox);
    });

  
    const clearButton = document.createElement('button');
    clearButton.style.cursor = "pointer"
    clearButton.textContent = 'Limpar';
    clearButton.style.margin = '2px';
    clearButton.style.padding = '1px 5px';
    clearButton.style.border = '2px outset #dcdcdc';
    clearButton.style.backgroundColor = '#c0c0c0';
    clearButton.style.fontSize = '10px';

    clearButton.addEventListener('click', () => {
        ctx.clearRect(0, 0, paintCanvas.width, paintCanvas.height);
    });

  
    const brushSizeLabel = document.createElement('span');
    brushSizeLabel.textContent = 'Tamanho: ';
    brushSizeLabel.style.fontSize = '10px';
    brushSizeLabel.style.marginLeft = '5px';

    const brushSize = document.createElement('select');
    brushSize.style.fontSize = '10px';
    brushSize.style.margin = '2px';

    [1, 3, 5, 8, 10].forEach(size => {
        const option = document.createElement('option');
        option.value = size;
        option.textContent = size;
        brushSize.appendChild(option);
    });

    brushSize.value = 3; 

    brushSize.addEventListener('change', () => {
        ctx.lineWidth = brushSize.value;
    });

    
    const controls = document.createElement('div');
    controls.style.display = 'flex';
    controls.style.alignItems = 'center';
    controls.style.padding = '2px';
    controls.style.backgroundColor = '#c0c0c0';
    controls.style.borderTop = '1px solid #808080';

    controls.appendChild(clearButton);
    controls.appendChild(brushSizeLabel);
    controls.appendChild(brushSize);

  
    document.querySelector('#paint-window .window-body').appendChild(colorPalette);
    document.querySelector('#paint-window .window-body').appendChild(controls);


    function startDrawing(e) {
        isDrawing = true;

     
        const rect = paintCanvas.getBoundingClientRect();
        lastX = e.clientX - rect.left;
        lastY = e.clientY - rect.top;
    }

    function draw(e) {
        if (!isDrawing) return;

       
        const rect = paintCanvas.getBoundingClientRect();
        const currentX = e.clientX - rect.left;
        const currentY = e.clientY - rect.top;

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();

       
        lastX = currentX;
        lastY = currentY;
    }

    function stopDrawing() {
        isDrawing = false;
    }


    paintCanvas.addEventListener('mousedown', startDrawing);
    paintCanvas.addEventListener('mousemove', draw);
    paintCanvas.addEventListener('mouseup', stopDrawing);
    paintCanvas.addEventListener('mouseout', stopDrawing);

   
    paintCanvas.addEventListener('mousedown', (e) => {
        e.stopPropagation();
    });

 
    window.addEventListener('resize', () => {
        paintCanvas.width = paintWindow.offsetWidth;
        paintCanvas.height = paintWindow.offsetHeight;
    });
}


document.addEventListener('DOMContentLoaded', function () {
  
    createStars();
    initRandomPopups();
    makeWindowsDraggable();
    initButtons();
    updateClock();
    setInterval(updateClock, 1000);
    animateProgressBar();
    initStartMenu();

   
    if (isTouchScreen() === false) {
        initPaintFunctionality();
    } else {
        document.getElementById("paint-window").style.display = "none"
    }

});