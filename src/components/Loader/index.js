import {TailSpin} from 'react-loader-spinner'
import './index.css'


const LoaderSpinner=()=>(
    <div data-testid="loader" className='loader-container'>
        <TailSpin type="TailSpin" color="#7a7b7d" height="55" width="55"/>
    </div>
)


export default LoaderSpinner