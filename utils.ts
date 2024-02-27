import defaultImage from './images/beatles.jpg';
import img1 from './images/album_covers/1.jpg';
import img2 from './images/album_covers/2.jpg';
import img3 from './images/album_covers/3.jpg';
import img4 from './images/album_covers/4.jpg';
import img5 from './images/album_covers/5.jpg';
import img6 from './images/album_covers/6.jpg';
import img7 from './images/album_covers/7.jpg';
import img8 from './images/album_covers/8.jpg';
import img9 from './images/album_covers/9.jpg';
import img10 from './images/album_covers/10.jpg';
import img11 from './images/album_covers/11.jpg';
import img12 from './images/album_covers/12.jpg';
import img13 from './images/album_covers/13.jpg';


export const shuffleArray = (array: any[]) => 
[...array].sort(() => Math.random() - 0.5);

export const numBet = (length: number) => Math.floor(Math.random() * length);

export const imageSelector = (id: number): string => {
    let selImg: string = '';
    switch (id) {
        case 1:
            selImg = img1;
            break;
        case 2:
            selImg = img2;
            break;
        case 3:
            selImg = img3;
            break;
        case 4:
            selImg = img4;
            break;
        case 5:
            selImg = img5;
            break;
        case 6:
            selImg = img6;
            break;
        case 7:
            selImg = img7;
            break;
        case 8:
            selImg = img8;
            break;
        case 9:
            selImg = img9;
            break;
        case 10:
            selImg = img10;
            break;
        case 11:
            selImg = img11;
            break;
        case 12:
            selImg = img12;
            break;
        case 13:
            selImg = img13;
            break;
        default:
            selImg = defaultImage;
    }

    return selImg;
}