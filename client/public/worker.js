let array = [];

self.addEventListener('message', event =>{
    if(event.data === 'download'){
        console.log('download start! using worker');
        const blob = new Blob(array);
        //const href = URL.createObjectURL(blob);
        self.postMessage(blob);
        //console.log(href);
        array = [];
        console.log(array) //[]
    }else{
        console.log('still collecting~');
        array.push(event.data);
    }
})