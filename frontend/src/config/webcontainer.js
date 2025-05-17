import { WebContainer } from '@webcontainer/api';

let webContainerInstance = null;

// Call only once
// const webcontainerInstance = await WebContainer.boot();


export const getWebContainer = async () =>{
    if(webContainerInstance === null){
        webContainerInstance =  await WebContainer.boot();
    }
    return webContainerInstance;
}