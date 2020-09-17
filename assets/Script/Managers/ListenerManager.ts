import HashMap from "../Utils/HashMap";

export class Delegate{

    public mListener:Function;
    public get listener():Function
    {
        return this.mListener;
    }
    public mArgArray:any[];
    public get argArray():any
    {
        return this.mArgArray;
    }
    public mIsOnce:boolean = false;
    public get isOnce():boolean
    {
        return this.mIsOnce;
    }
    public set isOnce(_isOnce:boolean)
    {
        this.mIsOnce = _isOnce;
    }
    constructor(_listener:Function,_argArray:any[],_isOnce:boolean = false)
    {
        this.mListener = _listener;
        this.mArgArray = _argArray;
        this.mIsOnce = _isOnce;
    }
}

export default class ListenerManager
{
    private static mInstance:ListenerManager = null;
    private mListenerMap = new HashMap<string,Map<any,Delegate[]>>();
    public static getInstance():ListenerManager
    {
        if(this.mInstance === null)
        {
            this.mInstance = new ListenerManager();
        }
        return this.mInstance;
    }
    private find(_type:string,_caller:any,_listener:Function):Delegate
    {
        if(!_type)
        {
            console.log('Listener type is null');
            return null;
        }
        if(!_caller)
        {
            console.log('Listener caller is null');
            return null;
        }
        if(!_listener)
        {
            console.log('Listener listener is null');
            return null;
        }
        let listenerMap:HashMap<any,Delegate[]>;
        if(this.mListenerMap.has(_type))
        {
            listenerMap = this.mListenerMap.get(_type);
        }else
        {
            listenerMap = new HashMap<any,Delegate[]>();
            this.mListenerMap.set(_type,listenerMap);
        }
        let listenerList:Delegate[];
        if(listenerMap.has(_caller))
        {
            listenerList = listenerMap.get(_caller);
        }else
        {
            listenerList = [];
            listenerMap.set(_caller,listenerList);
        }
        for(let delegate of listenerList)
        {
            if(delegate.mListener === _listener)
            {
                return delegate;
            }
        }
        return null;
    }
    public trigger(_type:string,..._argArray:any[]):boolean
    {
        if(!_type)
        {   
            console.log('Listener type is null!');
            return false;
        }
        let delegateList:Delegate[] = [];
        let callerList:any[] = [];
        let listenerMap = this.mListenerMap.get(_type);
        if(listenerMap)
        {
            listenerMap.forEach((listenerList, caller) => {
                for (let delegate of listenerList) 
                {
                    delegateList.push(delegate);
                    callerList.push(caller);
                }
                for (let index = listenerList.length - 1; index >= 0; --index) 
                {
                    if (listenerList[index].isOnce) 
                    {
                        listenerList.splice(index, 1);
                    }
                }
                if (listenerList.length <= 0) 
                {
                    listenerMap.delete(caller);
                }
            });
            if (listenerMap.size <= 0) {
				this.mListenerMap.delete(_type);
			}
        }
        let length = delegateList.length;
        for (let index = 0; index < length; index++) 
        {
			let delegate: Delegate = delegateList[index];
			delegate.listener.call(callerList[index], ...delegate.argArray, ..._argArray);
		}
		return length > 0;
    }
    public has(_type:string,_caller:any,_listener:Function):boolean
    {
        return this.find(_type,_caller,_listener) !== null;
    }
    private addListener(_type:string,_caller:any,_listener:Function,_isOnce:boolean,..._argArray:any[]):void
    {
        let delegate = this.find(_type,_caller,_listener);
        if(delegate)
        {
            delegate.isOnce = _isOnce;
            console.error('Listener is already exist!');
        }else
        {
            let delegate = new Delegate(_listener,_argArray,_isOnce);
            this.mListenerMap.get(_type).get(_caller).push(delegate);
        }
    }
    public register(_type:string,_caller:any,_listener:Function, ..._argArray:any[]):void
    {
        this.addListener(_type,_caller,_listener,false,..._argArray);
    }
    public registerOnce(_type:string,_caller:any,_listener:Function, ..._argArray:any[]):void
    {
        this.addListener(_type,_caller,_listener,true,..._argArray);
    }
    public removeBy(_type: string,_caller:any): void
    {
        if(!_type)
        {   
            console.log('removeBy Function _type is null!');
            return;
        }
        if(!_caller)
        {   
            console.log('removeBy Function _caller is null!');
            return;
        }
        let listenerMap = this.mListenerMap.get(_type);
        if(listenerMap)
        {
            let listenerList = listenerMap.get(_caller);
            if(listenerList)
            {
                listenerList = [];
            }
            this.mListenerMap.delete(_type);
        }
    }
    public removeAll(_caller:any):void
    {
        this.mListenerMap.forEach((listenerMap, type) => {
			listenerMap.delete(_caller);
			if (listenerMap.size <= 0) {
				this.mListenerMap.delete(type);
			}
		});
    }
}