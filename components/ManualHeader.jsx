import { useMoralis } from "react-moralis";
import { useEffect } from "react";

export default function ManualHeader() {

    const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } = useMoralis();

    useEffect(()=>{
        if(isWeb3Enabled) return;
        if(typeof window !== "undefined") {
            if(window.localStorage.getItem("connect")) {
                enableWeb3();
            }
        }
    }, [isWeb3Enabled])

    useEffect(()=>{
        Moralis.onAccountChanged((newAccount) => {
            console.log(`Account change to ${newAccount}`);
            if(newAccount == null) {
                window.localStorage.removeItem("connect");
                deactivateWeb3();
                console.log("No account found");
            }
        })
    }, [])
    return (<div>
        {account? 
        (<div>Connected to {account.slice(0,6)}...{account.slice(account.length-4)} </div>) 
        : 
        (<button disabled={isWeb3EnableLoading}
            onClick={async()=>{
            await enableWeb3();
            if(typeof window !== "undefined") {
                window.localStorage.setItem("connect", "injected");
            }
        }}>Connect</button>)}
        
    </div>)
}