import { https } from "@/api";

export function getImgs() {
    return new Promise((resolve, reject) => {
        https.getImgs1080().then(res => {
            let imgList = res;
            resolve(imgList);
        })
    });
}