navigator.getUserMedia = navigator.webkitGetUserMedia

const video = require('./video')
const countdown = require('./countdown')

function formatImgTag(doc, bytes) {
    const div = doc.createElement('div')
    div.classList.add('photo')
    const close = doc.createElement('div')
    close.classList.add('photoClose')
    const img = new Image()
    img.classList.add('photoImg')
    img.src = bytes
    div.appendChild(img)
    div.appendChild(close)
    return div
}


window.addEventListener('DOMContentLoaded', _ => {
    const videoEl = document.getElementById('video')
    const canvasEl = document.getElementById('canvas')
    const recordEl = document.getElementById('record')
    const photosEl = document.querySelector('.photosContainer')
    const counterEl = document.getElementById('counter')
    
    const ctx = canvasEl.getContext('2d')

    video.init(navigator, videoEl)

    recordEl.addEventListener('click', _ => {
        countdown.start(counterEl, 3, _ => {
            const bytes = video.captureBytes(videoEl, ctx, canvasEl)
            photosEl.appendChild(formatImgTag(document, bytes))
        })
    })
})