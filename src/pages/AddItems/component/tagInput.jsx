import { useState } from 'react'
import styles from './TagInput.module.css'
import XIcon from '../../../assets/images/icons/ic_X.svg'

function TagInput({ onChange }) {
  const [inputValue, setInputValue] = useState('')
  const [tags, setTags] = useState([])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault()

      const newTags = [...tags, inputValue.trim()]
      setTags(newTags)
      onChange?.(newTags)

      setInputValue('')
    }
  }

  const handleRemove = (index) => {
    const newTags = tags.filter((_, i) => i !== index)
    setTags(newTags)
    onChange?.(newTags)
  }

  return (
    <>
      <input
        className={styles.input}
        placeholder="태그를 입력해주세요"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <div className={styles.tagList}>
        {tags.map((tag, index) => (
          <div key={index} className={styles.tagItem}>
            #{tag}
            <button onClick={() => handleRemove(index)}>
              <img src={XIcon} alt='삭제' />
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

export default TagInput