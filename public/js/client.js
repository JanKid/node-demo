// 一个简单http封装
function http(method,url,params) {
	return new Promise((resolve,reject) => {
		var xhr = new XMLHttpRequest()
		xhr.open(method,url)
		xhr.setRequestHeader('X-Requested-With','XMLHttpRequest')
		xhr.withCredentials = true
    xhr.onload = (e) => resolve(xhr.responseText, e, xhr)
    xhr.onerror = (e) => reject(xhr, e)
    xhr.send(params)
	})
}

window.http = http