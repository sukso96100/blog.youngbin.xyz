// custom typefaces
// import "typeface-montserrat"
// import "typeface-merriweather"
import 'typeface-noto-sans-kr'
export const onClientEntry = () => {
    if(typeof window.IntersectionObserver === 'undefined'){
        import('intersection-observer')
    }
}

