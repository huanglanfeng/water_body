/*
 * 截取视频的第一帧
 */
export const getVideoBase64 = (url: string) => {
  return new Promise((resolve) => {
    let dataURL = "";
    const video = document.createElement("video") as HTMLVideoElement;
    video.setAttribute("crossOrigin", "anonymous"); // 处理跨域
    video.setAttribute("src", url);
    video.setAttribute("width", "400");
    video.setAttribute("height", "240");
    video.setAttribute("preload", "auto"); // 防止截取图片黑屏的关键属性
    video.setAttribute("autoplay", "autoplay");
    video.addEventListener("loadeddata", () => {
      const canvas = document.createElement("canvas");
      const width = video.videoWidth; // canvas的尺寸和视频一样
      const height = video.videoHeight;
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d")!.drawImage(video, 0, 0, width, height); // 绘制canvas
      const imageData: any = canvas
        .getContext("2d")!
        .getImageData(0, 0, canvas.width, canvas.height); // 绘制canvas
      const arr = imageData.data;
      dataURL = canvas.toDataURL("image/png"); // 转换为base64
      const brr = [];
      for (let a = 0; a < arr.length; a++) {
        const arrItem = arr[a];
        if (arrItem > 0 && arrItem < 200) {
          brr.push(arrItem);
        }
      }
      if (!brr.length) {
        // 截取的图片无效（黑屏、白屏、透明），这里可以返回系统默认图片
      }
      resolve(dataURL);
    });
  });
};
