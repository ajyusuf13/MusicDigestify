import './App.css';
import {useEffect} from "react";

function App() {

    const getAuthToken = () => {
        window.location = "http://localhost:8887/login";
    }


    useEffect(() => {
        if (window.location.search) {
            const params = new URLSearchParams(window.location.search);
            const codeAndState = window.location.search;
            const code = params.get("code")
            if (code) {
                window.location = "http://localhost:8887/callback" + codeAndState;

                // http://localhost:8887/#access_token=BQDLhH_DxjUYaAexf7Za3B8YrWOsGu7QVG5UgT-wrsxxamZ7bT70Fn_N-v_RvBZ_8J5qN6y_uVpK57cvo4Mv7uAzpfGsrqmtJxHWNuseddXG-8QFyMEs4HxAO7ZDyQ234u6KQH5-K158B5isXuKFdAZwaTphAvvsHMHDjC8BgJFawalc7iwrY5RdD0XgLNKbuWlm&
                    // refresh_token=AQBLK3KvVrjzOP0YaRHiVWN2C-T2XD1gQkeEN2lwEUHsvX0-RjKRLiUQb2W1OVm_TwAr_fJeHVmIakgqd-weeamgX-IA6uT1YTNHiAgYxhJ1diVp1yxnMzCnQlHLxJAtl30
            }
        }
    })


  return (
    <div className="App">
      <header className="App-header">
        <button onClick={getAuthToken}>Hello world</button>
      </header>
    </div>
  );
}

export default App;
