import { useState } from "react";
import styles from "./ReviewSection.module.css";
import Card from "../../shared/UIElements/Card";
import personImg1 from "../../assets/pexels-andrea-piacquadio-733872.jpg";
import personImg2 from "../../assets/pexels-hannah-nelson-1065084.jpg";
import personImg3 from "../../assets/pexels-spencer-selover-428333.jpg";
import Logo from "../../shared/UIElements/Logo";
import { FaCaretSquareLeft } from "react-icons/fa";
import { FaCaretSquareRight } from "react-icons/fa";
import Reveal from "../../shared/UIElements/Reveal";

function ReviewSection() {
  const [slideIndex, setSlideIndex] = useState(0);

  const nextSlide = () => {
    console.log(slideIndex);
    setSlideIndex((prev) => (prev === 2 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    console.log(slideIndex);
    setSlideIndex((prev) => (prev === 0 ? 2 : prev - 1));
  };
  return (
    <div id="review" className={styles.section}>
      <Reveal>
        <h2>
          <Logo /> Reviews
        </h2>
      </Reveal>

      <Reveal className={styles.mainBox}>
        <FaCaretSquareLeft className={styles.left} onClick={prevSlide} />
        <FaCaretSquareRight className={styles.right} onClick={nextSlide} />
        <div
          className={`${styles.slider}`}
          style={{ transform: `translate(-${slideIndex * 33.33}%)` }}
        >
          <div className={`${styles.slide} ${styles.slide0}`}>
            <Card className={styles.container}>
              <div className={styles.imgBox}>
                <img src={personImg1} alt="imgPerson" />
              </div>
              <div className={styles.contentBox}>
                <h3>Andrea Piacquadio</h3>
                <blockquote>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Assumenda dolore tempora omnis odit eos dolor corrupti
                  repellat labore eveniet mollitia iusto quis corporis nisi, nam
                  maiores explicabo architecto cupiditate possimus.
                </blockquote>
              </div>
            </Card>
          </div>
          <div className={`${styles.slide} ${styles.slide1}`}>
            <Card className={styles.container}>
              <div className={styles.imgBox}>
                <img src={personImg2} alt="imgPerson" />
              </div>
              <div className={styles.contentBox}>
                <h3>Hannah Nelson</h3>
                <blockquote>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Assumenda dolore tempora omnis odit eos dolor corrupti
                  repellat labore eveniet mollitia iusto quis corporis nisi, nam
                  maiores explicabo architecto cupiditate possimus.
                </blockquote>
              </div>
            </Card>
          </div>
          <div className={`${styles.slide} ${styles.slide2}`}>
            <Card className={styles.container}>
              <div className={styles.imgBox}>
                <img src={personImg3} alt="imgPerson" />
              </div>
              <div className={styles.contentBox}>
                <h3>Spencer Selover</h3>
                <blockquote>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Assumenda dolore tempora omnis odit eos dolor corrupti
                  repellat labore eveniet mollitia iusto quis corporis nisi, nam
                  maiores explicabo architecto cupiditate possimus.
                </blockquote>
              </div>
            </Card>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

export default ReviewSection;
