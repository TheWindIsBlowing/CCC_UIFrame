/**使用泛型数据
 * 此种声明方式可限制类型->HashMap<string, number>
 */
export interface KeyValue<K, V>{
    key: K,
    value: V
}
/**简单hash表 */
export default class HashMap<K,V>{
    private mKeyValueList:KeyValue<K,V>[];
    constructor(){
        this.clear();
    }
    /**根据Key值获取键值 */
    public get(_key:any):any{
        for(let i = 0; i < this.mKeyValueList.length;++i){
            let element:KeyValue<K,V> = this.mKeyValueList[i];
            if(element.key === _key){
                return element.value;
            }
        }
        return null;
    }
    /**根据Key值获取所在数组的索引值 */
    private getIndexByKey(_key:any):number{
        for(let i = 0; i < this.mKeyValueList.length;++i){
            let element:KeyValue<K,V> = this.mKeyValueList[i];
            if(element.key === _key){
                return i;
            }
        }
        return -1;
    }
    /**添加元素 */
    public set(_key:any,_value:any):void{
        if(_key === null || _value === null || _key === undefined || _value === undefined){
            throw new Error('Error:key or value Can not be defined as null or undefine !!!'); 
        }
        let data:KeyValue<K,V> = {key:_key,value:_value};
        let index = this.getIndexByKey(_key);
        if(index === -1){
            this.mKeyValueList.push(data);
        }else{
            this.mKeyValueList[index] = data;
        }
    }
    /**根据Key值删除元素 */
    public delete(_key:any):boolean{
        for(let i = 0; i < this.mKeyValueList.length;++i){
            let element:KeyValue<K,V> = this.mKeyValueList[i];
            if(element.key === _key){
                this.mKeyValueList.splice(i,1);
                return true;
            }
        }
        return false;
    }
    /**根据Key值查询所在数组是否已有该Key */
    public has(_key:any):boolean{
        for(let i = 0; i < this.mKeyValueList.length;++i){
            let element:KeyValue<K,V> = this.mKeyValueList[i];
            if(element.key === _key){
                return true;
            }
        }
        return false;
    }
    /**获取容器大小 */
    public getSize():number
    {
        return this.mKeyValueList.length;
    }
    /**遍历容器(返回Value与Key与泛型结构体) */
    public forEach(callbackfn: (value: V, key: K, map: KeyValue<K, V>) => void)
    {
       for(let i = 0; i < this.mKeyValueList.length;++i)
       {
           const element:KeyValue<K,V> = this.mKeyValueList[i];
           callbackfn && callbackfn(element.value,element.key,element);
       }
    }
    /**遍历容器(Map<K,V>) */
    public forEachMap(callbackfn: { (data: KeyValue<K, V>): void })
    {
        for(let i = 0; i < this.mKeyValueList.length;++i)
       {
           const element:KeyValue<K,V> = this.mKeyValueList[i];
           callbackfn && callbackfn(element);
       }
    }
    /**清空容器 */
    public clear(){
        this.mKeyValueList = [];
    }
}
