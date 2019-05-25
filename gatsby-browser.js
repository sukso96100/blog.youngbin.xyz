// custom typefaces
// import "typeface-montserrat"
// import "typeface-merriweather"
import 'typeface-noto-sans-kr'
import 'prismjs/themes/prism-solarizedlight.css'
export const onClientEntry = () => {
    if(typeof window.IntersectionObserver === 'undefined'){
        import('intersection-observer')
    }
}

