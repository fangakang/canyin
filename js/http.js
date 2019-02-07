import axios from 'axios'

//axios配置
axios.defaults.timeout=5000;
axios.defaults.baseURL='https://np.pigcms.com/wx/index.php';


//http request拦截器
axios.interceptors.request.use(
    config=>{
        const token=getCookie('session');
        config.data=JSON.stringify(config.data);
        config.headers={
            'Content-Type':'application/x-www-form-urlencoded'
        };
        if(token){
            config.params={'token':token}
        };
        return config;
    },
    err=>{
        return Promise.reject(err)
    }
);

//http response拦截器
axios.interceptors.response.use(
    response => {
       return response;
    },
    error => {
        return Promise.reject(error.response.data)
    }
);

//GET请求
export function fetch(url,data){
    return new Promise((resolve,reject)=>{
        axios.get(url,{params:data}).then(response=>{
            resolve(response.data)
        }).catch(err=>{
            reject(err)
        })
    })
};

//POST请求
export function post(url,data){
    return new Promise((resolve,reject)=>{
        axios.post(url,data).then(response=>{
            resolve(response.data)
        }).catch(err=>{
            reject(err)
        })
    })
}
