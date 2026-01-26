
import { useState } from 'react'
import styles from './AddItemsPage.module.css'
import ImageUploadBox from './component/ImageUploadBox'
import TagInput from './component/tagInput'

function AddItemsPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [tags, setTags] = useState([])

  const isFormValid =
    title.trim() &&
    description.trim() &&
    price > 0 &&
    tags.length > 0

    const handlePriceChange = (e) => {
      const onlyNumber = e.target.value
      .replace(/,/g, '')
      .replace(/[^0-9]/g, '')


      setPrice(Number(onlyNumber))
}

  return (
    <div className={styles.container}>
      <div className={styles.pageTop}>
        <h2 className={styles.title}>상품 등록하기</h2>
        <button
          className={`${styles.submitBtn} ${
          isFormValid ? styles.active : ''
          }`}
          disabled={!isFormValid}
          >
          등록
        </button>
      </div>

      <section>
        <p className={styles.label}>상품 이미지</p>
        <ImageUploadBox />
      </section>

      <section>
        <p className={styles.label}>상품명</p>
        <input
          className={styles.input}
          placeholder="상품명을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </section>

      <section>
        <p className={styles.label}>상품 소개</p>
        <textarea
          className={styles.textarea}
          placeholder="상품 소개를 입력해주세요"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </section>

      <section>
        <p className={styles.label}>판매가격</p>
        <input
        className={styles.input}
        placeholder="판매 가격을 입력해주세요"
        value={price ? price.toLocaleString() : ''}
        onChange={handlePriceChange}
        inputMode="numeric"
        />
      </section>

      <section>
        <p className={styles.label}>태그</p>
        <TagInput onChange={setTags} />
      </section>

    </div>
  )
}

export default AddItemsPage
