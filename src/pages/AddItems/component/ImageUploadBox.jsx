import { useState, useEffect } from 'react'
import PlusIcon from '../../../assets/images/icons/ic_plus.svg'
import XIcon from '../../../assets/images/icons/ic_X.svg'
import styles from './ImageUploadBox.module.css'

function ImageUploadBox() {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [errroMessage, setErrorMessage] = useState('');

  const handleImageChange = (e) => {
    if (previewUrl) {
      setErrorMessage('*이미지 등록은 최대 1개까지 가능합니다')
      return;
    }

    const file = e.target.files[0]
    if (!file) return

    const url = URL.createObjectURL(file)
    setPreviewUrl(url);
    setErrorMessage('');
  }

  const handleRemoveImage = () => {
    setPreviewUrl(null)
    setErrorMessage('')
  }

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  return (
    <div className={styles.wrapper}>

      <div>
        <label className={styles.uploadBox}>
          <img src={PlusIcon} alt="이미지 추가" />
          <span>이미지 등록</span>

          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
        </label>

        {errroMessage && (
          <p className={styles.errroMessage}>
            {errroMessage}
          </p>
        )}
      </div>

      {previewUrl && (
        <div className={styles.previewBox}>
          <img
            src={previewUrl}
            alt="상품 이미지"
            className={styles.previewImage}
          />

          <button
            className={styles.removeBtn}
            onClick={handleRemoveImage}
          >
            <img src={XIcon} alt="삭제" />
          </button>
        </div>
      )}

    </div>
  )
}

export default ImageUploadBox