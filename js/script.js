const form = document.getElementById('generate-form')
const qr = document.getElementById('qrcode')

const onGenerateSubmit = (e) => {
    e.preventDefault()

    clearUI()

    const url = document.getElementById('url')
    const size = document.getElementById('size')

    if (url.value === '') {
        // alert('Please enter a URL')

        url.classList.add('error')

        setTimeout(() => {
            url.classList.remove('error')
        }, 1000);
    } else {
        showSpinner()

        setTimeout(() => {
            hideSpinner()

            generateQRCode(url, size)

            setTimeout(() => {
                const saveUrl = qr.querySelector('img').src
                createSaveBtn(saveUrl)
            }, 50)
        }, 1000)
    }
}

const generateQRCode = (url, size) => {
    const qrcode = new QRCode('qrcode', {
        text: url.value,
        width: size.value,
        height: size.value
    })
}

const showSpinner = () => {
    document.getElementById('spinner').style.display = 'block'
}

const hideSpinner = () => {
    document.getElementById('spinner').style.display = 'none'
}

const clearUI = () => {
    qr.innerHTML = ''
    
    const saveBtn = document.getElementById('save-link')

    if (saveBtn) {
        saveBtn.remove()
    }
}

const createSaveBtn = (saveUrl) => {
    const link = document.createElement('a')

    link.id = 'save-link'
    link.classList = 'bg-[#F84693] hover:bg-[#D83582] text-white font-bold py-2 rounded w-1/3 m-auto my-5'
    link.style.width = '240px'
    link.href = saveUrl
    link.download = 'url-qrcode'
    link.innerHTML = 'Save Image'

    document.getElementById('generated').appendChild(link)
}

hideSpinner()

form.addEventListener('submit', onGenerateSubmit)
