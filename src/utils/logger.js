const environment = import.meta.env.VITE_ENV;

export default function logger(...x){
    if(environment!=='prod'){
        console.log(...x)
    }
}