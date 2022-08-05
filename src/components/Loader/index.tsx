import React from 'react'
import styles from "./Loader.module.scss"

const Index = () => {
  return (
    <div className={ styles.loader }>
      <div className={ styles.ldsDualRing }/>
    </div>
  );
};

export default Index;