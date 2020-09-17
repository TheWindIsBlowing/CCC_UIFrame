export default class ListenerType {

    public static readonly Main_Resume = "Main_Resume";

    public static readonly Capture_Screen = "Capture_Screen";

    public static readonly Game_Start = "Game_Start";

    public static readonly Game_Mask_Enable = "Game_Mask_Enable";
    public static readonly Game_Mask_Disable = "Game_Mask_Disable";

    public static readonly Game_Show_Tools = "Game_Show_Tools";

    public static readonly Sound_On = "Sound_On";

    public static readonly Game_Win = "Game_Win";
    public static readonly Game_Lose = "Game_Lose";
    public static readonly Game_Big_Fail = "Game_Big_Fail";
    public static readonly Game_Lose_One_Heart = "Game_Lose_One_Heart";
    public static readonly Game_Lose_All_Heart = "Game_Lose_All_Heart";
    public static readonly Game_Set_Hearts = "Game_Set_Hearts";
    public static readonly Game_Right = "Game_Right";
    public static readonly Game_Wrong = "Game_Wrong";
    public static readonly Game_Change_Coin = "Game_Change_Coin";
    public static readonly Game_Change_Energy = "Game_Change_Energy";
    public static readonly Game_Coin_Flying = "Game_Coin_Flying";
    public static readonly Game_Energy_Flying = "Game_Energy_Flying";
    public static readonly Game_Resume = "Game_Resume";
    public static readonly Game_Hint_Click = "Game_Hint_Click";
    public static readonly Game_Hint = "Game_Hint";
    public static readonly Game_Touch_Tools = "Game_Touch_Tools";

    public static readonly Game_Continue = "Game_Continue";
    public static readonly Game_Restart = "Game_Restart";

    public static readonly Game_Load_Level = "Game_Load_Level";
    public static readonly Game_Load_Failed = "Game_Load_Failed";
    public static readonly Game_Reload = "Game_Reload";
    public static readonly Game_Next_Level = "Game_Next_Level";
    public static readonly Game_Load_Finish = "Game_Load_Finish";
    public static readonly Game_Load_Progress = "Game_Load_Progress";

    public static readonly Game_Drag_Tool = "Game_Drag_Tool";
    public static readonly Game_Begin_Drag_Tool = "Game_Begin_Drag_Tool";
    public static readonly Game_Drop_Tool = "Game_Drop_Tool";

    public static readonly Box_Open = "Box_Open";
    public static readonly Box_Get_Furniture = "Box_Get_Furniture";
    public static readonly Back_To_Main = "Back_To_Main";

    public static readonly HIDE_GAME_HINT = "HIDE_GAME_HINT"; // 游戏内手指引导消失

    public static readonly Hide_SignBtn_Hongdian = "Hide_SignBtn_Hongdian"; // 已签到，隐藏红点
    public static readonly RefreshMainLayer = "RefreshMainLayer"; // 重置首页状态

    // 显示 隐藏  修复位置
    public static readonly Hide_Show_Light = "Hide_Show_Light";
    // 显示 隐藏ex13关的显示背景
    public static readonly ChangeEx13Bg = "ChangeEx13Bg";

    // 开宝箱界面 点击是否需要看视频
    public static readonly ShouldWatchAd = "ShouldWatchAd";

    //Decorate
    public static readonly Select_Furniture = "Select_Furniture";
    public static readonly Decorate_Furniture = "Decorate_Furniture";
    public static readonly Move_Camera = "Move_Camera";
    public static readonly Get_New_Furniture = "Get_New_Furniture";

    //level
    public static readonly LV_Add_Tools = "LV_Add_Tools";//动态添加道具
    public static readonly LV_Fix_One_Tool = "LV_Fix_One_Tool";//修复一个道具
    public static readonly LV_Success = "LV_Success";//修复所有道具，成功
    public static readonly LV_No_Effect = "LV_No_Effect";//使用无效道具

    //ExLevel 2选1关卡
    public static readonly LV_Ex_Fix_Scene_1 = "LV_Ex_Fix_Scene_1";//完成第一个事件
    public static readonly LV_Ex_Fix_Scene_2 = "LV_Ex_Fix_Scene_2";//完成第二个事件
    public static readonly LV_Ex_Fix_Scene_3 = "LV_Ex_Fix_Scene_3";//完成第三个事件

    //level 1
    public static readonly LV_1_Finish_Floor = "LV_1_Finish_Floor";
    public static readonly LV_1_Finish_Wall = "LV_1_Finish_Wall";

    public static readonly LV_1_Toilet_DianZuan = "LV_1_Toilet_DianZuan";
    public static readonly LV_1_Toilet_TuoBa = "LV_1_Toilet_TuoBa";
    public static readonly LV_1_Toilet_JiaoDai = "LV_1_Toilet_JiaoDai";

    public static readonly LV_1_Wash_DianZuan = "LV_1_Wash_DianZuan";
    public static readonly LV_1_Wash_TuoBa = "LV_1_Wash_TuoBa";
    public static readonly LV_1_Wash_JiaoDai = "LV_1_Wash_JiaoDai";

    //level 3
    public static readonly LV_3_Light_BanShou = "LV_3_Light_BanShou";
    public static readonly LV_3_Light_JiaoDai = "LV_3_Light_JiaoDai";

    //level 4
    public static readonly LV_4_Tv_Disk = "LV_4_Tv_Disk";
    public static readonly LV_4_Tv_Controller = "LV_4_Tv_Controller";
    public static readonly LV_4_Fish_Tape = "LV_4_Fish_Tape";
    public static readonly LV_4_Fix_TV = "LV_4_Fix_TV";
    public static readonly LV_4_Fix_Fish = "LV_4_Fix_Fish";

    //level 5
    public static readonly LV_5_Fix_Stove = "LV_5_Fix_Stove";
    public static readonly LV_5_Fix_Table = "LV_5_Fix_Table";

    public static readonly LV_5_Fridge_Bucket = "LV_5_Fridge_Bucket";
    public static readonly LV_5_Fridge_Hammer = "LV_5_Fridge_Hammer";
    public static readonly LV_5_Fridge_Wire = "LV_5_Fridge_Wire";

    public static readonly LV_5_Stove_Bucket = "LV_5_Stove_Bucket";
    public static readonly LV_5_Stove_Hammer = "LV_5_Stove_Hammer";
    public static readonly LV_5_Stove_Wire = "LV_5_Stove_Wire";

    //level 6
    public static readonly LV_6_Fix_Bed = "LV_6_Fix_Bed";
    public static readonly LV_6_Fix_Cat = "LV_6_Fix_Cat";
    public static readonly LV_6_Fix_Fan = "LV_6_Fix_Fan";

    public static readonly LV_6_Bed_Cleaner = "LV_6_Bed_Cleaner";
    public static readonly LV_6_Bed_Iron = "LV_6_Bed_Iron";
    public static readonly LV_6_Bed_Needle = "LV_6_Bed_Needle";

    public static readonly LV_6_Fan_Injector = "LV_6_Fan_Injector";
    public static readonly LV_6_Fan_Iron = "LV_6_Fan_Iron";

    public static readonly LV_6_Cat_Cleaner = "LV_6_Cat_Cleaner";
    public static readonly LV_6_Cat_Iron = "LV_6_Cat_Iron";
    public static readonly LV_6_Cat_Needle = "LV_6_Cat_Needle";

    //level 7  
    public static readonly LV_7_Fix_Table = "LV_7_Fix_Table";

    public static readonly LV_7_Grass_Scissors = "LV_7_Grass_Scissors";
    public static readonly LV_7_Grass_Sprinkler = "LV_7_Grass_Sprinkler";

    public static readonly LV_7_Stove_Sprayer = "LV_7_Stove_Sprayer";
    public static readonly LV_7_Stove_Sprinkler = "LV_7_Stove_Sprinkler";

    public static readonly LV_7_Table_Sprayer = "LV_7_Table_Sprayer";
    public static readonly LV_7_Table_Dog = "LV_7_Table_Dog";

    //level 8 
    public static readonly LV_8_Fix_Floor = "LV_8_Fix_Floor";
    public static readonly LV_8_Fix_Tree = "LV_8_Fix_Tree";
    public static readonly LV_8_Fix_Water_Outlet = "LV_8_Fix_Water_Outlet";

    public static readonly LV_8_Floor_Brush = "LV_8_Floor_Brush";
    public static readonly LV_8_Floor_Paint = "LV_8_Floor_Paint";
    public static readonly LV_8_Floor_Water_Gun = "LV_8_Floor_Water_Gun";

    public static readonly LV_8_House_E_Saw = "LV_8_House_E_Saw";
    public static readonly LV_8_House_Hook = "LV_8_House_Hook";
    public static readonly LV_8_House_Paint = "LV_8_House_Paint";
    public static readonly LV_8_House_Water_Gun = "LV_8_House_Water_Gun";

    public static readonly LV_8_Tree_E_Saw = "LV_8_Tree_E_Saw";
    public static readonly LV_8_Tree_Hook = "LV_8_Tree_Hook";

    public static readonly LV_8_Water_Outlet_Brush = "LV_8_Water_Outlet_Brush";
    public static readonly LV_8_Water_Outlet_E_Saw = "LV_8_Water_Outlet_E_Saw";

    //level 9  
    public static readonly LV_9_No_Effect = "LV_9_No_Effect";

    public static readonly LV_9_Lift_Welding = "LV_9_Lift_Welding";
    public static readonly LV_9_Lift_Hammer = "LV_9_Lift_Hammer";
    public static readonly LV_9_Lift_Spray = "LV_9_Lift_Spray";

    public static readonly LV_9_Treadmill_Injector = "LV_9_Treadmill_Injector";
    public static readonly LV_9_Treadmill_Hammer = "LV_9_Treadmill_Hammer";
    public static readonly LV_9_Treadmill_Wrench = "LV_9_Treadmill_Wrench";

    public static readonly LV_9_Sandbag_Needle = "LV_9_Sandbag_Needle";

    public static readonly LV_9_Bike_Spray = "LV_9_Bike_Spray";

    //level 10 
    public static readonly LV_10_Fix_Floor = "LV_10_Fix_Floor";
    public static readonly LV_10_Fix_Painting = "LV_10_Fix_Painting";
    public static readonly LV_10_Fix_Wall = "LV_10_Fix_Wall";

    public static readonly LV_10_No_Effect = "LV_10_No_Effect";
    public static readonly LV_10_Happy = "LV_10_Happy";

    public static readonly LV_10_Statue_502 = "LV_10_Statue_502";
    public static readonly LV_10_Statue_Alcohol = "LV_10_Statue_Alcohol";
    public static readonly LV_10_Statue_Repair = "LV_10_Statue_Repair";
    public static readonly LV_10_Statue_Tape = "LV_10_Statue_Tape";

    public static readonly LV_10_Painting_Sponge = "LV_10_Painting_Sponge";
    public static readonly LV_10_Painting_Spray = "LV_10_Painting_Spray";
    public static readonly LV_10_Painting_Tape = "LV_10_Painting_Tape";

    public static readonly LV_10_Chinaware_Alcohol = "LV_10_Chinaware_Alcohol";
    public static readonly LV_10_Chinaware_Repair = "LV_10_Chinaware_Repair";

    public static readonly LV_10_Model_Repair = "LV_10_Model_Repair";
    public static readonly LV_10_Model_No_Effect = "LV_10_Model_No_Effect";
    public static readonly LV_10_Model_502 = "LV_10_Model_502";

    // leve1 11
    public static readonly LV_11_PoolTable_Repair = "LV_11_PoolTable_Repair";
    public static readonly LV_11_Role_Cheer = "LV_11_Role_Cheer";
    public static readonly LV_11_Role_Good_Job = "LV_11_Role_Good_Job";
    public static readonly LV_11_Role_Fail = "LV_11_Role_Fail";
    
    // level 12
    public static readonly LV_12_Window_Fix = "LV_12_Window_Fix";
    public static readonly LV_12_Mop_Floor = "LV_12_Mop_Floor";
    public static readonly LV_12_Wire_Light = "LV_12_Wire_Light";
    public static readonly LV_12_Tap_Window = "LV_12_Tap_Window";
    public static readonly LV_12_Tap_Light = "LV_12_Tap_Light";
    public static readonly LV_12_Tap_Astronomical = "LV_12_Tap_Astronomical";
    public static readonly LV_12_Glass_Astronomical = "LV_12_Glass_Astronomical";

    public static readonly LV_12_Finish_Wall = "LV_12_Finish_Wall";
    public static readonly LV_12_Finish_Floor = "LV_12_Finish_Floor";
    public static readonly LV_12_Finish_Bg = "LV_12_Finish_Bg";

    // level 13
    public static readonly LV_13_RollBall_Cleaner = "LV_13_RollBall_Cleaner";
    public static readonly LV_13_Rain_XJT = "LV_13_Rain_XJT";
    public static readonly LV_13_Rain_Wrench = "LV_13_Rain_Wrench";
    public static readonly LV_13_Role_Good = "LV_13_Role_Good";
    public static readonly LV_13_BallNet_Needle = "LV_13_BallNet_Needle";
    public static readonly LV_13_Acoustics_Needle = "LV_13_Acoustics_Needle";
A
    public static readonly LV_13_Finish_Bg = "LV_13_Finish_Bg";

    // level 14
    public static readonly LV_14_Commodity_Cleaner = "LV_14_Commodity_Cleaner";
    public static readonly LV_14_Cake14_Cleaner = "LV_14_Cake14_Cleaner";
    public static readonly LV_14_Kid14_Candy = "LV_14_Kid14_Candy";
    public static readonly LV_14_Cake14_Candy = "LV_14_Cake14_Candy";
    public static readonly LV_14_Kid14_Arch = "LV_14_Kid14_Arch";
    public static readonly LV_14_Theif14_Arch = "LV_14_Theif14_Arch";
    public static readonly LV_14_Cake14_Arch = "LV_14_Cake14_Arch";
    public static readonly LV_14_Kid14_Ice = "LV_14_Kid14_Ice";
    public static readonly LV_14_Cake14_Ice = "LV_14_Cake14_Ice";
    public static readonly LV_14_Thief14_Crab = "LV_14_Thief14_Crab";

    // level 15
    public static readonly LV_15_HandsomeMan_Slingshot = "LV_15_HandsomeMan_Slingshot";
    public static readonly LV_15_HandsomeMan_Lipstick = "LV_15_HandsomeMan_Lipstick";
    public static readonly LV_15_HandsomeMan_Spray = "LV_15_HandsomeMan_Spray";
    public static readonly LV_15_HandsomeMan_Glove = "LV_15_HandsomeMan_Glove";
    public static readonly LV_15_HandsomeMan_Xiandou = "LV_15_HandsomeMan_Xiandou";
    public static readonly LV_15_Cashier_Slingshot = "LV_15_Cashier_Slingshot";
    public static readonly LV_15_Cashier_Horn = "LV_15_Cashier_Horn";
    public static readonly LV_15_GrandMom_Slingshot = "LV_15_GrandMom_Slingshot";
    public static readonly LV_15_GrandMom_Horn = "LV_15_GrandMom_Horn";
    public static readonly LV_15_StrongMan_Lipstick = "LV_15_StrongMan_Lipstick";
    public static readonly LV_15_StrongMan_Spray = "LV_15_StrongMan_Spray";
    public static readonly LV_15_StrongMan_Glove = "LV_15_StrongMan_Glove";
    public static readonly LV_15_StrongMan_Xiandou = "LV_15_StrongMan_Xiandou";

    public static readonly LV_15_FixCashier = "LV_15_FixCashier"; // 修复好收银台

    // level 16
    public static readonly LV_16_Boat_BoltDriver = "LV_16_Boat_BoltDriver";
    public static readonly LV_16_Boat_Board = "LV_16_Boat_Board";
    public static readonly LV_16_Boat_Torch = "LV_16_Boat_Torch";
    public static readonly LV_16_Boat_ElectricWelding = "LV_16_Boat_ElectricWelding";
    public static readonly LV_16_Crocodile_Board = "LV_16_Crocodile_Board";
    public static readonly LV_16_Crocodile_Torch = "LV_16_Crocodile_Torch";
    public static readonly LV_16_Crocodile_Mask = "LV_16_Crocodile_Mask";
    public static readonly LV_16_Motor_BoltDriver = "LV_16_Motor_BoltDriver";
    public static readonly LV_16_Motor_Torch = "LV_16_Motor_Torch";
    public static readonly LV_16_RoleWoman_HairDrier = "LV_16_RoleWoman_HairDrier";
    public static readonly LV_16_RoleWoman_Torch = "LV_16_RoleWoman_Torch";

    // level 17
    public static readonly LV_17_Flute_NextTable = "LV_17_Flute_NextTable";
    public static readonly LV_17_SprayMop_NextTable = "LV_17_SprayMop_NextTable";
    public static readonly LV_17_DiamondRing_NextTable = "LV_17_DiamondRing_NextTable";
    public static readonly LV_17_Necklace_NextTable = "LV_17_Necklace_NextTable";
    public static readonly LV_17_Flute_Light17 = "LV_17_Flute_Light17";
    public static readonly LV_17_ElectricDrill_Light17 = "LV_17_ElectricDrill_Light17";
    public static readonly LV_17_Flute_Clothes = "LV_17_Flute_Clothes";
    public static readonly LV_17_SprayMop_Clothes = "LV_17_SprayMop_Clothes";
    public static readonly LV_17_Sponge_Clothes = "LV_17_Sponge_Clothes";
    public static readonly LV_17_Flute_RoleWoman17 = "LV_17_Flute_RoleWoman17";
    public static readonly LV_17_SprayMop_RoleWoman17 = "LV_17_SprayMop_RoleWoman17";
    public static readonly LV_17_DiamondRing_RoleWoman17 = "LV_17_DiamondRing_RoleWoman17";
    public static readonly LV_17_Necklace_RoleWoman17 = "LV_17_Necklace_RoleWoman17";

    public static readonly Fix_Clothes = "Fix_Clothes";

    // level 18
    public static readonly LV_18_Cream_RoleWoman18 = "LV_18_Cream_RoleWoman18";
    public static readonly LV_18_Umbrella_RoleWoman18 = "LV_18_Umbrella_RoleWoman18";
    public static readonly LV_18_Headgear_RoleWoman18 = "LV_18_Headgear_RoleWoman18";
    public static readonly LV_18_WoodenSword_Watermelon = "LV_18_WoodenSword_Watermelon";
    public static readonly LV_18_Bat_Watermelon = "LV_18_Bat_Watermelon";
    public static readonly LV_18_WoodenSword_BadGay = "LV_18_WoodenSword_BadGay";
    public static readonly LV_18_Bat_BadGay = "LV_18_Bat_BadGay";
    public static readonly LV_18_Shovel_BadGay = "LV_18_Shovel_BadGay";
    public static readonly LV_18_Headgear_BadGay = "LV_18_Headgear_BadGay";
    public static readonly LV_18_Bat_Sand = "LV_18_Bat_Sand";
    public static readonly LV_18_Shovel_Sand = "LV_18_Shovel_Sand";

    // level 19
    public static readonly LV_19_Mop_RoleWoman19 = "LV_18_Mop_RoleWoman19";
    public static readonly LV_19_Arch_RoleWoman19 = "LV_18_Arch_RoleWoman19";
    public static readonly LV_19_Scissors_Shopowner = "LV_19_Scissors_Shopowner";
    public static readonly LV_19_Hat_Shopowner = "LV_19_Hat_Shopowner";
    public static readonly LV_19_Pen_Shopowner = "LV_19_Pen_Shopowner";
    public static readonly LV_19_Scissors_Girl19 = "LV_19_Scissors_Girl19";
    public static readonly LV_19_Arch_Girl19 = "LV_19_Arch_Girl19";
    public static readonly LV_19_MoonCake_RoleWoman19 = "LV_19_MoonCake_RoleWoman19";

    public static readonly LV_19_Ballon_Arch19 = "LV_19_Ballon_Arch19";

    // level 20
    public static readonly LV_20_Stick_Woman20 = "LV_20_Stick_Woman20";
    public static readonly LV_20_MoonCake_Woman20 = "LV_20_Cake_Woman20";
    public static readonly LV_20_Alcohol_Woman20 = "LV_20_Alcohol_Woman20";
    public static readonly LV_20_Stick_OldWoman = "LV_20_Stick_OldWoman";
    public static readonly LV_20_Cake_OldWoman = "LV_20_Cake_OldWoman";
    public static readonly LV_20_MoonCake_Thief = "LV_20_MoonCake_Thief";

    //level ex 1 
    public static readonly LV_Ex_1_Bean = "LV_Ex_1_Bean";
    public static readonly LV_Ex_1_Helmet = "LV_Ex_1_Helmet";
    public static readonly LV_Ex_1_Glasses = "LV_Ex_1_Glasses";
    public static readonly LV_Ex_1_Mobile = "LV_Ex_1_Mobile";
    public static readonly LV_Ex_1_Cleaner = "LV_Ex_1_Cleaner";
    public static readonly LV_Ex_1_Machete = "LV_Ex_1_Machete";

    //level ex 2 
    public static readonly LV_Ex_2_Bed = "LV_Ex_2_Bed";
    public static readonly LV_Ex_2_Bucket = "LV_Ex_2_Bucket";
    public static readonly LV_Ex_2_Fan = "LV_Ex_2_Fan";
    public static readonly LV_Ex_2_Towel = "LV_Ex_2_Towel";
    public static readonly LV_Ex_2_Hammer = "LV_Ex_2_Hammer";
    public static readonly LV_Ex_2_E_Saw = "LV_Ex_2_E_Saw";

    public static readonly HIDE_FINGER = "HIDE_FINGER"; // 看完视频隐藏引导手指

    //level ex 3 
    public static readonly LV_Ex_3_Axe = "LV_Ex_3_Axe";
    public static readonly LV_Ex_3_LuoSiDao = "LV_Ex_3_LuoSiDao";
    public static readonly LV_Ex_3_Cat = "LV_Ex_3_Durian";
    public static readonly LV_Ex_3_Cheese = "LV_Ex_3_Cheese";
    public static readonly LV_Ex_3_Clock = "LV_Ex_3_Clock";
    public static readonly LV_Ex_3_Stilts = "LV_Ex_3_Stilts";

    //level ex 4 
    public static readonly LV_Ex_4_Rocket = "LV_Ex_4_Rocket";
    public static readonly LV_Ex_4_Zhuqingting = "LV_Ex_4_Zhuqingting";
    public static readonly LV_Ex_4_Pao = "LV_Ex_4_Pao";
    public static readonly LV_Ex_4_Zuantou = "LV_Ex_4_Zuantou";
    public static readonly LV_Ex_4_Grass = "LV_Ex_4_Grass";
    public static readonly LV_Ex_4_Wolf = "LV_Ex_4_Wolf";

    //level ex 5 
    public static readonly LV_Ex_5_Knif = "LV_Ex_5_Knif";
    public static readonly LV_Ex_5_FishingNet = "LV_Ex_5_FishingNet";
    public static readonly LV_Ex_5_Alarm = "LV_Ex_5_Alarm";
    public static readonly LV_Ex_5_ChineseClo = "LV_Ex_5_ChineseClo";
    public static readonly LV_Ex_5_WoodKnif = "LV_Ex_5_WoodKnif";
    public static readonly LV_Ex_5_Gourd = "LV_Ex_5_Gourd";

    //level ex 6 
    public static readonly LV_Ex_6_GlassVR = "LV_Ex_6_GlassVR";
    public static readonly LV_Ex_6_Patch = "LV_Ex_6_Patch";
    public static readonly LV_Ex_6_Hammer = "LV_Ex_6_Hammer";
    public static readonly LV_Ex_6_Arch = "LV_Ex_6_Arch";
    public static readonly LV_Ex_6_Alcohol = "LV_Ex_6_Alcohol";
    public static readonly LV_Ex_6_Fireworks = "LV_Ex_6_Fireworks";

    //level ex 7 
    public static readonly LV_Ex_7_HandLeft = "LV_Ex_7_HandLeft";
    public static readonly LV_Ex_7_HandRight = "LV_Ex_7_HandRight";
    public static readonly LV_Ex_7_WaterGun = "LV_Ex_7_WaterGun";
    public static readonly LV_Ex_7_Lipstick = "LV_Ex_7_Lipstick";
    public static readonly LV_Ex_7_Hulk = "LV_Ex_7_Hulk";
    public static readonly LV_Ex_7_SpiderMan = "LV_Ex_7_SpiderMan";

    //level ex 8 
    public static readonly LV_Ex_8_BandAid = "LV_Ex_8_BandAid";
    public static readonly LV_Ex_8_Walk = "LV_Ex_8_Walk";
    public static readonly LV_Ex_8_Phone = "LV_Ex_8_Phone";
    public static readonly LV_Ex_8_Microphone = "LV_Ex_8_Microphone";
    public static readonly LV_Ex_8_Accept = "LV_Ex_8_Accept";
    public static readonly LV_Ex_8_Refuse = "LV_Ex_8_Refuse";

    //level ex 9
    public static readonly LV_Ex_9_RoleWoman = "LV_Ex_9_RoleWoman";
    public static readonly LV_Ex_9_Woman = "LV_Ex_9_Woman";
    public static readonly LV_Ex_9_Hug = "LV_Ex_9_Hug";
    public static readonly LV_Ex_9_Spray = "LV_Ex_9_Spray";
    public static readonly LV_Ex_9_Camera = "LV_Ex_9_Camera";
    public static readonly LV_Ex_9_Telescope = "LV_Ex_9_Telescope";

    //level ex 10
    public static readonly LV_Ex_10_IceCream = "LV_Ex_10_IceCream";
    public static readonly LV_Ex_10_Toufu = "LV_Ex_10_Toufu";
    public static readonly LV_Ex_10_Fireworks = "LV_Ex_10_Fireworks";
    public static readonly LV_Ex_10_Firecrackers = "LV_Ex_10_Firecrackers";
    public static readonly LV_Ex_10_Role = "LV_Ex_10_Role";
    public static readonly LV_Ex_10_Woman = "LV_Ex_10_Woman";

    //level ex 11
    public static readonly LV_Ex_11_Socket1 = "LV_Ex_11_Socket1";
    public static readonly LV_Ex_11_Phone = "LV_Ex_11_Phone";
    public static readonly LV_Ex_11_Socket2 = "LV_Ex_11_Socket2";
    public static readonly LV_Ex_11_TestKit = "LV_Ex_11_TestKit";
    public static readonly LV_Ex_11_Socket3 = "LV_Ex_11_Socket3";
    public static readonly LV_Ex_11_FishingNet = "LV_Ex_11_FishingNet";

    //level ex 12
    public static readonly LV_Ex_12_Drink = "LV_Ex_12_Drink";
    public static readonly LV_Ex_12_MixingWine = "LV_Ex_12_MixingWine";
    public static readonly LV_Ex_12_KnifeFork = "LV_Ex_12_KnifeFork";
    public static readonly LV_Ex_12_Chopsticks = "LV_Ex_12_Chopsticks";
    public static readonly LV_Ex_12_Bracelet = "LV_Ex_12_Bracelet";
    public static readonly LV_Ex_12_LightBracelet = "LV_Ex_12_LightBracelet";

    //level ex 13
    public static readonly LV_Ex_13_Stick = "LV_Ex_13_Stick";
    public static readonly LV_Ex_13_Spear = "LV_Ex_13_Spear";
    public static readonly LV_Ex_13_Fog = "LV_Ex_13_Fog";
    public static readonly LV_Ex_13_Wheel = "LV_Ex_13_Wheel";
    public static readonly LV_Ex_13_Harrow = "LV_Ex_13_Harrow";
    public static readonly LV_Ex_13_Arch = "LV_Ex_13_Arch";

}
