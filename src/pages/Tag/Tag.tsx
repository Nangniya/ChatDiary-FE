import React, { useState, useEffect } from 'react';
import BottomNav from '../../components/BottomNav/BottomNav';
import List from '../Home/List';
import {
  ListIcon,
  Card32,
  TagDownChevron,
  TagFilter,
} from '../../assets/index';
import styles from './Tag.module.scss';
import CardView from './CardView';
import TagSortModal from '../../components/BottomSheets/TagSortModal';
import HomeHeader from '../../components/Headers/HomeHeader';
import TagChip from '../../components/Tags/TagChip';
import { Link } from 'react-router-dom';

const Tag = () => {
  const [isList, setIsList] = useState<boolean>(true);
  const tags = ['여행', '여행', '여행', '여행', '여행', '여행', '여행', '여행'];
  const [currentSort, setCurrentSort] = useState<number>(2);

  const toggleMode = () => {
    setIsList((prev) => !prev);
  };

  const [isSelectedSorted, setIsSelectedSorted] = useState(false);

  const onSelectSort = () => {
    setIsSelectedSorted(true);
  };

  useEffect(() => {
    if (isSelectedSorted) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSelectedSorted, currentSort]);

  return (
    <div className={styles.container}>
      <HomeHeader />
      <div className={styles.tagPageWrapper}>
        <Link className={styles.selectedTags} to={'/tag/filter'}>
          {tags.map((tag, tagIndex) => {
            return <TagChip key={tagIndex}>{tag}</TagChip>;
          })}
        </Link>
        <div className={styles.tagControll}>
          <div className={styles.tagSort} onClick={onSelectSort}>
            <div className={styles.dateSort}>
              {currentSort === 1 ? '오래된순' : '최신순'}
            </div>
            <div className={styles.chevronWrapper}>
              <TagDownChevron />
            </div>
          </div>
          <div className={styles.sortIcons}>
            <div className={styles.iconWrapper} onClick={toggleMode}>
              {isList ? <Card32 /> : <ListIcon />}
            </div>
            <Link className={styles.iconWrapper} to={'/tag/filter'}>
              <TagFilter />
            </Link>
          </div>
        </div>
        {isList ? <List /> : <CardView />}
        {isSelectedSorted ? (
          <TagSortModal
            clickOuter={setIsSelectedSorted}
            isOpen={isSelectedSorted}
            currentSort={currentSort}
            setCurrentSort={setCurrentSort}
          />
        ) : null}
        <BottomNav page={1} />
      </div>
    </div>
  );
};

export default Tag;
