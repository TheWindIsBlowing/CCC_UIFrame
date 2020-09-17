
let GameData = {
    /**音乐*/
    isPlayMusic: true,
    /**音效*/
    isPlaySound: true,
    /**震动*/
    isPlayShake: true,
    /**签到 */
    sign: {
        day1: false,
        day2: false,
        day3: false,
        day4: false,
        day5: false,
        day6: false,
        day7: false
    },
    /**第一次签到时间 */
    firstSign: 0,
    /**当前签到时间 */
    currentSign: 0,
    /**当天第一次打开签到页面的时间 */
    openSign: 0,
    /**当天转动转盘次数 */
    openTurntable: 0,
    /**是否可以签到 */
    isSign: true,
    /**金钱 */
    goldNum: 200,
    /**金币增加前的金币数量，用于金币飞升的金币改变动画 */
    lastGoldNum: 200,
    /**体力 */
    energy: 30,
    /**币增加前的体力数量，用于体力飞升的体力改变动画 */
    lastEnergy: 30,
    /**转盘转动次数 */
    rotateTableCount: 0,
    /**日期标志 */
    dateFlag: 0,
    /**oppo平台手动关闭banner次数统计 */
    hideBannerCount: 0,
}

export default class GameDataManager {
    private gameData = GameData;
    private static mInstance: GameDataManager = null;
    public static getInstance(): GameDataManager {
        if (this.mInstance == null) {
            this.mInstance = new GameDataManager();
        }
        return this.mInstance;
    }
    /**初始化数据 */
    public initGameData() {
        let gameData = localStorage.getItem("GameData");
        if (gameData && gameData !== "") {
            console.log("GameDataManager====================>:Read data successfully!");
            let data = JSON.parse(gameData);
            console.log(data);
            let time = this.getCurrentDay();
            if (time > data["currentSign"]) {
                data["isSign"] = true; //新的一天更改可签到状态
            }
            if (data["currentSign"] - data["firstSign"] >= 8 && this.checkSign(data)) {
                data["firstSign"] = data["currentSign"];
                data["sign"] = {
                    day1: false,
                    day2: false,
                    day3: false,
                    day4: false,
                    day5: false,
                    day6: false,
                    day7: false
                };
            }

            // 刷新每日需要重置的数据
            if (this.getCurrentDay() != data["dateFlag"]) {
                data["dateFlag"] = this.getCurrentDay();
                data["hideBannerCount"] = 0;
            }

            // 后面添加的数据加入到本地存储
            TODO:


            this.gameData = data;
            this.saveGameData();
        } else {
            console.log("GameDataManager====================>:no data,initialization data!");
            GameData["firstSign"] = this.getCurrentDay();
            GameData["currentSign"] = this.getCurrentDay();
            GameData["dateFlag"] = this.getCurrentDay();

            this.gameData = GameData;
            this.saveGameData();
        }
        this.gameData.lastGoldNum = this.gameData.goldNum;
        this.gameData.lastEnergy = this.gameData.energy;
        if (CC_DEBUG) {
            window['gameData'] = this;
        }
    }
    public getCurrentDay(): number {
        let data = null;
        data = new Date();
        let day = Math.floor(data.getTime() / 1000 / 60 / 60 / 24);
        return day;
    }
    public checkSign(_data) {
        for (let key in _data["sign"]) {
            if (_data["sign"][key] === false) {
                return false;
            }
        }
        return true;
    }
    public saveGameData() {
        if (this.gameData) {
            localStorage.setItem("GameData", JSON.stringify(this.gameData));
            console.log("GameDataManager====================>:Data was successfully initialized!");
        } else {
            console.log("GameDataManager====================>:Error: in gameData!");
        }
    }
    public getGameData() {
        return this.gameData;
    }

    public changeIsPlayMusic() {
        this.gameData["isPlayMusic"] = !this.gameData["isPlayMusic"];
        this.saveGameData();
    }
    public changeIsPlaySound() {
        this.gameData["isPlaySound"] = !this.gameData["isPlaySound"];
        this.saveGameData();
    }
    public changeIsPlayShake() {
        this.gameData["isPlayShake"] = !this.gameData["isPlayShake"];
        this.saveGameData();
    }
    public changeSign(day: string) {
        this.gameData.isSign = false;
        this.gameData.currentSign = this.getCurrentDay();
        this.gameData.sign[day] = true;
        this.saveGameData();
    }

    public changeBannerHideCount() {
        this.gameData["hideBannerCount"]++;
        this.saveGameData();
    }

}
