import GameDataManager from "./GameDataManager";
import ConstPath from '../GameData/ConstPath';
import Platforms from "../Platforms/Platforms";
import HashMap from "../Utils/HashMap";

export default class SoundManager {
    private static mInstance: SoundManager = null;
    public soundClips: HashMap<string, cc.AudioClip> = new HashMap(); // 所有音效资源
    public static getInstance(): SoundManager {
        if (this.mInstance === null) {
            this.mInstance = new SoundManager();
        }
        return this.mInstance;
    }
    private constructor() { }

    public load(url: string, cb: Function) {
        cc.loader.loadRes(ConstPath.SOUND_DIR + url, cc.AudioClip, (err, res) => {
            if (err) {
                console.error("loadRes error ", err);
            } else {
                cb(res);
            }
        });
    }

    public play(url: string, loop = false, cb: Function = null) {
        let playSound = GameDataManager.getInstance().getGameData().isPlaySound;
        if (!playSound)
            return;

        // oppo 平台播放音效卡顿问题解决办法：使用平台的播放接口，远程加载音效进行播放
        if(Platforms.getInstance().isOppo() && !cc.sys.isBrowser) {
            try {
                var audio = window["qg"].createInnerAudioContext();
                audio.loop = loop;
                audio.volume = 1;
                audio.autoplay = false;

                let onErrorFunc = (err) => {
                    if(err) {
                        console.log(err);
                    }
                    audio.offError(onErrorFunc);
                }
                audio.onError(onErrorFunc);

                let onPlayFunc = (err) => {
                    if(err) {
                        console.log(err);
                    }
                    audio.offPlay(onPlayFunc);
                }
                audio.onPlay(onPlayFunc);

                let playSoundFunc = () => {
                    audio.play();
                    cb && cb(null);
                    console.log("播放音效##############");
                    audio.offCanplay(playSoundFunc);
                }
                audio.onCanplay(playSoundFunc);

                let onEndedFunc = () => {
                    audio.destroy();
                    audio.offEnded(onEndedFunc);
                    //console.log("销毁音频实例");
                }
                audio.onEnded(onEndedFunc);

                let tempSrc = "https://www.zywxgames.com/Resource/liufenghong/daomeixiansheng/SoundData2/" + ConstPath.SOUND_DIR + url + ".mp3";
                //console.log(tempSrc);
                audio.src = tempSrc;
                audio.play();
                //console.log("播放音效");
            } catch (error) {
                console.log("oppo平台音频播放error", error);
            }
        }
        else {
            this.load(url, (clip: cc.AudioClip) => {
                let id = cc.audioEngine.play(clip, loop, 1);
                cb && cb(id);
            });
        }
    }

    public playTimes(target: cc.Component, url: string, cb: Function = null,
        repeat: number = 1, interval: number = 1, delay: number = 0) {
        let playSound = GameDataManager.getInstance().getGameData().isPlaySound;
        if (!playSound)
            return;
        this.load(url, (clip: cc.AudioClip) => {
            let id: number;
            target.schedule(() => {
                id = cc.audioEngine.playEffect(clip, false);
            }, interval, repeat, delay);
            target.scheduleOnce(() => {
                cb && cb(id);
            }, delay + interval * repeat);
        });

    }

    bgms = [ConstPath.SOUND_BGM1, ConstPath.SOUND_BGM2, ConstPath.SOUND_BGM3, ConstPath.SOUND_BGM4, ConstPath.SOUND_BGM_Terror,
    ConstPath.SOUND_BGM_MAIN, ConstPath.SOUND_BGM_ROOM, ConstPath.SOUND_BGM_LV17,];

    /**index: 1, 2, 3, 4, 5 */
    public playBgm(index: number) {
        this._playBgm(index);
    }

    public playBgmMain() {
        this._playBgm(6);
    }

    public playBgmRoom() {
        this._playBgm(7);
    }

    /**index: 1, 2, 3, 4, 5, 6, 7 */
    private _playBgm(index: number) {
        let playSound = GameDataManager.getInstance().getGameData().isPlaySound;
        if (!playSound)
            return;
        this.load(this.bgms[index - 1], (clip: cc.AudioClip) => {
            cc.audioEngine.playMusic(clip, true);
        });
    }
}
