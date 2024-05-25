import styles from "./DiscoverSection.module.css";
import img1 from "../../assets/pexels-leah-newhouse-185933.jpg";
import img2 from "../../assets/pexels-mihis-alex-21014.jpg";
import img3 from "../../assets/pexels-porapak-apichodilok-346885.jpg";
import img4 from "../../assets/scrnli_3_20_2024_11-09-55 PM.jpg";
import Logo from "../../shared/UIElements/Logo";
import Reveal from "../../shared/UIElements/Reveal";

function DiscoverSection() {
  return (
    <div id="about" className={styles.section}>
      <Reveal>
        <h2>
          <Logo /> Discover to the world with us
        </h2>
      </Reveal>
      <Reveal>
        <div className={styles.item}>
          <div className={styles.imgBox}>
            <img className={styles.appImg} src={img4} alt="img1" />
          </div>
          <div className={styles.textBox}>
            <h3>Plan your travel</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
              architecto aperiam natus maiores ex nemo amet voluptatum sunt quod
              nam! Nisi voluptatum sed illum laborum iure corporis iste esse
              inventore!
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className={`${styles.item}`}>
          <div className={styles.textBox}>
            <h3>See the world</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
              architecto aperiam natus maiores ex nemo amet voluptatum sunt quod
              nam! Nisi voluptatum sed illum laborum iure corporis iste esse
              inventore!
            </p>
          </div>
          <div className={styles.imgBox}>
            <img src={img3} alt="img1" />
          </div>
        </div>
      </Reveal>
      <Reveal>
        <div className={styles.item}>
          <div className={styles.imgBox}>
            <img src={img2} alt="img1" />
          </div>
          <div className={styles.textBox}>
            <h3>Travel the world</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
              architecto aperiam natus maiores ex nemo amet voluptatum sunt quod
              nam! Nisi voluptatum sed illum laborum iure corporis iste esse
              inventore!
            </p>
          </div>
        </div>
      </Reveal>
      <Reveal>
        <div className={styles.item}>
          <div className={styles.textBox}>
            <h3>Make it real</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
              architecto aperiam natus maiores ex nemo amet voluptatum sunt quod
              nam! Nisi voluptatum sed illum laborum iure corporis iste esse
              inventore!
            </p>
          </div>
          <div className={styles.imgBox}>
            <img src={img1} alt="img1" />
          </div>
        </div>
      </Reveal>
    </div>
  );
}

export default DiscoverSection;
