export interface Wallpaper {
    url :string;
    name : string;
}
interface FullWallpaper extends Wallpaper {
    liked: boolean;
    suggested: boolean;
    library: boolean;
}

export function useSuggestedWallpapers(): FullWallpaper[] {
    const wallpapers = Wallpapers();
    return wallpapers.filter(wallpaper => wallpaper.suggested);
}

export function useLikedWallpapers(): FullWallpaper[] {
    const wallpapers = Wallpapers();
    return wallpapers.filter(wallpaper => wallpaper.liked);
}

export function useLibraryWallpapers(): FullWallpaper[] {
    const wallpapers = Wallpapers();
    return wallpapers.filter(wallpaper => wallpaper.library);
}

export function useWallpapers(): FullWallpaper[] {
    const wallpapers = Wallpapers();
    return wallpapers;
}

function Wallpapers(): FullWallpaper[] {
    return [{
        url:"https://ideogram.ai/assets/progressive-image/balanced/response/DIwPDvgJQ-ioTttMSNC5Mg",
        name : "Header",
        liked:true,
        suggested:true,
        library:false
    },{
        url:"https://ideogram.ai/assets/progressive-image/balanced/response/ylEX3TEuTzm47geUCEVmzw",
        name : "Heritage",
        liked:true,
        suggested:false,
        library:false
    },{
        url:"https://ideogram.ai/assets/progressive-image/balanced/response/1XL49TjTQsmWOMTjYYuYNg",
        name : "Girl And Boy",
        liked:false,
        suggested:true,
        library:false
    },{
        url:"https://ideogram.ai/assets/progressive-image/balanced/response/B2zW4y2eS1CZaL_emyDMtw",
        name: "Sasha",
        liked:true,
        suggested:false,
        library:false
    },{
        url:"https://ideogram.ai/assets/progressive-image/balanced/response/99Z0BkOARwKHOHnxNQN4nA",
        name: "Alina",
        liked:true,
        suggested:true,
        library:true
    },{
        url:"https://ideogram.ai/assets/progressive-image/balanced/response/ApbQqjSmSy-2bsTl3kiz-A",
        name: "Frog",
        liked:false,
        suggested:true,
        library:false
    },{
        url:"https://ideogram.ai/assets/progressive-image/balanced/response/hpWBLCeMRkWI-hIDO3b4Mg",
        name: "Cat Monk",
        liked:true,
        suggested:false,
        library:false
    },{
        url:"https://ideogram.ai/assets/progressive-image/balanced/response/fwu8F9KnROiKhgs-ijTuFw",
        name: "Abstract",
        liked:false,
        suggested:true,
        library:false
    },{
        url:"https://ideogram.ai/assets/progressive-image/balanced/response/V6wlM_VFS0OudIdcWpbuMQ",
        name: "Micky Militia",
        liked:true,
        suggested:true,
        library:false
    },{
        url:"https://ideogram.ai/assets/progressive-image/balanced/response/9AyxwRdPS5mLt0auAzK9Xw",
        name: "Baby Dinosour",
        liked:true,
        suggested:true,
        library:false
    },{
        url:"https://ideogram.ai/assets/progressive-image/balanced/response/l2l69KMiT92pLsaDFzRBgA",
        name: "Doctor Normal",
        liked:true,
        suggested:true,
        library:false
    },{
        url:"https://ideogram.ai/assets/progressive-image/balanced/response/K5jvl4xhSw2AyX4fqCVHUg",
        name: "Cookie Fight",
        liked:false,
        suggested:true,
        library:false
    }]
}