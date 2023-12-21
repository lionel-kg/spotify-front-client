import Image from 'next/image';
import styles from './styles.module.scss';

const Index = ({title, bgColor}) => {
  return (
    <div className={styles.card} style={{backgroundColor: bgColor}}>
      <p>{title}</p>
      {/* Add Cloudinary Image */}
      <Image
        src="/thumbnail.jpg"
        loading="lazy"
        width={100}
        height={100}
        alt="Image"
      />
    </div>
  );
};

export default Index;
