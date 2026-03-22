// HOOKS & LIBRARIES
import { useContext } from 'react';
import { ArrowLeft, X  } from 'lucide-react';

// CONTEXT
import UserProgressContext from '../store/UserProgressContext.jsx';

// COMPONENTS
import Modal from './UI/Modal.jsx';

// ASSETS
import sampleImage from '../assets/pearl.png'

import styles from '../css/Search.module.css';

export default function Search({}) {
    
    const userProgressCtx = useContext(UserProgressContext);

    function handleHideSearch() {
        userProgressCtx.hideSearch();
    }
    
    return (
        <Modal
            className={styles.search}
            open={userProgressCtx.progress === 'search'}
            onClose={userProgressCtx.progress === 'search' ? handleHideSearch : null}
        >
            {/*BACK BUTTON*/}
            <button 
                onClick={handleHideSearch}
                className={styles.closeBtn}
            >
                <X color="#94161b" size={24}/>
            </button>

            {/*SEARCH*/}
            <form className={styles.searchForm}>
                <input className={styles.searchInput} type='search' placeholder="Search" />

                <div className={styles.searchCategory}>
                    <h3>Category</h3>
                    <div className={styles.categoryContainer}>
                        <button>rings</button>
                        <button>bracelet</button>
                        <button>necklace</button>
                        <button>earrings</button>
                    </div>
                </div>
            </form>

            {/*POPULAR*/}
            <div className={styles.popular}>
                <h3>Popular</h3>
                <ul>
                    <li className={styles.popularItem}>
                        <article>
                            <img src={sampleImage}/>
                            <p>Lorem Ipsum</p>
                            <p className={styles.price}>₱9,600</p>
                        </article>
                    </li>
                    <li className={styles.popularItem}>
                        <article>
                            <img src={sampleImage}/>
                            <p>Lorem Ipsum</p>
                            <p className={styles.price}>₱9,600</p>
                        </article>
                    </li>
                    <li className={styles.popularItem}>
                        <article>
                            <img src={sampleImage}/>
                            <p>Lorem Ipsum</p>
                            <p className={styles.price}>₱9,600</p>
                        </article>
                    </li>
                    <li className={styles.popularItem}>
                        <article>
                            <img src={sampleImage}/>
                            <p>Lorem Ipsum</p>
                            <p className={styles.price}>₱9,600</p>
                        </article>
                    </li>
                    <li className={styles.popularItem}>
                        <article>
                            <img src={sampleImage}/>
                            <p>Lorem Ipsum</p>
                            <p className={styles.price}>₱9,600</p>
                        </article>
                    </li>
                </ul>
            </div>
        </Modal>
    )
}