document.addEventListener('DOMContentLoaded', () => {

    /* TO DO 
    
    MAKE WINDOW MOVABLE THROUGH HEADER CLICKING

    -> Get clicking event working over window
    */

    /*

    class WindowManager {

        constructor(width, height, leftPosition, topPosition) {
            this.width = width
            this.height = height
            this.leftPosition = leftPosition
            this.topPosition = topPosition
        }
        
        MousePosition(positionX, positionY) {
    
            const self = this
            self.positionX = positionX
            self.positionY = positionY

            document.addEventListener('mousemove', moveWindowEvent)
            document.addEventListener('mouseup', removeEvent)
            document.addEventListener('mouseleave', removeEvent)

            function moveWindowEvent(e) {
                e.preventDefault()
                let newOffsetX = e.clientX - self.positionX 
                let newOffsetY = e.clientY - self.positionY
                console.log(newOffsetX, newOffsetY)
                self.leftPosition = newOffsetX
                self.topPosition = newOffsetY
                console.log(newOffsetX, newOffsetY)
            }
    
            function removeEvent() {
                document.removeEventListener('mousemove', moveWindowEvent)
                document.addEventListener('mouseup', removeEvent)
                document.addEventListener('mouseleave', removeEvent)
    
            }
        }
    }
    */

    const desktop = document.getElementById('desktop')
    const windowsButton = document.getElementById('menu-button')
    const windowsMenu = document.getElementById('menu')
    let openMenu = 0
    //windowsMenu.className = 'Menu Hidden'
    
    windowsButton.addEventListener('click', () => {
        if (openMenu == 0) {
            windowsMenu.className = 'Menu'
            openMenu += 1
        }
        else {
            windowsMenu.className = 'Menu Hidden'
            openMenu -= 1
        }
    })
    
    let menuPrograms = Array.from(document.querySelectorAll('session'))
    
    menuPrograms.forEach((menuCell) => {

        menuCell.addEventListener('click', () => {    

            createNewWindow(desktop, menuCell)

            openWindows =  Array.from(document.getElementsByClassName('New Window'))

            moveWindowEvent(openWindows)
            resizableWindowEvent(openWindows)
       
        })
    })
})

function createNewWindow(finalLocation, cellClicked) {

    if (cellClicked.className.includes('Closed')) {
        
        let newWindow = document.createElement('div')
        newWindow.id = 'new-window'
        newWindow.className = 'New Window'
        
        let windowHeader = document.createElement('div')
        windowHeader.style.width = '100%'
        windowHeader.style.height = '10%'
        windowHeader.style.background = 'lightblue'
        windowHeader.id = 'window-header'
        

        let windowContent = document.createElement('object')
        windowContent.style.width = '100%'
        windowContent.style.height = '100%'
        
      

        

        if (cellClicked.className == 'Paint Cell') {
            windowContent.setAttribute('data', 'pages/paint/paint.html')
        }
        
        
        newWindow.append(windowHeader)
        newWindow.append(windowContent)
        finalLocation.append(newWindow)
        
        newClassName = cellClicked.className.replace('Closed', 'Open')
        cellClicked.className = newClassName
        
    }   
}

function getAttribute(element, style) {
    return window.getComputedStyle(element).getPropertyValue(style)
}

function moveWindowEvent(window) {
    for (i=0; i < window.length; i++) {
        (function (currentWindow) {
            currentWindow.firstChild.addEventListener('mousedown', (e) => {
                

                let offsetX = e.offsetX
                let offsetY = e.offsetY
                
                
                currentWindow.firstChild.addEventListener('mousemove', newOffset)
                currentWindow.firstChild.addEventListener('mouseup', removingEvents)
                currentWindow.firstChild.addEventListener('mouseleave', removingEvents)
                
                function newOffset(e) {
                    e.preventDefault()
                    newOffsetX = e.clientX - offsetX
                    newOffsetY = e.clientY - offsetY
                    currentWindow.style.left = newOffsetX + 'px'
                    currentWindow.style.top = newOffsetY + 'px'
                }

                function removingEvents() {
                    currentWindow.firstChild.removeEventListener('mousemove', newOffset)
                    currentWindow.firstChild.removeEventListener('mouseup', removingEvents)
                    currentWindow.firstChild.removeEventListener('mouseleave', removingEvents)
                }
                
            })
        })
        (window[i])
    }
}

function resizableWindowEvent(window) {
    for (i=0; i < window.length; i++) {
        (function (tackledWindow, size= 10) {
            
            const top = document.createElement('div')
            top.style.width = '100%';
            top.style.height = size + 'px';
            top.style.backgroundColor = 'transparent';
            top.style.position = 'absolute';
            top.style.top = - (size / 2) + 'px';
            top.style.left = '0px';
            top.style.cursor = 'n-resize';
            top.id = 'top'

            const bottom = document.createElement('div');
            bottom.style.width = '100%';
            bottom.style.height = size + 'px';
            bottom.style.backgroundColor = 'yellow';
            bottom.style.position = 'absolute';
            bottom.style.bottom = - (size / 2) + 'px';
            bottom.style.left = '0px';
            bottom.style.cursor = 'n-resize';
            bottom.id = 'bottom'
            
            const left = document.createElement('div');
            left.style.width = size + 'px';
            left.style.height = '100%';
            left.style.backgroundColor = 'transparent';
            left.style.position = 'absolute';
            left.style.top = '0px';
            left.style.left = - (size / 2) + 'px';
            left.style.cursor = 'e-resize';
            left.id = 'left'
            
            const right = document.createElement('div');
            right.style.width = size + 'px';
            right.style.height = '100%';
            right.style.backgroundColor = 'transparent';
            right.style.position = 'absolute';
            right.style.top = '0px';
            right.style.right = - (size / 2) + 'px';
            right.style.cursor = 'e-resize';
            right.id = 'right'

            const corner1 = document.createElement('div');
            corner1.style.width = size + 'px';
            corner1.style.height = size + 'px';
            corner1.style.backgroundColor = 'transparent';
            corner1.style.position = 'absolute';
            corner1.style.top = - (size / 2) + 'px';
            corner1.style.left = - (size / 2) + 'px';
            corner1.style.cursor = 'nw-resize';
            
            const corner2 = document.createElement('div');
            corner2.style.width = size + 'px';
            corner2.style.height = size + 'px';
            corner2.style.backgroundColor = 'transparent';
            corner2.style.position = 'absolute';
            corner2.style.top = - (size / 2) + 'px';
            corner2.style.right = - (size / 2) + 'px';
            corner2.style.cursor = 'ne-resize';
            
            const corner3 = document.createElement('div');
            corner3.style.width = size + 'px';
            corner3.style.height = size + 'px';
            corner3.style.backgroundColor = 'transparent';
            corner3.style.position = 'absolute';
            corner3.style.bottom = - (size / 2) + 'px';
            corner3.style.left = - (size / 2) + 'px';
            corner3.style.cursor = 'sw-resize';
            
            const corner4 = document.createElement('div');
            corner4.style.width = size + 'px';
            corner4.style.height = size + 'px';
            corner4.style.backgroundColor = 'transparent';
            corner4.style.position = 'absolute';
            corner4.style.bottom = - (size / 2) + 'px';
            corner4.style.right = - (size / 2) + 'px';
            corner4.style.cursor = 'se-resize';

            tackledWindow.append(top)
            tackledWindow.append(bottom)
            tackledWindow.append(left)
            tackledWindow.append(right)
            tackledWindow.appendChild(corner1);
            tackledWindow.appendChild(corner2);
            tackledWindow.appendChild(corner3);
            tackledWindow.appendChild(corner4);



            /*
            corner1.addEventListener('mousedown', resizeDiagonal_one);
            corner2.addEventListener('mousedown', resizeDiagonal_two);
            corner3.addEventListener('mousedown', resizeDiagonal_three);
            corner4.addEventListener('mousedown', resizeDiagonal_four);
            */
            top.addEventListener('mousedown', resizeWindow);
            left.addEventListener('mousedown', resizeWindow);
            right.addEventListener('mousedown', resizeWindow);
            /*
            bottom.addEventListener('mousedown', resizeYPositive);
            */

            var windowsHeight = parseInt((getAttribute(tackledWindow, 'height'))) 
            var windowsWidth = parseInt((getAttribute(tackledWindow, 'width')))
            var offsetTop = tackledWindow.offsetTop
            var offsetLeft = tackledWindow.offsetLeft

            function resizeWindow(e) {

                let offsetX = e.clientX
                let offsetY = e.clientY

                let tackledBorder = document.getElementById(this.id).id
                tackledWindow.addEventListener('mousemove', startDrag)
                tackledWindow.addEventListener('mouseup', stopDragging)
                
                function startDrag(e) {
                
                    if (tackledBorder == 'top') {
                      
                    }
                    
                    else if (tackledBorder == 'left') {
                        
                    }

                    else if (tackledBorder == 'right') {
                     
                    }

                    else if (tackledBorder == 'bottom') {
                    
                    }

                    else if (tackledBorder == 'corner1') {
                    
                    }

                    else if (tackledBorder == 'corner2') {
                    
                    }

                    else if (tackledBorder == 'corner3') {
                    
                    }

                    else if (tackledBorder == 'corner4') {
                    
                    }
                }

                function stopDragging() {
                    tackledWindow.removeEventListener('mousemove', startDrag);
                }

            }

        }
        (window[i]))
    }
}





